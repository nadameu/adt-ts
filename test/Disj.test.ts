import * as fc from 'fast-check';
import { eqBoolean } from '../src/Boolean';
import { monoidDisj, semigroupDisj } from '../src/Disj';
import { makeMonoidLaws } from './laws/Monoid';
import { makeSemigroupLaws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupDisj)(eqBoolean)(fc.boolean());
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidDisj)(eqBoolean)(fc.boolean());
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
