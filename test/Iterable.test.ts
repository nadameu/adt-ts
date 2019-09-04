import * as jsc from 'jsverify';
import {
  applicativeIterable,
  applyIterable,
  bindIterable,
  functorIterable,
  iterable,
  makeEqIterable,
  monadIterable,
  altIterable,
  plusIterable,
  alternativeIterable,
  semigroupIterable,
  monoidIterable,
  foldableIterable,
  traversableIterable,
} from '../src';
import { TIterable } from '../src/Iterable/internal';
import { makeApplicative1Laws } from './laws/Applicative';
import { makeApply1Laws } from './laws/Apply';
import { makeBind1Laws } from './laws/Bind';
import { makeEq1Laws } from './laws/Eq';
import { makeFunctor1Laws } from './laws/Functor';
import { makeMonad1Laws } from './laws/Monad';
import { makeAlt1Laws } from './laws/Alt';
import { makePlusLaws } from './laws/Plus';
import { makeAlternativeLaws } from './laws/Alternative';
import { makeSemigroup1Laws } from './laws/Semigroup';
import { makeMonoid1Laws } from './laws/Monoid';
import { makeFoldable1Laws } from './laws/Foldable';
import { makeTraversableLaws } from './laws/Traversable';

const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<Iterable<a>> => {
  const base = jsc.array(arb);
  return base.smap(iterable.fromArray, xs => Array.from(xs), xs => base.show!(Array.from(xs)));
};

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorIterable)(makeEqIterable)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(applyIterable)(makeEqIterable)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(applicativeIterable)(makeEqIterable)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAlt1Laws(altIterable)(makeEqIterable)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws(plusIterable)(makeEqIterable)(makeArb);
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Alternative', () => {
  const alternativeLaws = makeAlternativeLaws(alternativeIterable)(makeEqIterable)(makeArb);
  test('Alternative - distributivity', alternativeLaws.distributivity);
  test('Alternative - annihilation', alternativeLaws.annihilation);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableIterable)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind1Laws(bindIterable)(makeEqIterable)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadIterable)(makeEqIterable)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TIterable>(makeEqIterable)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupIterable)(makeEqIterable)(makeArb);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoid1Laws(monoidIterable)(makeEqIterable)(makeArb);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});

describe('Traversable', () => {
  const traversableLaws = makeTraversableLaws(traversableIterable)(makeEqIterable)(makeArb);
  test('Traversable - naturality', traversableLaws.naturality);
  test('Traversable - identity', traversableLaws.identity);
  test('Traversable - composition', traversableLaws.composition);
});
