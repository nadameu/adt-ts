import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import { eqNumber } from '../src';
import { makeEqLaws } from './laws/Eq';

describe('Eq', () => {
  const eqLaws = makeEqLaws(eqNumber)(fc.double({ noNaN: true }));
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
