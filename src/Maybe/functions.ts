import { Either } from '../Either/definitions';
import { either } from '../Either/functions';
import { Anon, Generic1, Type1 } from '../Generic';
import {
  Alt_1,
  Applicative_1,
  applyDefault,
  Bind_1,
  Compactable_1,
  Filterable_1,
  filterDefault,
  Foldable_1,
  foldlDefault,
  foldrDefault,
  liftM1,
  MonadError_1,
  MonadThrow_1,
  Monad_1,
  Monoid_0,
  Monoid_1,
  partitionDefault,
  Plus_1,
  Traversable_1,
} from '../typeclasses';
import { Just, Maybe, Nothing } from './definitions';
import { TMaybe } from './internal';

export const maybe = <b>(b: b) => <a>(f: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? b : f(fa.value);

export const bind: Bind_1<TMaybe>['bind'] = maybe<Maybe<any>>(Nothing);

export const pure: Applicative_1<TMaybe>['pure'] = Just;

export const map = liftM1({ bind, pure } as Monad_1<TMaybe>);

export const apply = applyDefault({ bind, map } as Bind_1<TMaybe>);

export const maybeL = <b>(f: () => b) => <a>(g: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? f() : g(fa.value);

export const fromMaybe = <a>(a: a): ((fa: Maybe<a>) => a) => maybe(a)(x => x);

export const fromMaybeL = <a>(thunk: () => a): ((fa: Maybe<a>) => a) => maybeL(thunk)(x => x);

export const alt: Alt_1<TMaybe>['alt'] = fx => fy => (fx.isNothing ? fy : fx);

export const empty: Plus_1<TMaybe>['empty'] = () => Nothing;

export const throwError: MonadThrow_1<TMaybe>['throwError'] = empty;

export const catchError: MonadError_1<TMaybe>['catchError'] = f => maybeL(f)(Just);

export const foldMap: Foldable_1<TMaybe>['foldMap'] = <m>(monoid: Monoid_0<m> | Monoid_1<any>) =>
  maybeL(monoid.mempty);

export const foldl = foldlDefault({ foldMap } as Foldable_1<TMaybe>);

export const foldr = foldrDefault({ foldMap } as Foldable_1<TMaybe>);

export const traverse: Traversable_1<TMaybe>['traverse'] = <f extends Generic1>({
  map,
  pure,
}: Anon<Applicative_1<f>, 'map' | 'pure'>) => <a, b>(
  f: (_: a) => Type1<f, b>
): ((ta: Maybe<a>) => Type1<f, Maybe<b>>) => maybe(pure(Nothing))(x => map(Just)(f(x)));

export const sequence: Traversable_1<TMaybe>['sequence'] = <f extends Generic1>({
  map,
  pure,
}: Anon<Applicative_1<f>, 'map' | 'pure'>) => maybe(pure(Nothing))(map(Just));

export const partitionMap: Filterable_1<TMaybe>['partitionMap'] = <a, b, c>(
  f: (_: a) => Either<b, c>
) => {
  type Result = { left: Maybe<b>; right: Maybe<c> };
  return maybe<Result>({ left: Nothing, right: Nothing })<a>(x =>
    either<b, Result>(b => ({ left: Just(b), right: Nothing }))<c>(c => ({
      left: Nothing,
      right: Just(c),
    }))(f(x))
  );
};

export const partition = partitionDefault({ partitionMap } as Filterable_1<TMaybe>);

export const filterMap: Filterable_1<TMaybe>['filterMap'] = bind;

export const filter = filterDefault({ filterMap } as Filterable_1<TMaybe>);

export const compact: Compactable_1<TMaybe>['compact'] = filterMap(x => x);

export const separate: Compactable_1<TMaybe>['separate'] = partitionMap(x => x);
