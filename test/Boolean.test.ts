import * as jsc from 'jsverify';
import { eqBoolean } from '../src/Boolean';
import { makeEqLaws } from './laws/Eq';

describe('Eq', () => {
  const eqLaws = makeEqLaws(eqBoolean)(jsc.bool);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
