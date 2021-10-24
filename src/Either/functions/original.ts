import { Anon, Generic1, Type1 } from '../../Generic';
import {
  Alt_1,
  Alt_2,
  ap,
  Applicative_1,
  Applicative_2,
  Bind_2,
  Foldable_2,
  foldlDefault,
  foldrDefault,
  liftM1,
  MonadError_2,
  MonadThrow_2,
  Monad_2,
  Monoid_0,
  sequenceDefault,
  Traversable_2,
} from '../../typeclasses';
import { Either, Left, Right } from '../definitions';
import { TEither } from '../internal';

export const either =
  <a, c>(f: (_: a) => c) =>
  <b>(g: (_: b) => c) =>
  (fab: Either<a, b>): c =>
    fab.isLeft ? f(fab.leftValue) : g(fab.rightValue);

export const bind: Bind_2<TEither>['bind'] = either<any, Either<any, any>>(Left);

export const pure: Applicative_2<TEither>['pure'] = Right;

export const map = liftM1({ bind, pure } as Monad_2<TEither>);

export const apply = ap({ bind, pure } as Monad_2<TEither>);

export const alt: Alt_2<TEither>['alt'] = fx => fy => fx.isLeft ? fy : fx;

export const throwError: MonadThrow_2<TEither>['throwError'] = Left;

export const catchError: MonadError_2<TEither>['catchError'] = f => either(f)(Right);

export const foldMap: Foldable_2<TEither>['foldMap'] = <a>({ mempty }: Anon<Monoid_0<a>>) =>
  either(mempty);

export const foldl = foldlDefault({ foldMap } as Foldable_2<TEither>);

export const foldr = foldrDefault({ foldMap } as Foldable_2<TEither>);

export const traverse: Traversable_2<TEither>['traverse'] =
  <f extends Generic1>({ map, pure }: Anon<Applicative_1<f>, 'map' | 'pure'>) =>
  <b, c>(f: (_: b) => Type1<f, c>): (<a>(tab: Either<a, b>) => Type1<f, Either<a, c>>) =>
    either(a => pure(Left(a)))(b => map(Right)(f(b)));

export const sequence = sequenceDefault({ traverse } as Traversable_2<TEither>);

export const choose =
  <m extends Generic1>(alt: Alt_1<m>) =>
  <a>(ma: Type1<m, a>) =>
  <b>(mb: Type1<m, b>): Type1<m, Either<a, b>> =>
    alt.alt(alt.map(Left)(ma))(alt.map(Right)(mb));
