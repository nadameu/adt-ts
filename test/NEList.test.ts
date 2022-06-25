import * as fc from 'fast-check';
import { describe, expect, test } from 'vitest';
import {
  altNEList,
  applicativeNEList,
  applyNEList,
  array,
  bindNEList,
  foldableNEList,
  functorNEList,
  list,
  makeEqNEList,
  monadNEList,
  nelist,
  NEList,
  pipeValue,
  semigroupArray,
  semigroupNEList,
  traversableNEList,
} from '../src';
import { TNEList } from '../src/NEList/internal';
import { makeAlt1Laws } from './laws/Alt';
import { makeApplicative1Laws } from './laws/Applicative';
import { makeApply1Laws } from './laws/Apply';
import { makeBind1Laws } from './laws/Bind';
import { makeEq1Laws } from './laws/Eq';
import { makeFoldable1Laws } from './laws/Foldable';
import { makeFunctor1Laws } from './laws/Functor';
import { makeMonad1Laws } from './laws/Monad';
import { makeSemigroup1Laws } from './laws/Semigroup';
import { makeTraversableLaws } from './laws/Traversable';

const nelistToNEArray: <a>(list: NEList<a>) => a[] = nelist.foldl<unknown, any[]>(xs => x => {
  xs.push(x);
  return xs;
})([]);
const nearrayToNEList: <a>(array: a[]) => NEList<a> = array.foldr<unknown, NEList<any>>(
  nelist.cons
)(nelist.nil as any);

const makeArb = <a>(arb: fc.Arbitrary<a>): fc.Arbitrary<NEList<a>> => {
  return fc.tuple(arb, fc.array(arb)).map(([x, xs]) => nelist.cons(x)(nearrayToNEList(xs)));
};

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorNEList)(makeEqNEList)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(applyNEList)(makeEqNEList)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(applicativeNEList)(makeEqNEList)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAlt1Laws(altNEList)(makeEqNEList)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableNEList)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind1Laws(bindNEList)(makeEqNEList)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadNEList)(makeEqNEList)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TNEList>(makeEqNEList)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupNEList)(makeEqNEList)(makeArb);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Traversable', () => {
  const traversableLaws = makeTraversableLaws(traversableNEList)(makeEqNEList)(makeArb);
  test('Traversable - naturality', traversableLaws.naturality);
  test('Traversable - identity', traversableLaws.identity);
  test('Traversable - composition', traversableLaws.composition);
});

test('foldMap1', () => {
  expect(
    pipeValue(nelist.cons(1)(list.cons(2)(list.cons(3)(list.nil)))).pipe(
      nelist.foldMap1(semigroupArray)(x => [x, x + 1])
    )
  ).toEqual([1, 2, 2, 3, 3, 4]);
});
