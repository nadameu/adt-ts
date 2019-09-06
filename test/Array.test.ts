import * as jsc from 'jsverify';
import {
  altArray,
  alternativeArray,
  applicativeArray,
  applyArray,
  bindArray,
  foldableArray,
  functorArray,
  makeEqArray,
  monadArray,
  monoidArray,
  plusArray,
  semigroupArray,
  traversableArray,
  array,
} from '../src/Array';
import { forEachWithIndex } from '../src/Array/functions';
import { TArray } from '../src/Array/internal';
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
import { applicativeIdentity, constant, Right, Just, applicativeMaybe, number } from '../src';

const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<ArrayLike<a>> =>
  jsc.array(arb).smap(
    xs => {
      const ys: { [index: number]: a; length: number } = { length: xs.length };
      forEachWithIndex<a>(i => x => {
        ys[i] = x;
      })(xs);
      return ys;
    },
    xs => Array.from(xs),
    xs => jsc.array(arb).show!(Array.from(xs))
  );

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorArray)(makeEqArray)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(applyArray)(makeEqArray)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(applicativeArray)(makeEqArray)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAlt1Laws(altArray)(makeEqArray)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws(plusArray)(makeEqArray)(makeArb);
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Alternative', () => {
  const alternativeLaws = makeAlternativeLaws(alternativeArray)(makeEqArray)(makeArb);
  test('Alternative - distributivity', alternativeLaws.distributivity);
  test('Alternative - annihilation', alternativeLaws.annihilation);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableArray)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind1Laws(bindArray)(makeEqArray)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadArray)(makeEqArray)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TArray>(makeEqArray)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupArray)(makeEqArray)(makeArb);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoid1Laws(monoidArray)(makeEqArray)(makeArb);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});

describe('Traversable', () => {
  const traversableLaws = makeTraversableLaws(traversableArray)(makeEqArray)(makeArb);
  test('Traversable - naturality', traversableLaws.naturality);
  test('Traversable - identity', traversableLaws.identity);
  test('Traversable - composition', traversableLaws.composition);
});

test('Stack safety for traversal', () => {
  const arr = array.range(0)(1e6);
  const trav = array.sequence(applicativeIdentity)(arr);
  expect(() => array.foldl<number, null>(constant(constant(null)))(null)(trav)).not.toThrow();
});
