import * as d from '../../derivations';
import { Apply_O, FoldLOnly_O, FoldMapOnly_O, Functor_O } from '../../typeclasses';
import { apply, map, foldMap, foldl } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_O);
export const lift3 = d.lift3({ apply, map } as Apply_O);
export const lift4 = d.lift4({ apply, map } as Apply_O);
export const lift5 = d.lift5({ apply, map } as Apply_O);
/*
export const composeKleisli = d.composeKleisli({ bind } as BindOnly_1<TArray>);
export const composeKleisliFlipped = d.composeKleisliFlipped({ bind } as BindOnly_1<TArray>);
export const join = d.join({ bind } as BindOnly_1<TArray>);

export const cleared = d.cleared({ filterMap } as FilterMapOnly_1<TArray>);

*/
export const all = d.all({ foldMap } as FoldMapOnly_O);
export const and = d.and({ foldMap } as FoldMapOnly_O);
export const any = d.any({ foldMap } as FoldMapOnly_O);
export const fold = d.fold({ foldMap } as FoldMapOnly_O);
export const intercalate = d.intercalate({ foldl } as FoldLOnly_O);
export const length = d.length({ foldMap } as FoldMapOnly_O);
export const maximumBy = d.maximumBy({ foldl } as FoldLOnly_O);
export const minimumBy = d.minimumBy({ foldl } as FoldLOnly_O);
export const oneOf = d.oneOf({ foldMap } as FoldMapOnly_O);
export const oneOfMap = d.oneOfMap({ foldMap } as FoldMapOnly_O);
export const or = d.or({ foldMap } as FoldMapOnly_O);
export const product = d.product({ foldMap } as FoldMapOnly_O);
export const sum = d.sum({ foldMap } as FoldMapOnly_O);
export const surround = d.surround({ foldMap } as FoldMapOnly_O);
export const surroundMap = d.surroundMap({ foldMap } as FoldMapOnly_O);

export const flap = d.flap({ map } as Functor_O);
export const voidLeft = d.voidLeft({ map } as Functor_O);
export const voidRight = d.voidRight({ map } as Functor_O);
export const $$void = d.$$void({ map } as Functor_O);
/*
export const wilted = d.wilted({ wilt } as WiltOnly_1<TArray>);
export const withered = d.withered({ wither } as WitherOnly_1<TArray>);

export const pipeK = d.pipeK({ bind, pure } as BindOnly_1<TArray> & PureOnly_1<TArray>);
export const pipeKValue = d.pipeKValue({ bind, pure } as BindOnly_1<TArray> & PureOnly_1<TArray>);
*/
