import jsc from 'jsverify';
import { monoidMultiplicative, semigroupMultiplicative } from '../src/Multiplicative';
import { makeSemigroupLaws } from './laws/Semigroup';
import { eqNumber } from '../src/Number';
import { makeMonoidLaws } from './laws/Monoid';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupMultiplicative)(eqNumber)(jsc.int16);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidMultiplicative)(eqNumber)(jsc.number);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
