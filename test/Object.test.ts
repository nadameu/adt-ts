import * as jsc from 'jsverify';
import {
  applyObject,
  functorObject,
  monoidObject,
  semigroupObject,
  makeEqObject,
} from '../src/Object';
import { makeAltLaws } from './laws/Alt';
import { makeAlternativeLaws } from './laws/Alternative';
import { makeApplicativeLaws } from './laws/Applicative';
import { makeApplyLaws } from './laws/Apply';
import { makeEq1Laws } from './laws/Eq';
import { makeFunctorLaws } from './laws/Functor';
import { makeMonoid1Laws } from './laws/Monoid';
import { makePlusLaws } from './laws/Plus';
import { makeSemigroup1Laws } from './laws/Semigroup';
import { Generic1 } from '../src/Generic';
import { Functor1 } from '../src/typeclasses/Functor';
import { Apply1 } from '../src/typeclasses/Apply';
import { Alt1 } from '../src/typeclasses/Alt';
import { Plus1 } from '../src/typeclasses/Plus';
import { Alternative1 } from '../src/typeclasses/Alternative';
import { Semigroup1 } from '../src/typeclasses/Semigroup';
import { Monoid1 } from '../src/typeclasses/Monoid';

interface TObject extends Generic1 {
  type: Record<string, this['a']>;
}
const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<Record<string, a>> => jsc.dict(arb);

describe('Functor', () => {
  const functorLaws = makeFunctorLaws(functorObject as Functor1<TObject>)(makeEqObject)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApplyLaws(applyObject as Apply1<TObject>)(makeEqObject)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Alt', () => {
  const altLaws = makeAltLaws({ map: functorObject.map, alt: semigroupObject.append } as Alt1<
    TObject
  >)(makeEqObject)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws({
    map: functorObject.map,
    alt: semigroupObject.append,
    empty: monoidObject.mempty,
  } as Plus1<TObject>)(makeEqObject)(makeArb);
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TObject>(makeEqObject)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroup1Laws(semigroupObject as Semigroup1<TObject>)(makeEqObject)(
    makeArb
  );
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoid1Laws(monoidObject as Monoid1<TObject>)(makeEqObject)(makeArb);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
