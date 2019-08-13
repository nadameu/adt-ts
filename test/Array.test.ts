import jsc from 'jsverify';
import {
  applicativeArray,
  applyArray,
  bindArray,
  foldableArray,
  functorArray,
  makeEqArray,
  monadArray,
  monoidArray,
} from '../src/Array';
import { TArray } from '../src/Array/internal';
import { Alt1 } from '../src/typeclasses/Alt';
import { Alternative1 } from '../src/typeclasses/Alternative';
import { Plus1 } from '../src/typeclasses/Plus';
import { makeAltLaws } from './laws/Alt';
import { makeAlternativeLaws } from './laws/Alternative';
import { makeApplicativeLaws } from './laws/Applicative';
import { makeApplyLaws } from './laws/Apply';
import { makeBindLaws } from './laws/Bind';
import { makeEq1Laws } from './laws/Eq';
import { makeFoldableLaws } from './laws/Foldable';
import { makeFunctorLaws } from './laws/Functor';
import { makeMonadLaws } from './laws/Monad';
import { makePlusLaws } from './laws/Plus';

const altArray: Alt1<TArray> = {
  ...functorArray,
  alt: monoidArray.append,
};
const plusArray: Plus1<TArray> = {
  ...altArray,
  empty: monoidArray.mempty,
};
const alternativeArray: Alternative1<TArray> = {
  ...plusArray,
  apply: applyArray.apply,
  pure: applicativeArray.pure,
};

const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<Array<a>> => jsc.array(arb);

describe('Functor', () => {
  const functorLaws = makeFunctorLaws(functorArray)(makeEqArray)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApplyLaws(applyArray)(makeEqArray)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicativeLaws(applicativeArray)(makeEqArray)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAltLaws(altArray)(makeEqArray)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws(plusArray)(makeEqArray)(makeArb);
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Alternative', () => {
  const alternativeLaws = makeAlternativeLaws(alternativeArray)(makeEqArray)(makeArb);
  test('Alternative - distributivity', alternativeLaws.distributivity);
  test('Alternative - annihilation', alternativeLaws.annihilation);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldableLaws(foldableArray)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBindLaws(bindArray)(makeEqArray)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonadLaws(monadArray)(makeEqArray)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TArray>(makeEqArray)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
