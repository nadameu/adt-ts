import * as jsc from 'jsverify';
import { eqBoolean } from '../src/Boolean';
import { monoidConj, semigroupConj } from '../src/Conj';
import { makeMonoidLaws } from './laws/Monoid';
import { makeSemigroupLaws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupConj)(eqBoolean)(jsc.bool);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidConj)(eqBoolean)(jsc.bool);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
