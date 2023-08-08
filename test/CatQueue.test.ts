import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import {
  CatQueue,
  List,
  altCatQueue,
  alternativeCatQueue,
  applicativeCatQueue,
  applyCatQueue,
  array,
  bindCatQueue,
  foldableCatQueue,
  functorCatQueue,
  list,
  makeEqCatQueue,
  monadCatQueue,
  monoidCatQueue,
  plusCatQueue,
  semigroupCatQueue,
  traversableCatQueue,
} from '../src';
import { TCatQueue } from '../src/CatQueue/internal';
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

const arrayToList: <a>(array: a[]) => List<a> = array.foldr(list.cons)(list.nil);

const makeArb = <a>(arb: fc.Arbitrary<a>): fc.Arbitrary<CatQueue<a>> =>
  fc
    .tuple(fc.array(arb, { maxLength: 3 }), fc.array(arb, { maxLength: 3 }))
    .map(([left, right]) => CatQueue(arrayToList(left))(arrayToList(right)));

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorCatQueue)(makeEqCatQueue)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(applyCatQueue)(makeEqCatQueue)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(applicativeCatQueue)(makeEqCatQueue)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAlt1Laws(altCatQueue)(makeEqCatQueue)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws(plusCatQueue)(makeEqCatQueue)(makeArb);
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Alternative', () => {
  const alternativeLaws = makeAlternativeLaws(alternativeCatQueue)(makeEqCatQueue)(makeArb);
  test('Alternative - distributivity', alternativeLaws.distributivity);
  test('Alternative - annihilation', alternativeLaws.annihilation);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableCatQueue)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind1Laws(bindCatQueue)(makeEqCatQueue)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadCatQueue)(makeEqCatQueue)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TCatQueue>(makeEqCatQueue)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupCatQueue)(makeEqCatQueue)(makeArb);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoid1Laws(monoidCatQueue)(makeEqCatQueue)(makeArb);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});

describe('Traversable', () => {
  const traversableLaws = makeTraversableLaws(traversableCatQueue)(makeEqCatQueue)(makeArb);
  test('Traversable - naturality', traversableLaws.naturality);
  test('Traversable - identity', traversableLaws.identity);
  test('Traversable - composition', traversableLaws.composition);
});
