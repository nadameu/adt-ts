import { Alt_1 } from '../typeclasses/Alt';
import { Alternative_1 } from '../typeclasses/Alternative';
import { Applicative_1 } from '../typeclasses/Applicative';
import { Apply_1 } from '../typeclasses/Apply';
import { Bind_1 } from '../typeclasses/Bind';
import { Eq } from '../typeclasses/Eq';
import { Foldable_1 } from '../typeclasses/Foldable';
import { Functor_1 } from '../typeclasses/Functor';
import { Monad_1 } from '../typeclasses/Monad';
import { MonadError_1 } from '../typeclasses/MonadError';
import { MonadThrow_1 } from '../typeclasses/MonadThrow';
import { Plus_1 } from '../typeclasses/Plus';
import { Traversable_1 } from '../typeclasses/Traversable';
import { Maybe, Just } from './definitions';
import {
  alt,
  apply,
  bind,
  catchError,
  empty,
  foldl,
  foldMap,
  foldr,
  map,
  pure,
  sequence,
  throwError,
  traverse,
  compact,
  filter,
  filterMap,
  partition,
  partitionMap,
  separate,
} from './functions';
import { TMaybe, TMaybeF } from './internal';
import { Filterable_1 } from '../typeclasses/Filterable';
import { Compactable_1 } from '../typeclasses/Compactable';
import { Semigroup_0, Semigroup_1, Semigroup } from '../typeclasses/Semigroup';
import { Generic1 } from '../Generic';
import { Monoid_1, Monoid_0 } from '../typeclasses/Monoid';

export const makeEqMaybe = <a>(eq: Eq<a>) =>
  ({
    eq: fx => fy => (fx.isNothing ? fy.isNothing : fy.isJust && eq.eq(fx.value)(fy.value)),
  } as Eq<Maybe<a>>);

export const functorMaybe = { map } as Functor_1<TMaybe>;
export const applyMaybe = { apply, map } as Apply_1<TMaybe>;
export const bindMaybe = { apply, bind, map } as Bind_1<TMaybe>;
export const applicativeMaybe = { apply, map, pure } as Applicative_1<TMaybe>;
export const monadMaybe = { apply, bind, map, pure } as Monad_1<TMaybe>;
export const monadThrowMaybe = { apply, bind, map, pure, throwError } as MonadThrow_1<TMaybe>;
export const monadErrorMaybe = { apply, bind, catchError, map, pure, throwError } as MonadError_1<
  TMaybe
>;
export const foldableMaybe = { foldl, foldMap, foldr } as Foldable_1<TMaybe>;
export const altMaybe = { map, alt } as Alt_1<TMaybe>;
export const alternativeMaybe = { map, alt, apply, empty, pure } as Alternative_1<TMaybe>;
export const plusMaybe = { alt, empty, map } as Plus_1<TMaybe>;
export const traversableMaybe = { foldMap, foldl, foldr, map, sequence, traverse } as Traversable_1<
  TMaybe
>;
export const compactableMaybe = { compact, separate } as Compactable_1<TMaybe>;
export const filterableMaybe = {
  compact,
  filter,
  filterMap,
  map,
  partition,
  partitionMap,
  separate,
} as Filterable_1<TMaybe>;

const makeAppend: {
  <m extends Generic1>(semigroup: Semigroup_1<m>): Semigroup_1<TMaybeF<m>>['append'];
  <m>(semigroup: Semigroup_0<m>): Semigroup_0<Maybe<m>>['append'];
} = <m extends Generic1>({ append }: Semigroup): Semigroup_1<TMaybeF<m>>['append'] => x => y =>
  x.isNothing ? y : y.isNothing ? x : Just((append as Semigroup_1<m>['append'])(x.value)(y.value));

export const makeSemigroupMaybe: {
  <m extends Generic1>(semigroup: Semigroup_1<m>): Semigroup_1<TMaybeF<m>>;
  <m>(semigroup: Semigroup_0<m>): Semigroup_0<Maybe<m>>;
} = <m extends Generic1>(semigroup: Semigroup) =>
  ({
    append: makeAppend(semigroup as Semigroup_1<m>),
  } as any);

export const makeMonoidMaybe: {
  <m extends Generic1>(semigroup: Semigroup_1<m>): Monoid_1<TMaybeF<m>>;
  <m>(semigroup: Semigroup_0<m>): Monoid_0<Maybe<m>>;
} = <m extends Generic1>(semigroup: Semigroup) =>
  ({
    append: makeAppend(semigroup as Semigroup_1<m>),
    mempty: empty,
  } as any);
