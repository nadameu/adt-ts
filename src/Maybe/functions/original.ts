import { Either } from '../../Either/definitions';
import { either } from '../../Either/functions';
import { Anon, Generic1, Type1 } from '../../Generic';
import {
  Alt_1,
  ap,
  Applicative_1,
  Bind_1,
  compactByFilterMap,
  CompactOnly_1,
  Filterable_1,
  filterDefault,
  FilterMapOnly_1,
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
  PartitionMapOnly_1,
  Plus_1,
  separateByPartitionMap,
  SeparateOnly_1,
  Traversable_1,
  TraverseOnly_1,
  wiltDefault,
  witherDefault,
} from '../../typeclasses';
import { Just, Maybe, Nothing } from '../definitions';
import { TMaybe } from '../internal';

export const maybe = <b>(b: b) => <a>(f: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? b : f(fa.value);

export const bind: Bind_1<TMaybe>['bind'] = maybe<Maybe<any>>(Nothing);

export const pure: Applicative_1<TMaybe>['pure'] = Just;

export const map = liftM1({ bind, pure } as Monad_1<TMaybe>);

export const apply = ap({ bind, pure } as Monad_1<TMaybe>);

export const maybeL = <b>(f: () => b) => <a>(g: (_: a) => b) => (fa: Maybe<a>): b =>
  fa.isNothing ? f() : g(fa.value);

export const fromMaybe = <a>(a: a): ((fa: Maybe<a>) => a) => maybe(a)(x => x);

export const fromMaybeL = <a>(thunk: () => a): ((fa: Maybe<a>) => a) => maybeL(thunk)(x => x);

export const alt: Alt_1<TMaybe>['alt'] = fx => fy => (fx.isNothing ? fy : fx);

export const empty: Plus_1<TMaybe>['empty'] = () => Nothing;

export const throwError: MonadThrow_1<TMaybe, void>['throwError'] = empty;

export const catchError: MonadError_1<TMaybe, void>['catchError'] = f =>
  maybeL(f as () => Maybe<any>)(Just);

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

export const partition = partitionDefault({ partitionMap } as PartitionMapOnly_1<TMaybe>);

export const filterMap: Filterable_1<TMaybe>['filterMap'] = bind;

export const filter = filterDefault({ filterMap } as FilterMapOnly_1<TMaybe>);

export const separate = separateByPartitionMap({ partitionMap } as PartitionMapOnly_1<TMaybe>);

export const compact = compactByFilterMap({ filterMap } as FilterMapOnly_1<TMaybe>);

export const wilt = wiltDefault({ separate, traverse } as SeparateOnly_1<TMaybe> &
  TraverseOnly_1<TMaybe>);

export const wither = witherDefault({ compact, traverse } as CompactOnly_1<TMaybe> &
  TraverseOnly_1<TMaybe>);
