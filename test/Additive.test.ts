import * as jsc from 'jsverify';
import { groupAdditive, monoidAdditive, semigroupAdditive } from '../src/Additive';
import { eqNumber } from '../src/Number';
import { makeGroupLaws } from './laws/Group';
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

describe('Group', () => {
  const groupLaws = makeGroupLaws(groupAdditive)(eqNumber)(jsc.number);
  test('Group - right inverse', groupLaws.rightInverse);
  test('Group - left inverse', groupLaws.leftInverse);
});
