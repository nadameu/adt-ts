import * as fc from 'fast-check';
import { eqNumber } from '../src/Number';
import { makeEqLaws } from './laws/Eq';

describe('Eq', () => {
  const eqLaws = makeEqLaws(eqNumber)(fc.double());
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
