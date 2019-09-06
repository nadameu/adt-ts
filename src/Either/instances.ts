import { Alt_2 } from '../typeclasses/Alt';
import { Applicative_2 } from '../typeclasses/Applicative';
import { Apply_2 } from '../typeclasses/Apply';
import { Bind_2 } from '../typeclasses/Bind';
import { Eq } from '../typeclasses/Eq';
import { Foldable_2 } from '../typeclasses/Foldable';
import { Functor_2 } from '../typeclasses/Functor';
import { Monad_2 } from '../typeclasses/Monad';
import { MonadError_2 } from '../typeclasses/MonadError';
import { MonadThrow_2 } from '../typeclasses/MonadThrow';
import { Traversable_2 } from '../typeclasses/Traversable';
import { Either } from './definitions';
import {
  alt,
  apply,
  bind,
  catchError,
  foldl,
  foldMap,
  foldr,
  map,
  pure,
  sequence,
  throwError,
  traverse,
} from './functions';
import { TEither } from './internal';

export const makeEqEither = <a, b>(eqA: Eq<a>, eqB: Eq<b>) =>
  ({
    eq: fx => fy =>
      fx.isLeft
        ? fy.isLeft && eqA.eq(fx.leftValue)(fy.leftValue)
        : fy.isRight && eqB.eq(fx.rightValue)(fy.rightValue),
  } as Eq<Either<a, b>>);

export const functorEither = { map } as Functor_2<TEither>;
export const applyEither = { apply, map } as Apply_2<TEither>;
export const bindEither = { apply, bind, map } as Bind_2<TEither>;
export const applicativeEither = { apply, map, pure } as Applicative_2<TEither>;
export const monadEither = { apply, bind, map, pure } as Monad_2<TEither>;
export const monadThrowEither = { apply, bind, map, pure, throwError } as MonadThrow_2<TEither>;
export const monadErrorEither = { apply, bind, catchError, map, pure, throwError } as MonadError_2<
  TEither
>;
export const foldableEither = { foldl, foldMap, foldr } as Foldable_2<TEither>;
export const altEither = { map, alt } as Alt_2<TEither>;
export const traversableEither = { foldMap, foldl, foldr, map, sequence, traverse } as Traversable_2<
  TEither
>;
