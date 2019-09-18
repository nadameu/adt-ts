import { makeEqList } from '../List/instances';
import {
  Alternative_1,
  Alt_1,
  Applicative_1,
  Apply_1,
  Bind_1,
  Eq,
  Foldable1_1,
  Foldable_1,
  Functor_1,
  Monad_1,
  Monoid_1,
  Plus_1,
  Semigroup_1,
  Traversable_1,
} from '../typeclasses';
import { NEList } from './definitions';
import {
  alt,
  append,
  apply,
  bind,
  empty,
  fold1,
  foldl,
  foldMap,
  foldMap1,
  foldr,
  map,
  mempty,
  pure,
  sequence,
  traverse,
} from './functions/original';
import { TNEList } from './internal';

export const makeEqNEList = makeEqList as <a>(eq: Eq<a>) => Eq<NEList<a>>;

export const functorNEList = { map } as Functor_1<TNEList>;
export const applyNEList = { apply, map } as Apply_1<TNEList>;
export const applicativeNEList = { apply, map, pure } as Applicative_1<TNEList>;
export const bindNEList = { apply, bind, map } as Bind_1<TNEList>;
export const monadNEList = { apply, bind, map, pure } as Monad_1<TNEList>;

export const semigroupNEList = { append } as Semigroup_1<TNEList>;
export const monoidNEList = { append, mempty } as Monoid_1<TNEList>;

export const altNEList = { alt, map } as Alt_1<TNEList>;
export const plusNEList = { alt, empty, map } as Plus_1<TNEList>;
export const alternativeNEList = { alt, apply, empty, map, pure } as Alternative_1<TNEList>;

export const foldableNEList = { foldMap, foldl, foldr } as Foldable_1<TNEList>;
export const traversableNEList = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable_1<TNEList>;

export const foldable1NEList = { fold1, foldMap, foldMap1, foldl, foldr } as Foldable1_1<TNEList>;
