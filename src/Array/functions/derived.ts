import * as d from '../../derivations';
import {
  Apply_A,
  BindOnly_A,
  BindPureOnly_A,
  FilterMapOnly_A,
  FoldLOnly_A,
  FoldMapOnly_A,
  Functor_A,
  WiltOnly_A,
  WitherOnly_A,
} from '../../typeclasses';
import { apply, bind, filterMap, foldMap, foldl, map, pure, wilt, wither } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_A);
export const lift3 = d.lift3({ apply, map } as Apply_A);
export const lift4 = d.lift4({ apply, map } as Apply_A);
export const lift5 = d.lift5({ apply, map } as Apply_A);

export const composeKleisli = d.composeKleisli({ bind } as BindOnly_A);
export const composeKleisliFlipped = d.composeKleisliFlipped({ bind } as BindOnly_A);
export const join = d.join({ bind } as BindOnly_A);

export const cleared = d.cleared({ filterMap } as FilterMapOnly_A);

export const all = d.all({ foldMap } as FoldMapOnly_A);
export const and = d.and({ foldMap } as FoldMapOnly_A);
export const any = d.any({ foldMap } as FoldMapOnly_A);
export const fold = d.fold({ foldMap } as FoldMapOnly_A);
export const intercalate = d.intercalate({ foldl } as FoldLOnly_A);
export const length = d.length({ foldMap } as FoldMapOnly_A);
export const maximumBy = d.maximumBy({ foldl } as FoldLOnly_A);
export const minimumBy = d.minimumBy({ foldl } as FoldLOnly_A);
export const oneOf = d.oneOf({ foldMap } as FoldMapOnly_A);
export const oneOfMap = d.oneOfMap({ foldMap } as FoldMapOnly_A);
export const or = d.or({ foldMap } as FoldMapOnly_A);
export const product = d.product({ foldMap } as FoldMapOnly_A);
export const sum = d.sum({ foldMap } as FoldMapOnly_A);
export const surround = d.surround({ foldMap } as FoldMapOnly_A);
export const surroundMap = d.surroundMap({ foldMap } as FoldMapOnly_A);

export const flap = d.flap({ map } as Functor_A);
export const voidLeft = d.voidLeft({ map } as Functor_A);
export const voidRight = d.voidRight({ map } as Functor_A);
export const $$void = d.$$void({ map } as Functor_A);

export const wilted = d.wilted({ wilt } as WiltOnly_A);
export const withered = d.withered({ wither } as WitherOnly_A);

export const pipeK = d.pipeK({ bind, pure } as BindPureOnly_A);
export const pipeKValue = d.pipeKValue({ bind, pure } as BindPureOnly_A);
