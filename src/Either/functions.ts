import { Anon, Generic1, Type1 } from '../Generic';
import { Just, Maybe, maybe, Nothing } from '../Maybe/definitions';
import { maybeL } from '../Maybe/functions';
import { Alt_1, Alt_2 } from '../typeclasses/Alt';
import { Applicative_1, Applicative_2 } from '../typeclasses/Applicative';
import { Bind_2 } from '../typeclasses/Bind';
import { Foldable_2, foldlDefault, foldrDefault } from '../typeclasses/Foldable';
import { ap, liftM1, Monad_2 } from '../typeclasses/Monad';
import { MonadError_2 } from '../typeclasses/MonadError';
import { MonadThrow_2 } from '../typeclasses/MonadThrow';
import { Monoid_0 } from '../typeclasses/Monoid';
import { sequenceDefault, Traversable_2 } from '../typeclasses/Traversable';
import { Either, either, Left, Right } from './definitions';
import { TEither } from './internal';

export { either };

export const bind: Bind_2<TEither>['bind'] = either<any, Either<any, any>>(Left);

export const pure: Applicative_2<TEither>['pure'] = Right;

export const map = liftM1({ bind, pure } as Monad_2<TEither>);

export const apply = ap({ bind, pure } as Monad_2<TEither>);

export const alt: Alt_2<TEither>['alt'] = fx => fy => (fx.isLeft ? fy : fx);

export const throwError: MonadThrow_2<TEither>['throwError'] = Left;

export const catchError: MonadError_2<TEither>['catchError'] = f => either(f)(Right);

export const foldMap: Foldable_2<TEither>['foldMap'] = <a>({ mempty }: Anon<Monoid_0<a>>) =>
  either(mempty);

export const foldl = foldlDefault({ foldMap } as Foldable_2<TEither>);

export const foldr = foldrDefault({ foldMap } as Foldable_2<TEither>);

export const traverse: Traversable_2<TEither>['traverse'] = <f extends Generic1>({
  map,
  pure,
}: Anon<Applicative_1<f>, 'map' | 'pure'>) => <b, c>(
  f: (_: b) => Type1<f, c>
): (<a>(tab: Either<a, b>) => Type1<f, Either<a, c>>) =>
  either(a => pure(Left(a)))(b => map(Right)(f(b)));

export const sequence = sequenceDefault({ traverse } as Traversable_2<TEither>);

export const choose = <m extends Generic1>(alt: Alt_1<m>) => <a>(ma: Type1<m, a>) => <b>(
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
