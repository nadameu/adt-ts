import * as fc from 'fast-check';
import { eqString } from '../src/String';
import { makeEqLaws } from './laws/Eq';

describe('Eq', () => {
  const eqLaws = makeEqLaws(eqString)(fc.string());
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
