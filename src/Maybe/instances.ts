import { Anon, Generic1 } from '../Generic';
import { Alt_1 } from '../typeclasses/Alt';
import { Alternative_1 } from '../typeclasses/Alternative';
import { Applicative_1 } from '../typeclasses/Applicative';
import { Apply_1 } from '../typeclasses/Apply';
import { Bind_1 } from '../typeclasses/Bind';
import { Compactable_1 } from '../typeclasses/Compactable';
import { Eq } from '../typeclasses/Eq';
import { Filterable_1 } from '../typeclasses/Filterable';
import { Foldable_1 } from '../typeclasses/Foldable';
import { Functor_1 } from '../typeclasses/Functor';
import { Monad_1 } from '../typeclasses/Monad';
import { MonadError_1 } from '../typeclasses/MonadError';
import { MonadThrow_1 } from '../typeclasses/MonadThrow';
import { Monoid_0, Monoid_1 } from '../typeclasses/Monoid';
import { Plus_1 } from '../typeclasses/Plus';
import { Semigroup_0, Semigroup_1 } from '../typeclasses/Semigroup';
import { Traversable_1 } from '../typeclasses/Traversable';
import { Just, Maybe } from './definitions';
import {
  alt,
  apply,
  bind,
  catchError,
  compact,
  empty,
  filter,
  filterMap,
  foldl,
  foldMap,
  foldr,
  map,
  partition,
  partitionMap,
  pure,
  separate,
  sequence,
  throwError,
  traverse,
} from './functions';
import { TMaybe, TMaybeF } from './internal';

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
} = <m>({ append }: Anon<Semigroup_0<m>>): Semigroup_0<Maybe<m>>['append'] => x => y =>
  x.isNothing ? y : y.isNothing ? x : Just(append(x.value)(y.value));

export const makeSemigroupMaybe: {
  <m extends Generic1>(semigroup: Semigroup_1<m>): Semigroup_1<TMaybeF<m>>;
  <m>(semigroup: Semigroup_0<m>): Semigroup_0<Maybe<m>>;
} = <m>(semigroup: Anon<Semigroup_0<m>>) =>
  ({
    append: makeAppend(semigroup as Semigroup_0<m>),
  } as Semigroup_0<Maybe<m>> & Semigroup_1<TMaybe>);

export const makeMonoidMaybe: {
  <m extends Generic1>(semigroup: Semigroup_1<m>): Monoid_1<TMaybeF<m>>;
  <m>(semigroup: Semigroup_0<m>): Monoid_0<Maybe<m>>;
} = <m>(semigroup: Anon<Semigroup_0<m>>) =>
  ({
    append: makeAppend(semigroup as Semigroup_0<m>),
    mempty: empty,
  } as Monoid_0<Maybe<m>> & Monoid_1<TMaybe>);
