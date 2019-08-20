import { curry2 } from '../curry';
import { Generic1, Type1 } from '../Generic';
import { Just, Maybe, Nothing } from '../Maybe/definitions';
import { maybe, maybeL } from '../Maybe/functions';
import { Alt1, Alt2 } from '../typeclasses/Alt';
import { AnyApplicative, Applicative2 } from '../typeclasses/Applicative';
import { Bind2 } from '../typeclasses/Bind';
import { Foldable2, foldlDefault, foldrDefault } from '../typeclasses/Foldable';
import { ap, liftM1, Monad2 } from '../typeclasses/Monad';
import { MonadError2 } from '../typeclasses/MonadError';
import { MonadThrow2 } from '../typeclasses/MonadThrow';
import { AnyMonoid } from '../typeclasses/Monoid';
import { sequenceDefault, Traversable2 } from '../typeclasses/Traversable';
import { Either, Left, Right } from './definitions';
import { TEither } from './internal';

export const either = <a, c>(f: (_: a) => c) => <b>(g: (_: b) => c) => (fab: Either<a, b>): c =>
  fab.isLeft ? f(fab.leftValue) : g(fab.rightValue);

export const bind: Bind2<TEither>['bind'] = either<any, Either<any, any>>(Left);

export const pure: Applicative2<TEither>['pure'] = Right;

export const map = liftM1({ bind, pure } as Monad2<TEither>);

export const apply = ap({ bind, pure } as Monad2<TEither>);

export const alt: Alt2<TEither>['alt'] = curry2((fx, fy) => (fx.isLeft ? fy : fx));

export const throwError: MonadThrow2<TEither>['throwError'] = Left;

export const catchError: MonadError2<TEither>['catchError'] = f => either(f)(Right);

export const foldMap: Foldable2<TEither>['foldMap'] = (monoid: AnyMonoid) => either(monoid.mempty);

export const foldl = foldlDefault({ foldMap } as Foldable2<TEither>);

export const foldr = foldrDefault({ foldMap } as Foldable2<TEither>);

export const traverse: Traversable2<TEither>['traverse'] = (applicative: AnyApplicative) => <b, c>(
  f: (_: b) => Type1<Generic1, c>
): (<a>(fab: Either<a, b>) => Type1<Generic1, Either<a, c>>) =>
  either(a => applicative.pure(Left(a)))(b => applicative.map(Right)(f(b)));

export const sequence = sequenceDefault({ traverse } as Traversable2<TEither>);

export const choose = <m extends Generic1>(alt: Alt1<m>) => <a>(ma: Type1<m, a>) => <b>(
  mb: Type1<m, b>
): Type1<m, Either<a, b>> => alt.alt(alt.map(Left)(ma), alt.map(Right)(mb));

export const note = <a>(a: a): (<b>(fb: Maybe<b>) => Either<a, b>) =>
  maybe<Either<a, any>>(Left(a))(Right);

export const noteL = <a>(thunk: () => a): (<b>(fb: Maybe<b>) => Either<a, b>) =>
  maybeL<Either<a, any>>(() => Left(thunk()))(Right);

export const hush: <a, b>(fab: Either<a, b>) => Maybe<b> = either<unknown, Maybe<any>>(
  () => Nothing
)(Just);
