import jsc from 'jsverify';
import {
  altMaybe,
  applicativeMaybe,
  applyMaybe,
  foldableMaybe,
  functorMaybe,
  Just,
  makeEqMaybe,
  Maybe,
  Nothing
} from '../src/Maybe';
import { makeAltLaws } from './Alt.laws';
import { makeApplicativeLaws } from './Applicative.laws';
import { makeApplyLaws } from './Apply.laws';
import { makeFoldableLaws } from './Foldable.laws';
import { makeFunctorLaws } from './Functor.laws';

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
  const applicativeLaws = makeApplicativeLaws(applicativeMaybe)(makeEqMaybe)(
    makeArb
  );
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
