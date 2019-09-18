import * as jsc from 'jsverify';
import { alternativeMaybe, Just, makeEqMaybe, Maybe, Nothing } from '../src';
import { makeMonoidAlternate, makeSemigroupAlternate } from '../src/Alternate';
import { makeMonoid1Laws } from './laws/Monoid';
import { makeSemigroup1Laws } from './laws/Semigroup';

const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<Maybe<a>> => {
  const newArb = jsc.oneof([jsc.constant(Nothing), arb.smap(Just, x => x.value)]);
  newArb.show = x => (x.isNothing ? `Nothing` : `Just(${(arb.show || String)(x.value)})`);
  return newArb;
};

describe('Semigroup', () => {
  const semigroup = makeSemigroupAlternate(alternativeMaybe);
  const semigroupLaws = makeSemigroup1Laws(semigroup)(makeEqMaybe)(makeArb);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoid = makeMonoidAlternate(alternativeMaybe);
  const monoidLaws = makeMonoid1Laws(monoid)(makeEqMaybe)(makeArb);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
