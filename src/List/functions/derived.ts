import * as d from '../../derivations';
import {
  Apply_1,
  BindOnly_1,
  FoldLOnly_1,
  FoldMapOnly_1,
  Functor_1,
  PureOnly_1,
} from '../../typeclasses';
import { TList } from '../internal';
import { apply, bind, foldl, foldMap, map, pure } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_1<TList>);
export const lift3 = d.lift3({ apply, map } as Apply_1<TList>);
export const lift4 = d.lift4({ apply, map } as Apply_1<TList>);
export const lift5 = d.lift5({ apply, map } as Apply_1<TList>);

export const composeKleisli = d.composeKleisli({ bind } as BindOnly_1<TList>);
export const composeKleisliFlipped = d.composeKleisliFlipped({ bind } as BindOnly_1<TList>);
export const join = d.join({ bind } as BindOnly_1<TList>);

export const all = d.all({ foldMap } as FoldMapOnly_1<TList>);
export const and = d.and({ foldMap } as FoldMapOnly_1<TList>);
export const any = d.any({ foldMap } as FoldMapOnly_1<TList>);
export const fold = d.fold({ foldMap } as FoldMapOnly_1<TList>);
export const intercalate = d.intercalate({ foldl } as FoldLOnly_1<TList>);
export const length = d.length({ foldMap } as FoldMapOnly_1<TList>);
export const maximumBy = d.maximumBy({ foldl } as FoldLOnly_1<TList>);
export const minimumBy = d.minimumBy({ foldl } as FoldLOnly_1<TList>);
export const oneOf = d.oneOf({ foldMap } as FoldMapOnly_1<TList>);
export const oneOfMap = d.oneOfMap({ foldMap } as FoldMapOnly_1<TList>);
export const or = d.or({ foldMap } as FoldMapOnly_1<TList>);
export const product = d.product({ foldMap } as FoldMapOnly_1<TList>);
export const sum = d.sum({ foldMap } as FoldMapOnly_1<TList>);
export const surround = d.surround({ foldMap } as FoldMapOnly_1<TList>);
export const surroundMap = d.surroundMap({ foldMap } as FoldMapOnly_1<TList>);

export const flap = d.flap({ map } as Functor_1<TList>);
export const voidLeft = d.voidLeft({ map } as Functor_1<TList>);
export const voidRight = d.voidRight({ map } as Functor_1<TList>);
export const $$void = d.$$void({ map } as Functor_1<TList>);

export const pipeK = d.pipeK({ bind, pure } as BindOnly_1<TList> & PureOnly_1<TList>);
