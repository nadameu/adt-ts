import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import { eqNumber, monoidMultiplicative, semigroupMultiplicative } from '../src';
import { makeMonoidLaws } from './laws/Monoid';
import { makeSemigroupLaws } from './laws/Semigroup';

const smallInteger = fc.integer({ min: -32768, max: 32768 });

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupMultiplicative)(eqNumber)(smallInteger);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidMultiplicative)(eqNumber)(smallInteger);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});
