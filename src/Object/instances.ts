import { makeEqArray } from '../Array/instances';
import { eqString } from '../String/instances';
import { Alt_O, Apply_O, Eq, Foldable_O, Functor_O, Plus_O, Traversable_O } from '../typeclasses';
import {
  alt,
  apply,
  empty,
  foldl,
  foldMap,
  foldr,
  map,
  sequence,
  traverse,
} from './functions/original';

export const makeEqObject = <T extends {}>(eq: { [k in keyof T]: Eq<T[k]> }) =>
  ({
    eq: xs => ys => {
      const xKeys = Object.keys(xs).sort();
      const yKeys = Object.keys(ys).sort();
      if (!makeEqArray(eqString).eq(xKeys)(yKeys)) return false;
      return (xKeys as (keyof T)[]).every(key => eq[key].eq(xs[key])(ys[key]));
    },
  }) as Eq<T>;

export const functorObject = { map } as Functor_O;
export const applyObject = { apply, map } as Apply_O;
/*
export const bindObject = { apply, bind, map } as Bind_1<TArray>;
export const applicativeObject = { apply, map, pure } as Applicative_1<TArray>;
export const monadObject = { apply, bind, map, pure } as Monad_1<TArray>;

*/
export const altObject = { alt, map } as Alt_O;
export const plusObject = { alt, empty, map } as Plus_O;
/*
export const alternativeObject = { alt, apply, empty, map, pure } as Alternative_1<TArray>;
*/
export const foldableObject = { foldMap, foldl, foldr } as Foldable_O;
export const traversableObject = {
  foldMap,
  foldl,
  foldr,
  map,
  sequence,
  traverse,
} as Traversable_O;
/*
export const compactableObject = { compact, separate } as Compactable_1<TArray>;
export const filterableObject = {
  compact,
  filter,
  filterMap,
  map,
  partition,
  partitionMap,
  separate,
} as Filterable_1<TArray>;
export const witherableObject = {
  compact,
  filter,
  filterMap,
  foldMap,
  foldl,
  foldr,
  map,
  partition,
  partitionMap,
  separate,
  sequence,
  traverse,
  wilt,
  wither,
} as Witherable_1<TArray>;
*/
