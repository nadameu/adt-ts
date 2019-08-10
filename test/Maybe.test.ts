import jsc from 'jsverify';
import {
  altMaybe,
  applicativeMaybe,
  applyMaybe,
  bindMaybe,
  foldableMaybe,
  functorMaybe,
  Just,
  makeEqMaybe,
  Maybe,
  Nothing
} from '../src/Maybe';
import { TMaybe } from '../src/Maybe/internal';
import { makeAltLaws } from './laws/Alt';
import { makeApplicativeLaws } from './laws/Applicative';
import { makeApplyLaws } from './laws/Apply';
import { makeBindLaws } from './laws/Bind';
import { makeEq1Laws } from './laws/Eq';
import { makeFoldableLaws } from './laws/Foldable';
import { makeFunctorLaws } from './laws/Functor';

const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<Maybe<a>> =>
  jsc.oneof([jsc.constant(Nothing), arb.smap(Just, x => x.value)]);

describe('Functor', () => {
  const functorLaws = makeFunctorLaws(functorMaybe)(makeEqMaybe)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApplyLaws(applyMaybe)(makeEqMaybe)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicativeLaws(applicativeMaybe)(makeEqMaybe)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAltLaws(altMaybe)(makeEqMaybe)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldableLaws(foldableMaybe)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBindLaws(bindMaybe)(makeEqMaybe)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TMaybe>(makeEqMaybe)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
