import * as fc from 'fast-check';
import { eqBoolean } from '../src/Boolean';
import { makeEqLaws } from './laws/Eq';

describe('Eq', () => {
  const eqLaws = makeEqLaws(eqBoolean)(fc.boolean());
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
