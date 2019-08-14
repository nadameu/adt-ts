import * as jsc from 'jsverify';
import {
  altEither,
  applicativeEither,
  applyEither,
  bindEither,
  Either,
  foldableEither,
  functorEither,
  Left,
  makeEqEither,
  monadEither,
  monadErrorEither,
  monadThrowEither,
  Right,
} from '../src/Either';
import { TEither } from '../src/Either/internal';
import { makeAlt2Laws } from './laws/Alt';
import { makeApplicative2Laws } from './laws/Applicative';
import { makeApply2Laws } from './laws/Apply';
import { makeBind2Laws } from './laws/Bind';
import { makeEq2Laws } from './laws/Eq';
import { makeFoldable2Laws } from './laws/Foldable';
import { makeFunctor2Laws } from './laws/Functor';
import { makeMonad2Laws } from './laws/Monad';
import { makeMonadError2Laws } from './laws/MonadError';
import { makeMonadThrow2Laws } from './laws/MonadThrow';

const makeArb = <a, b>(
  arbA: jsc.Arbitrary<a>,
  arbB: jsc.Arbitrary<b>
): jsc.Arbitrary<Either<a, b>> =>
  jsc.oneof([arbA.smap(Left, x => x.leftValue), arbB.smap(Right, x => x.rightValue)]);

describe('Functor', () => {
  const functorLaws = makeFunctor2Laws(functorEither)(makeEqEither)(makeArb);
  test('Functor - identity', functorLaws.identity);
  test('Functor - composition', functorLaws.composition);
});

describe('Apply', () => {
  const applyLaws = makeApply2Laws(applyEither)(makeEqEither)(makeArb);
  test('Apply - composition', applyLaws.composition);
});

describe('Applicative', () => {
  const applicativeLaws = makeApplicative2Laws(applicativeEither)(makeEqEither)(makeArb);
  test('Applicative - identity', applicativeLaws.identity);
  test('Applicative - homomorphism', applicativeLaws.homomorphism);
  test('Applicative - interchange', applicativeLaws.interchange);
});

describe('Alt', () => {
  const altLaws = makeAlt2Laws(altEither)(makeEqEither)(makeArb);
  test('Alt - associativity', altLaws.associativity);
  test('Alt - distributivity', altLaws.distributivity);
});

describe('Foldable', () => {
  const foldableLaws = makeFoldable2Laws(foldableEither)(makeArb);
  test('Foldable - foldl', foldableLaws.foldl);
  test('Foldable - foldr', foldableLaws.foldr);
  test('Foldable - foldMap', foldableLaws.foldMap);
});

describe('Bind', () => {
  const bindLaws = makeBind2Laws(bindEither)(makeEqEither)(makeArb);
  test('Bind - associativity', bindLaws.associativity);
});

describe('Monad', () => {
  const monadLaws = makeMonad2Laws(monadEither)(makeEqEither)(makeArb);
  test('Monad - left identity', monadLaws.leftIdentity);
  test('Monad - right identity', monadLaws.rightIdentity);
});

describe('MonadThrow', () => {
  const monadThrowLaws = makeMonadThrow2Laws(monadThrowEither)(makeEqEither)(makeArb);
  test('MonadThrow - left zero', monadThrowLaws.leftZero);
});

describe('MonadError', () => {
  const monadErrorLaws = makeMonadError2Laws(monadErrorEither)(makeEqEither)(makeArb);
  test('MonadError - catch', monadErrorLaws.catch);
  test('MonadError - pure', monadErrorLaws.pure);
});

describe('Eq', () => {
  const eqLaws = makeEq2Laws<TEither>(makeEqEither)(makeArb);
  test('Eq - reflexivity', eqLaws.reflexivity);
  test('Eq - symmetry', eqLaws.symmetry);
  test('Eq - transitivity', eqLaws.transitivity);
});
