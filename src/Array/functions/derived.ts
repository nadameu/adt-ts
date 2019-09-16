import * as d from '../../derivations';
import {
  Apply_1,
  BindOnly_1,
  FilterMapOnly_1,
  FoldLOnly_1,
  FoldMapOnly_1,
  Functor_1,
  WiltOnly_1,
  WitherOnly_1,
} from '../../typeclasses';
import { TArray } from '../internal';
import { apply, bind, filterMap, foldl, foldMap, map, wilt, wither } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_1<TArray>);
export const lift3 = d.lift3({ apply, map } as Apply_1<TArray>);
export const lift4 = d.lift4({ apply, map } as Apply_1<TArray>);
export const lift5 = d.lift5({ apply, map } as Apply_1<TArray>);

export const join = d.join({ bind } as BindOnly_1<TArray>);
export const pipeK = d.pipeK({ bind } as BindOnly_1<TArray>);
export const wrapBind = d.wrapBind({ bind } as BindOnly_1<TArray>);
export const composeK = d.composeK({ bind } as BindOnly_1<TArray>);

export const cleared = d.cleared({ filterMap } as FilterMapOnly_1<TArray>);

export const all = d.all({ foldMap } as FoldMapOnly_1<TArray>);
export const and = d.and({ foldMap } as FoldMapOnly_1<TArray>);
export const any = d.any({ foldMap } as FoldMapOnly_1<TArray>);
export const fold = d.fold({ foldMap } as FoldMapOnly_1<TArray>);
export const intercalate = d.intercalate({ foldl } as FoldLOnly_1<TArray>);
export const length = d.length({ foldMap } as FoldMapOnly_1<TArray>);
export const maximumBy = d.maximumBy({ foldl } as FoldLOnly_1<TArray>);
export const minimumBy = d.minimumBy({ foldl } as FoldLOnly_1<TArray>);
export const oneOf = d.oneOf({ foldMap } as FoldMapOnly_1<TArray>);
export const oneOfMap = d.oneOfMap({ foldMap } as FoldMapOnly_1<TArray>);
export const or = d.or({ foldMap } as FoldMapOnly_1<TArray>);
export const product = d.product({ foldMap } as FoldMapOnly_1<TArray>);
export const sum = d.sum({ foldMap } as FoldMapOnly_1<TArray>);
export const surround = d.surround({ foldMap } as FoldMapOnly_1<TArray>);
export const surroundMap = d.surroundMap({ foldMap } as FoldMapOnly_1<TArray>);

export const flap = d.flap({ map } as Functor_1<TArray>);
export const voidLeft = d.voidLeft({ map } as Functor_1<TArray>);
export const voidRight = d.voidRight({ map } as Functor_1<TArray>);
export const $$void = d.$$void({ map } as Functor_1<TArray>);

export const wilted = d.wilted({ wilt } as WiltOnly_1<TArray>);
export const withered = d.withered({ wither } as WitherOnly_1<TArray>);
