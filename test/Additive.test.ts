import * as jsc from 'jsverify';
import { monoidAdditive, semigroupAdditive } from '../src/Additive';
import { eqNumber } from '../src/Number';
import { makeMonoidLaws } from './laws/Monoid';
import { makeSemigroupLaws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupAdditive)(eqNumber)(jsc.number);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidAdditive)(eqNumber)(jsc.number);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
