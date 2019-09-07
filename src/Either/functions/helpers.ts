import { Just, Maybe, Nothing } from '../../Maybe/definitions';
import { Either, Left, Right } from '../definitions';

export const note = <a>(a: a) => <b>(fb: Maybe<b>): Either<a, b> =>
  fb.isNothing ? Left(a) : Right(fb.value);

export const noteL = <a>(thunk: () => a) => <b>(fb: Maybe<b>): Either<a, b> =>
  fb.isNothing ? Left(thunk()) : Right(fb.value);

export const hush = <a, b>(fab: Either<a, b>): Maybe<b> =>
  fab.isLeft ? Nothing : Just(fab.rightValue);

export const swap = <a, b>(fab: Either<a, b>): Either<b, a> =>
  fab.isLeft ? Right(fab.leftValue) : Left(fab.rightValue);
