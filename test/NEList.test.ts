import * as jsc from 'jsverify';
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
  NEList,
  semigroupNEList,
  traversableNEList,
} from '../src';
import { TNEList } from '../src/List/internal';
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

const nelistToNEArray: <a>(list: NEList<a>) => a[] = list.foldl<unknown, any[]>(xs => x => (
  xs.push(x), xs
))([]);
const nearrayToNEList: <a>(array: a[]) => NEList<a> = array.foldr<unknown, NEList<any>>(list.cons)(
  list.nil as any
);

const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<NEList<a>> => {
  const base = jsc.nearray(arb);
  return base.smap(nearrayToNEList, nelistToNEArray, xs => base.show!(nelistToNEArray(xs)));
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
