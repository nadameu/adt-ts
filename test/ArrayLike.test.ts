import * as fc from 'fast-check';
import { describe, expect, test } from 'vitest';
import {
  AL,
  altArrayLike,
  alternativeArrayLike,
  applicativeArrayLike,
  applicativeIdentity,
  applyArrayLike,
  arrayLike,
  bindArrayLike,
  constant,
  foldableArrayLike,
  functorArrayLike,
  makeEqArrayLike,
  monadArrayLike,
  monoidArrayLike,
  plusArrayLike,
  semigroupArrayLike,
  traversableArrayLike,
} from '../src';
import { TArrayLike } from '../src/ArrayLike/internal';
import { makeAlt1Laws } from './laws/Alt';
import { makeAlternativeLaws } from './laws/Alternative';
import { makeApplicative1Laws } from './laws/Applicative';
import { makeApply1Laws } from './laws/Apply';
import { makeBind1Laws } from './laws/Bind';
import { makeEq1Laws } from './laws/Eq';
import { makeFoldable1Laws } from './laws/Foldable';
import { makeFunctor1Laws } from './laws/Functor';
import { makeMonad1Laws } from './laws/Monad';
import { makeMonoid1Laws } from './laws/Monoid';
import { makePlusLaws } from './laws/Plus';
import { makeSemigroup1Laws } from './laws/Semigroup';
import { makeTraversableLaws } from './laws/Traversable';

const makeArb = <a>(arb: fc.Arbitrary<a>): fc.Arbitrary<ArrayLike<a>> => {
  const base = fc.array(arb);
  return base.map(xs => {
    const ys: { [index: number]: a; length: number } = { length: xs.length };
    AL.forEachWithIndex<a>(i => x => {
      ys[i] = x;
    })(xs);
    return ys;
  });
};

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorArrayLike)(makeEqArrayLike)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(applyArrayLike)(makeEqArrayLike)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(applicativeArrayLike)(makeEqArrayLike)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAlt1Laws(altArrayLike)(makeEqArrayLike)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws(plusArrayLike)(makeEqArrayLike)(makeArb);
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Alternative', () => {
  const alternativeLaws = makeAlternativeLaws(alternativeArrayLike)(makeEqArrayLike)(makeArb);
  test('Alternative - distributivity', alternativeLaws.distributivity);
  test('Alternative - annihilation', alternativeLaws.annihilation);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableArrayLike)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind1Laws(bindArrayLike)(makeEqArrayLike)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadArrayLike)(makeEqArrayLike)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TArrayLike>(makeEqArrayLike)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupArrayLike)(makeEqArrayLike)(makeArb);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoid1Laws(monoidArrayLike)(makeEqArrayLike)(makeArb);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});

describe('Traversable', () => {
  const traversableLaws = makeTraversableLaws(traversableArrayLike)(makeEqArrayLike)(makeArb);
  test('Traversable - naturality', traversableLaws.naturality);
  test('Traversable - identity', traversableLaws.identity);
  test('Traversable - composition', traversableLaws.composition);
});

test.skip('Stack safety for traversal', () => {
  const arr = arrayLike.range(0)(1e6);
  const trav = arrayLike.sequence(applicativeIdentity)(arr);
  expect(() => arrayLike.foldl<number, null>(constant(constant(null)))(null)(trav)).not.toThrow();
});
