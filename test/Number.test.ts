import * as jsc from 'jsverify';
import { eqNumber } from '../src/Number';
import { makeEqLaws } from './laws/Eq';

describe('Eq', () => {
  const eqLaws = makeEqLaws(eqNumber)(jsc.number);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
