import * as jsc from 'jsverify';
import {
  applicativeLazyList,
  applyLazyList,
  bindLazyList,
  ConsResult,
  foldableLazyList,
  functorLazyList,
  LazyList,
  makeEqLazyList,
  monadLazyList,
  monoidLazyList,
  NilResult,
  semigroupLazyList,
} from '../src';
import { TLazyList } from '../src/LazyList/internal';
import { makeApplicative1Laws } from './laws/Applicative';
import { makeApply1Laws } from './laws/Apply';
import { makeBind1Laws } from './laws/Bind';
import { makeEq1Laws } from './laws/Eq';
import { makeFoldable1Laws } from './laws/Foldable';
import { makeFunctor1Laws } from './laws/Functor';
import { makeMonad1Laws } from './laws/Monad';
import { makeMonoid1Laws } from './laws/Monoid';
import { makeSemigroup1Laws } from './laws/Semigroup';

const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<LazyList<a>> => {
  const base = jsc.array(arb);
  return base.smap(
    fromArray,
    xs => Array.from(toIterable(xs)),
    xs => base.show!(Array.from(toIterable(xs)))
  );
};

const fromArray = <a>(array: a[]): LazyList<a> => () => {
  const len = array.length;
  const go = (i = 0): ConsResult<a> | NilResult => {
    if (i >= len) return NilResult;
    return ConsResult(array[i])(() => go(i + 1));
  };
  return go();
};

const toIterable = <a>(list: LazyList<a>) => ({
  *[Symbol.iterator]() {
    let result = list();
    while (result.isCons) {
      yield result.head;
      result = result.tail();
    }
  },
});

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorLazyList)(makeEqLazyList)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(applyLazyList)(makeEqLazyList)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(applicativeLazyList)(makeEqLazyList)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

// describe('Alt', () => {
//   const altLaws = makeAlt1Laws(altLazyList)(makeEqLazyList)(makeArb);
//   test('Alt - associativity', altLaws.associativity);
//   test('Alt - distributivity', altLaws.distributivity);
// });

// describe('Plus', () => {
//   const plusLaws = makePlusLaws(plusLazyList)(makeEqLazyList)(makeArb);
//   test('Plus - left identity', plusLaws.leftIdentity);
//   test('Plus - right identity', plusLaws.rightIdentity);
//   test('Plus - annihilation', plusLaws.annihilation);
// });

// describe('Alternative', () => {
//   const alternativeLaws = makeAlternativeLaws(alternativeLazyList)(makeEqLazyList)(makeArb);
//   test('Alternative - distributivity', alternativeLaws.distributivity);
//   test('Alternative - annihilation', alternativeLaws.annihilation);
// });

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableLazyList)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind1Laws(bindLazyList)(makeEqLazyList)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadLazyList)(makeEqLazyList)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TLazyList>(makeEqLazyList)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupLazyList)(makeEqLazyList)(makeArb);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoid1Laws(monoidLazyList)(makeEqLazyList)(makeArb);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});

// describe('Traversable', () => {
//   const traversableLaws = makeTraversableLaws(traversableLazyList)(makeEqLazyList)(makeArb);
//   test('Traversable - naturality', traversableLaws.naturality);
//   test('Traversable - identity', traversableLaws.identity);
//   test('Traversable - composition', traversableLaws.composition);
// });
