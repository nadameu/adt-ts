import { Either } from '../../Either/definitions';
import { Anon, Generic1, Type1 } from '../../Generic';
import { method } from '../../helpers/method';
import { prop } from '../../helpers/prop';
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
  sequenceDefault,
  Traversable_1,
  TraverseOnly_1,
  wiltDefault,
  witherDefault,
} from '../../typeclasses';
import { Just, Maybe, Nothing } from '../definitions';
import { TMaybe } from '../internal';
import { maybeBool } from '../../typeclasses/Filterable';

export const maybe =
  <b>(b: b) =>
  <a>(f: (_: a) => b) =>
  (fa: Maybe<a>): b =>
    fa.isNothing ? b : f(fa.value);

export const bind: Bind_1<TMaybe>['bind'] = maybe<Maybe<any>>(Nothing);

export const pure: Applicative_1<TMaybe>['pure'] = Just;

export const map = liftM1({ bind, pure } as Monad_1<TMaybe>);

export const apply = ap({ bind, pure } as Monad_1<TMaybe>);

export const maybeL =
  <b>(f: (_?: void) => b) =>
  <a>(g: (_: a) => b) =>
  (fa: Maybe<a>): b =>
    fa.isNothing ? f(undefined) : g(fa.value);

export const fromMaybe = <a>(a: a): ((fa: Maybe<a>) => a) => maybe(a)(x => x);

export const fromMaybeL = <a>(thunk: () => a): ((fa: Maybe<a>) => a) => maybeL(thunk)(x => x);

export const alt: Alt_1<TMaybe>['alt'] = fx => fy => fx.isNothing ? fy : fx;

export const empty: Plus_1<TMaybe>['empty'] = () => Nothing;

export const throwError: MonadThrow_1<TMaybe, void>['throwError'] = empty;

export const catchError: MonadError_1<TMaybe, void>['catchError'] = f =>
  maybeL(f as () => Maybe<any>)(Just);

export const foldMap: Foldable_1<TMaybe>['foldMap'] = <m>(monoid: Monoid_0<m> | Monoid_1<any>) =>
  maybeL(monoid.mempty);

export const foldl = foldlDefault({ foldMap } as Foldable_1<TMaybe>);

export const foldr = foldrDefault({ foldMap } as Foldable_1<TMaybe>);

export const filterMap = bind;

export const filter = filterDefault({ filterMap } as FilterMapOnly_1<TMaybe>);

export const compact = compactByFilterMap({ filterMap } as FilterMapOnly_1<TMaybe>);

export const traverse: Traversable_1<TMaybe>['traverse'] =
  <m extends Generic1>({ map, pure }: Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => Type1<m, b>): ((ta: Maybe<a>) => Type1<m, Maybe<b>>) =>
    maybe<Type1<m, Maybe<b>>>(pure(Nothing))<a>(a => map(Just)(f(a)));

export const sequence = sequenceDefault({ traverse } as TraverseOnly_1<TMaybe>);

export const wither = witherDefault({ compact, traverse } as CompactOnly_1<TMaybe> &
  TraverseOnly_1<TMaybe>);

export const partitionMap: Filterable_1<TMaybe>['partitionMap'] =
  <a, b, c>(p: (_: a) => Either<b, c>) =>
  (
    fa: Maybe<a>
  ): {
    left: Maybe<b>;
    right: Maybe<c>;
  } =>
    fa.isNothing
      ? { left: Nothing, right: Nothing }
      : (result =>
          result.isLeft
            ? { left: Just(result.leftValue), right: Nothing }
            : { left: Nothing, right: Just(result.rightValue) })(p(fa.value));

export const partition = partitionDefault({ partitionMap } as PartitionMapOnly_1<TMaybe>);

export const separate = separateByPartitionMap({ partitionMap } as PartitionMapOnly_1<TMaybe>);

export const wilt = wiltDefault({ separate, traverse } as SeparateOnly_1<TMaybe> &
  TraverseOnly_1<TMaybe>);

export const fromNullable: <a>(x: a | null | undefined) => Maybe<a> = maybeBool(
  <a>(x: a | null | undefined): x is a => x != null
);

export const liftNullable =
  <a, b>(f: (_: a) => b | null | undefined): ((_: a) => Maybe<b>) =>
  a =>
    fromNullable(f(a));

export const bindNullable = <a, b>(
  f: (_: a) => b | null | undefined
): ((fa: Maybe<a>) => Maybe<b>) => bind(liftNullable(f));

export const safeProp = <obj, key extends keyof obj>(key: key) =>
  liftNullable<obj, NonNullable<obj[key]>>(prop<obj, key>(key) as any);

export const bindProp = <obj, key extends keyof obj>(key: key) =>
  bindNullable<obj, NonNullable<obj[key]>>(prop<obj, key>(key) as any);

type CallableKeys<T> = {
  [k in keyof T]: T[k] extends (...args: any[]) => unknown ? k : never;
}[keyof T];

export const safeMethod = <
  obj,
  key extends CallableKeys<obj>,
  args extends obj[key] extends (...args: infer x) => unknown ? x : unknown[]
>(
  key: key,
  ...args: args
) =>
  liftNullable<
    obj,
    obj[key] extends (...args: args) => infer out | null | undefined ? out : unknown
  >(method<any, key, args, null | undefined>(key, ...args));

export const bindMethod = <
  obj,
  key extends CallableKeys<obj>,
  args extends obj[key] extends (...args: infer x) => unknown ? x : unknown[]
>(
  key: key,
  ...args: args
) =>
  bindNullable<
    obj,
    obj[key] extends (...args: args) => infer out | null | undefined ? out : unknown
  >(method<any, key, args, null | undefined>(key, ...args));
