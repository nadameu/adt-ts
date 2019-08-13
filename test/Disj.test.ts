import jsc from 'jsverify';
import { eqBoolean } from '../src/Boolean';
import { monoidDisj, semigroupDisj } from '../src/Disj';
import { makeMonoidLaws } from './laws/Monoid';
import { makeSemigroupLaws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupDisj)(eqBoolean)(jsc.bool);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidDisj)(eqBoolean)(jsc.bool);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
