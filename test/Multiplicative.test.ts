import * as jsc from 'jsverify';
import { monoidMultiplicative, semigroupMultiplicative } from '../src/Multiplicative';
import { eqNumber } from '../src/Number';
import { makeMonoidLaws } from './laws/Monoid';
import { makeSemigroupLaws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupMultiplicative)(eqNumber)(jsc.int16);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidMultiplicative)(eqNumber)(jsc.number);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
