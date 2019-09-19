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
  PureOnly_1,
} from '../../typeclasses';
import { TMaybe } from '../internal';
import { apply, bind, filterMap, foldl, pure, foldMap, map, wilt, wither } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_1<TMaybe>);
export const lift3 = d.lift3({ apply, map } as Apply_1<TMaybe>);
export const lift4 = d.lift4({ apply, map } as Apply_1<TMaybe>);
export const lift5 = d.lift5({ apply, map } as Apply_1<TMaybe>);

export const composeKleisli = d.composeKleisli({ bind } as BindOnly_1<TMaybe>);
export const composeKleisliFlipped = d.composeKleisliFlipped({ bind } as BindOnly_1<TMaybe>);
export const join = d.join({ bind } as BindOnly_1<TMaybe>);

export const cleared = d.cleared({ filterMap } as FilterMapOnly_1<TMaybe>);

export const all = d.all({ foldMap } as FoldMapOnly_1<TMaybe>);
export const and = d.and({ foldMap } as FoldMapOnly_1<TMaybe>);
export const any = d.any({ foldMap } as FoldMapOnly_1<TMaybe>);
export const fold = d.fold({ foldMap } as FoldMapOnly_1<TMaybe>);
export const intercalate = d.intercalate({ foldl } as FoldLOnly_1<TMaybe>);
export const length = d.length({ foldMap } as FoldMapOnly_1<TMaybe>);
export const maximumBy = d.maximumBy({ foldl } as FoldLOnly_1<TMaybe>);
export const minimumBy = d.minimumBy({ foldl } as FoldLOnly_1<TMaybe>);
export const oneOf = d.oneOf({ foldMap } as FoldMapOnly_1<TMaybe>);
export const oneOfMap = d.oneOfMap({ foldMap } as FoldMapOnly_1<TMaybe>);
export const or = d.or({ foldMap } as FoldMapOnly_1<TMaybe>);
export const product = d.product({ foldMap } as FoldMapOnly_1<TMaybe>);
export const sum = d.sum({ foldMap } as FoldMapOnly_1<TMaybe>);
export const surround = d.surround({ foldMap } as FoldMapOnly_1<TMaybe>);
export const surroundMap = d.surroundMap({ foldMap } as FoldMapOnly_1<TMaybe>);

export const flap = d.flap({ map } as Functor_1<TMaybe>);
export const voidLeft = d.voidLeft({ map } as Functor_1<TMaybe>);
export const voidRight = d.voidRight({ map } as Functor_1<TMaybe>);
export const $$void = d.$$void({ map } as Functor_1<TMaybe>);

export const wilted = d.wilted({ wilt } as WiltOnly_1<TMaybe>);
export const withered = d.withered({ wither } as WitherOnly_1<TMaybe>);

export const pipeK = d.pipeK({ bind, pure } as BindOnly_1<TMaybe> & PureOnly_1<TMaybe>);
export const pipeKValue = d.pipeKValue({ bind, pure } as BindOnly_1<TMaybe> & PureOnly_1<TMaybe>);
