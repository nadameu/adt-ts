import * as fc from 'fast-check';
import { Generic1 } from '../src/Generic';
import {
  altObject,
  applyObject,
  foldableObject,
  functorObject,
  makeEqObject,
  plusObject,
  traversableObject,
} from '../src/Object';
import {
  Alt_1,
  Apply_1,
  Eq,
  Foldable_1,
  Functor_1,
  Plus_1,
  Traversable_1,
} from '../src/typeclasses';
import { makeAlt1Laws } from './laws/Alt';
import { makeApply1Laws } from './laws/Apply';
import { makeEq1Laws } from './laws/Eq';
import { makeFoldable1Laws } from './laws/Foldable';
import { makeFunctor1Laws } from './laws/Functor';
import { makePlusLaws } from './laws/Plus';
import { makeTraversableLaws } from './laws/Traversable';

const makeArb = <a>(arb: fc.Arbitrary<a>): fc.Arbitrary<Record<'a' | 'b' | 'c', a>> =>
  fc.record({ a: arb, b: arb, c: arb });

const makeEq = <a>(eq: Eq<a>): Eq<Record<'a' | 'b' | 'c', a>> =>
  makeEqObject({ a: eq, b: eq, c: eq });

interface TTestObject extends Generic1 {
  type: Record<'a' | 'b' | 'c', this['a']>;
}

const makeEqDict = <a>(eq: Eq<a>): Eq<Record<string, a>> =>
  makeEqObject(new Proxy({}, { get: () => eq }));
interface TTestDict extends Generic1 {
  type: Record<string, this['a']>;
}

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorObject as any as Functor_1<TTestObject>)(makeEq)(
    makeArb
  );
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(applyObject as any as Apply_1<TTestObject>)(makeEq)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Alt', () => {
  const altLaws = makeAlt1Laws(altObject as any as Alt_1<TTestDict>)(makeEqDict)(a =>
    fc.dictionary(fc.string(), a)
  );
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws(plusObject as any as Plus_1<TTestDict>)(makeEqDict)(a =>
    fc.dictionary(fc.string(), a)
  );
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableObject as any as Foldable_1<TTestDict>)(a =>
    fc.dictionary(fc.string(), a)
  );
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TTestDict>(makeEqDict)(a => fc.dictionary(fc.string(), a));
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Traversable', () => {
  const traversableLaws = makeTraversableLaws(traversableObject as any as Traversable_1<TTestDict>)(
    makeEqDict
  )(a => fc.dictionary(fc.string(), a));
  test('Traversable - naturality', traversableLaws.naturality);
  test('Traversable - identity', traversableLaws.identity);
  test('Traversable - composition', traversableLaws.composition);
});
