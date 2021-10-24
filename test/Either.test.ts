import * as fc from 'fast-check';
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
  either,
  Right,
  pipeValue,
  Just,
  Nothing,
  altArray,
  altObject,
  altMaybe,
  applicativeArray,
} from '../src';
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

const makeArb = <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>): fc.Arbitrary<Either<a, b>> =>
  fc.oneof(arbA.map(Left), arbB.map(Right));

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

describe('Traversable', () => {
  test('traverse', () => {
    const a: Either<string, number> = Right(42);
    const b: Either<string, number> = Left('Error');

    expect(pipeValue(a).pipe(either.traverse(applicativeArray)(x => [x, x + 1]))).toEqual([
      Right(42),
      Right(43),
    ]);

    expect(pipeValue(b).pipe(either.traverse(applicativeArray)((x: number) => [x, x + 1]))).toEqual(
      [Left('Error')]
    );
  });
});

test('choose', () => {
  expect(either.choose(altArray)([1, 2, 3])(['a', 'b', 'c'])).toEqual([
    Left(1),
    Left(2),
    Left(3),
    Right('a'),
    Right('b'),
    Right('c'),
  ]);
  expect(either.choose(altMaybe)(Just(42))(Nothing)).toEqual(Just(Left(42)));
  expect(either.choose(altMaybe)(Just(42))(Just('hey'))).toEqual(Just(Left(42)));
  expect(either.choose(altMaybe)(Nothing)(Just('hey'))).toEqual(Just(Right('hey')));
  expect(either.choose(altMaybe)(Nothing)(Nothing)).toEqual(Nothing);
});

describe('Helper functions', () => {
  test('note', () => {
    expect(pipeValue(Just(42)).pipe(either.note('Error'))).toEqual(Right(42));
    expect(pipeValue(Nothing).pipe(either.note('Error'))).toEqual(Left('Error'));
  });

  test('noteL', () => {
    expect(pipeValue(Just(42)).pipe(either.noteL(() => 'Error'))).toEqual(Right(42));
    expect(pipeValue(Nothing).pipe(either.noteL(() => 'Error'))).toEqual(Left('Error'));
  });

  test('hush', () => {
    expect(pipeValue(Right(42)).pipe(either.hush)).toEqual(Just(42));
    expect(pipeValue(Left('Error')).pipe(either.hush)).toEqual(Nothing);
  });

  test('swap', () => {
    expect(pipeValue(Right('Error')).pipe(either.swap)).toEqual(Left('Error'));
    expect(pipeValue(Left(42)).pipe(either.swap)).toEqual(Right(42));
  });
});
