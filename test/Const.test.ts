import * as fc from 'fast-check';
import { describe, test } from 'vitest';
import {
  functorConst,
  identity,
  makeApplicativeConst,
  makeApplyConst,
  makeEqArray,
  monoidArray,
  semigroupArray,
} from '../src';
import { makeApplicative2Laws } from './laws/Applicative';
import { makeApply2Laws } from './laws/Apply';
import { makeFunctor2Laws } from './laws/Functor';

const makeEqConst = identity;
const makeArb = identity;
const makeArbArray = <a>(arb: fc.Arbitrary<a>): fc.Arbitrary<a[]> => fc.array(arb);

describe('Functor', () => {
  const functorLaws = makeFunctor2Laws(functorConst)(makeEqConst)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyConst = makeApplyConst(semigroupArray);
  const applyLaws = makeApply2Laws(applyConst)(makeEqArray)(makeArbArray);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeConst = makeApplicativeConst(monoidArray);
  const applicativeLaws = makeApplicative2Laws(applicativeConst)(makeEqArray)(makeArbArray);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});
