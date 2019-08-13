import jsc from 'jsverify';
import { monoidAdditive } from '../src/Additive';
import { makeSemigroupLaws } from './laws/Semigroup';
import { eqNumber } from '../src/Number';
import { makeMonoidLaws } from './laws/Monoid';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(monoidAdditive)(eqNumber)(jsc.number);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidAdditive)(eqNumber)(jsc.number);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
