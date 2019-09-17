import * as jsc from 'jsverify';
import {
  alternativeMaybe,
  altMaybe,
  applicativeMaybe,
  applyMaybe,
  bindMaybe,
  foldableMaybe,
  functorMaybe,
  Just,
  makeEqMaybe,
  Maybe,
  monadErrorMaybe,
  monadMaybe,
  monadThrowMaybe,
  Nothing,
  plusMaybe,
  traversableMaybe,
} from '../src/Maybe';
import { TMaybe } from '../src/Maybe/internal';
import { makeAlt1Laws } from './laws/Alt';
import { makeAlternativeLaws } from './laws/Alternative';
import { makeApplicative1Laws } from './laws/Applicative';
import { makeApply1Laws } from './laws/Apply';
import { makeBind1Laws } from './laws/Bind';
import { makeEq1Laws } from './laws/Eq';
import { makeFoldable1Laws } from './laws/Foldable';
import { makeFunctor1Laws } from './laws/Functor';
import { makeMonad1Laws } from './laws/Monad';
import { makeMonadError1Laws } from './laws/MonadError';
import { makeMonadThrow1Laws } from './laws/MonadThrow';
import { makePlusLaws } from './laws/Plus';
import { makeTraversableLaws } from './laws/Traversable';

const makeArb = <a>(arb: jsc.Arbitrary<a>): jsc.Arbitrary<Maybe<a>> => {
  const arbMaybe: jsc.Arbitrary<Maybe<a>> = jsc.oneof([
    jsc.constant(Nothing),
    arb.smap(Just, x => x.value),
  ]);
  arbMaybe.show = fa => (fa.isNothing ? 'Nothing' : `Just(${(arb.show || String)(fa.value)})`);
  return arbMaybe;
};

describe('Functor', () => {
  const functorLaws = makeFunctor1Laws(functorMaybe)(makeEqMaybe)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply1Laws(applyMaybe)(makeEqMaybe)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative1Laws(applicativeMaybe)(makeEqMaybe)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAlt1Laws(altMaybe)(makeEqMaybe)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Plus', () => {
  const plusLaws = makePlusLaws(plusMaybe)(makeEqMaybe)(makeArb);
  test('Plus - left identity', plusLaws.leftIdentity);
  test('Plus - right identity', plusLaws.rightIdentity);
  test('Plus - annihilation', plusLaws.annihilation);
});

describe('Alternative', () => {
  const alternativeLaws = makeAlternativeLaws(alternativeMaybe)(makeEqMaybe)(makeArb);
  test('Alternative - distributivity', alternativeLaws.distributivity);
  test('Alternative - annihilation', alternativeLaws.annihilation);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable1Laws(foldableMaybe)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind1Laws(bindMaybe)(makeEqMaybe)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad1Laws(monadMaybe)(makeEqMaybe)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('MonadThrow', () => {
  const monadThrowLaws = makeMonadThrow1Laws(monadThrowMaybe)(makeEqMaybe)(
    jsc.constant(undefined as void)
  )(makeArb);
  test('MonadThrow - left zero', monadThrowLaws.leftZero);
});

describe('MonadError', () => {
  const monadErrorLaws = makeMonadError1Laws(monadErrorMaybe)(makeEqMaybe)(
    jsc.constant(undefined as void)
  )(makeArb);
  test('MonadError - catch', monadErrorLaws.catch);
  test('MonadError - pure', monadErrorLaws.pure);
});

describe('Eq', () => {
  const eqLaws = makeEq1Laws<TMaybe>(makeEqMaybe)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});

describe('Traversable', () => {
  const traversableLaws = makeTraversableLaws(traversableMaybe)(makeEqMaybe)(makeArb);
  test('Traversable - naturality', traversableLaws.naturality);
  test('Traversable - identity', traversableLaws.identity);
  test('Traversable - composition', traversableLaws.composition);
});
