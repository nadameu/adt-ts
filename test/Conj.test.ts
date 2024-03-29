import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import { eqBoolean, monoidConj, semigroupConj } from '../src';
import { makeMonoidLaws } from './laws/Monoid';
import { makeSemigroupLaws } from './laws/Semigroup';

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupConj)(eqBoolean)(fc.boolean());
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidConj)(eqBoolean)(fc.boolean());
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
