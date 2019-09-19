import * as d from '../../derivations';
import {
  Apply_1,
  BindOnly_1,
  FilterMapOnly_1,
  FoldLOnly_1,
  FoldMapOnly_1,
  Functor_1,
  PureOnly_1,
  WiltOnly_1,
  WitherOnly_1,
} from '../../typeclasses';
import { TIterable } from '../internal';
import { apply, bind, filterMap, foldl, foldMap, map, pure, wilt, wither } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_1<TIterable>);
export const lift3 = d.lift3({ apply, map } as Apply_1<TIterable>);
export const lift4 = d.lift4({ apply, map } as Apply_1<TIterable>);
export const lift5 = d.lift5({ apply, map } as Apply_1<TIterable>);

export const composeKleisli = d.composeKleisli({ bind } as BindOnly_1<TIterable>);
export const composeKleisliFlipped = d.composeKleisliFlipped({ bind } as BindOnly_1<TIterable>);
export const join = d.join({ bind } as BindOnly_1<TIterable>);

export const cleared = d.cleared({ filterMap } as FilterMapOnly_1<TIterable>);

export const all = d.all({ foldMap } as FoldMapOnly_1<TIterable>);
export const and = d.and({ foldMap } as FoldMapOnly_1<TIterable>);
export const any = d.any({ foldMap } as FoldMapOnly_1<TIterable>);
export const fold = d.fold({ foldMap } as FoldMapOnly_1<TIterable>);
export const intercalate = d.intercalate({ foldl } as FoldLOnly_1<TIterable>);
export const length = d.length({ foldMap } as FoldMapOnly_1<TIterable>);
export const maximumBy = d.maximumBy({ foldl } as FoldLOnly_1<TIterable>);
export const minimumBy = d.minimumBy({ foldl } as FoldLOnly_1<TIterable>);
export const oneOf = d.oneOf({ foldMap } as FoldMapOnly_1<TIterable>);
export const oneOfMap = d.oneOfMap({ foldMap } as FoldMapOnly_1<TIterable>);
export const or = d.or({ foldMap } as FoldMapOnly_1<TIterable>);
export const product = d.product({ foldMap } as FoldMapOnly_1<TIterable>);
export const sum = d.sum({ foldMap } as FoldMapOnly_1<TIterable>);
export const surround = d.surround({ foldMap } as FoldMapOnly_1<TIterable>);
export const surroundMap = d.surroundMap({ foldMap } as FoldMapOnly_1<TIterable>);

export const flap = d.flap({ map } as Functor_1<TIterable>);
export const voidLeft = d.voidLeft({ map } as Functor_1<TIterable>);
export const voidRight = d.voidRight({ map } as Functor_1<TIterable>);
export const $$void = d.$$void({ map } as Functor_1<TIterable>);

export const wilted = d.wilted({ wilt } as WiltOnly_1<TIterable>);
export const withered = d.withered({ wither } as WitherOnly_1<TIterable>);

export const pipeK = d.pipeK({ bind, pure } as BindOnly_1<TIterable> & PureOnly_1<TIterable>);
