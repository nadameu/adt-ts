import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import { alternativeMaybe, Just, makeEqMaybe, Maybe, Nothing } from '../src';
import { makeMonoidAlternate, makeSemigroupAlternate } from '../src/Alternate';
import { makeMonoid1Laws } from './laws/Monoid';
import { makeSemigroup1Laws } from './laws/Semigroup';

const makeArb = <a>(arb: fc.Arbitrary<a>): fc.Arbitrary<Maybe<a>> => {
  return fc.oneof(fc.constant(Nothing), arb.map(Just));
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
