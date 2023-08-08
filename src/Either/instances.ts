import { Done, Loop, Step, tailRec } from '../helpers';
import {
  Alt_2,
  Applicative_2,
  Apply_2,
  Bind_2,
  Eq,
  Foldable_2,
  Functor_2,
  MonadError_2,
  MonadThrow_2,
  Monad_2,
  Traversable_2,
} from '../typeclasses';
import { makeMonadRecInstance } from '../typeclasses/MonadRec';
import { Either, Left, Right } from './definitions';
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
  }) as Eq<Either<a, b>>;

export const functorEither = { map } as Functor_2<TEither>;
export const applyEither = { apply, map } as Apply_2<TEither>;
export const bindEither = { apply, bind, map } as Bind_2<TEither>;
export const applicativeEither = { apply, map, pure } as Applicative_2<TEither>;
export const monadEither = { apply, bind, map, pure } as Monad_2<TEither>;
export const monadThrowEither = { apply, bind, map, pure, throwError } as MonadThrow_2<TEither>;
export const monadErrorEither = {
  apply,
  bind,
  catchError,
  map,
  pure,
  throwError,
} as MonadError_2<TEither>;
export const foldableEither = { foldl, foldMap, foldr } as Foldable_2<TEither>;
export const altEither = { map, alt } as Alt_2<TEither>;
export const traversableEither = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable_2<TEither>;
export const monadRecEither = makeMonadRecInstance<TEither>({
  apply,
  bind,
  map,
  pure,
  tailRecM: <a, b, c>(f: (_: b) => Either<a, Step<b, c>>) =>
    /* #__PURE__ */
    tailRec<b, Either<a, c>>(x => {
      const fy = f(x);
      if (fy.isLeft) return Done(Left(fy.leftValue));
      const r = fy.rightValue;
      if (r.done) return Done(Right(r.value));
      return Loop(r.value);
    }),
});
