import * as fc from 'fast-check';
import { groupAdditive, monoidAdditive, semigroupAdditive } from '../src/Additive';
import { eqNumber } from '../src/Number';
import { makeGroupLaws } from './laws/Group';
import { makeMonoidLaws } from './laws/Monoid';
import { makeSemigroupLaws } from './laws/Semigroup';

const smallInteger = fc.integer({ min: -32768, max: 32768 });

describe('Semigroup', () => {
  const semigroupLaws = makeSemigroupLaws(semigroupAdditive)(eqNumber)(smallInteger);
  test('Semigroup - associativity', semigroupLaws.associativity);
});

describe('Monoid', () => {
  const monoidLaws = makeMonoidLaws(monoidAdditive)(eqNumber)(smallInteger);
  test('Monoid - left unit', monoidLaws.leftUnit);
  test('Monoid - right unit', monoidLaws.rightUnit);
});

describe('Group', () => {
  const groupLaws = makeGroupLaws(groupAdditive)(eqNumber)(smallInteger);
  test('Group - right inverse', groupLaws.rightInverse);
  test('Group - left inverse', groupLaws.leftInverse);
});
