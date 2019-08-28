import { Generic1, Type1 } from '../Generic';
import { Just, Maybe, maybe, Nothing } from '../Maybe/definitions';
import { maybeL } from '../Maybe/functions';
import { Alt1, Alt2 } from '../typeclasses/Alt';
import { Applicative, Applicative2 } from '../typeclasses/Applicative';
import { Bind2 } from '../typeclasses/Bind';
import { Foldable2, foldlDefault, foldrDefault } from '../typeclasses/Foldable';
import { ap, liftM1, Monad2 } from '../typeclasses/Monad';
import { MonadError2 } from '../typeclasses/MonadError';
import { MonadThrow2 } from '../typeclasses/MonadThrow';
import { Monoid } from '../typeclasses/Monoid';
import { sequenceDefault, Traversable2 } from '../typeclasses/Traversable';
import { Either, either, Left, Right } from './definitions';
import { TEither } from './internal';

export const bind: Bind2<TEither>['bind'] = either<any, Either<any, any>>(Left);

export const pure: Applicative2<TEither>['pure'] = Right;

export const map = liftM1({ bind, pure } as Monad2<TEither>);

export const apply = ap({ bind, pure } as Monad2<TEither>);

export const alt: Alt2<TEither>['alt'] = fx => fy => (fx.isLeft ? fy : fx);

export const throwError: MonadThrow2<TEither>['throwError'] = Left;

export const catchError: MonadError2<TEither>['catchError'] = f => either(f)(Right);

export const foldMap: Foldable2<TEither>['foldMap'] = (monoid: Monoid) => either(monoid.mempty);

export const foldl = foldlDefault({ foldMap } as Foldable2<TEither>);

export const foldr = foldrDefault({ foldMap } as Foldable2<TEither>);

export const traverse: Traversable2<TEither>['traverse'] = (applicative: Applicative) => <b, c>(
  f: (_: b) => Type1<Generic1, c>
): (<a>(fab: Either<a, b>) => Type1<Generic1, Either<a, c>>) =>
  either(a => applicative.pure(Left(a)))(b => applicative.map(Right)(f(b)));

export const sequence = sequenceDefault({ traverse } as Traversable2<TEither>);

export const choose = <m extends Generic1>(alt: Alt1<m>) => <a>(ma: Type1<m, a>) => <b>(
  mb: Type1<m, b>
): Type1<m, Either<a, b>> => alt.alt(alt.map(Left)(ma))(alt.map(Right)(mb));

export const note = <a>(a: a): (<b>(fb: Maybe<b>) => Either<a, b>) =>
  maybe<Either<a, any>>(Left(a))(Right);

export const noteL = <a>(thunk: () => a): (<b>(fb: Maybe<b>) => Either<a, b>) =>
  maybeL<Either<a, any>>(() => Left(thunk()))(Right);

export const hush: <a, b>(fab: Either<a, b>) => Maybe<b> = either<unknown, Maybe<any>>(
  () => Nothing
)(Just);

export const swap: <a, b>(fab: Either<a, b>) => Either<b, a> = either<any, Either<any, any>>(Right)(
  Left
);
