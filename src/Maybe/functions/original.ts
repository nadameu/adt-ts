import { Either } from '../../Either/definitions';
import { Anon, Generic1, Type1 } from '../../Generic';
import {
  Alt_1,
  ap,
  Applicative_1,
  Bind_1,
  compactByFilterMap,
  filterDefault,
  filterMapByWither,
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
  partitionMapByWilt,
  PartitionMapOnly_1,
  Plus_1,
  separateByPartitionMap,
  sequenceDefault,
  traverseByWither,
  TraverseOnly_1,
  WiltOnly_1,
  Witherable_1,
  witherByWilt,
  WitherOnly_1,
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

export const wilt: Witherable_1<TMaybe>['wilt'] = <m extends Generic1>({
  map,
  pure,
}: Anon<Applicative_1<m>>) => <a, b, c>(f: (_: a) => Type1<m, Either<b, c>>) => (
  ta: Maybe<a>
): Type1<
  m,
  {
    left: Maybe<b>;
    right: Maybe<c>;
  }
> => {
  if (ta.isNothing) return pure({ left: Nothing, right: Nothing });
  return map<Either<b, c>, { left: Maybe<b>; right: Maybe<c> }>(result => {
    if (result.isLeft) return { left: Just(result.leftValue), right: Nothing };
    return { left: Nothing, right: Just(result.rightValue) };
  })(f(ta.value));
};

export const partitionMap = partitionMapByWilt({ wilt } as WiltOnly_1<TMaybe>);

export const partition = partitionDefault({ partitionMap } as PartitionMapOnly_1<TMaybe>);

export const separate = separateByPartitionMap({ partitionMap } as PartitionMapOnly_1<TMaybe>);

export const wither = witherByWilt({ wilt } as WiltOnly_1<TMaybe>);

export const filterMap = filterMapByWither({ wither } as WitherOnly_1<TMaybe>);

export const filter = filterDefault({ filterMap } as FilterMapOnly_1<TMaybe>);

export const compact = compactByFilterMap({ filterMap } as FilterMapOnly_1<TMaybe>);

export const traverse = traverseByWither({ wither } as WitherOnly_1<TMaybe>);

export const sequence = sequenceDefault({ traverse } as TraverseOnly_1<TMaybe>);
