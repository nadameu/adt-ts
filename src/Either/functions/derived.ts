import * as d from '../../derivations';
import {
  Apply_2,
  BindOnly_2,
  FoldLOnly_2,
  FoldMapOnly_2,
  Functor_2,
  PureOnly_2,
} from '../../typeclasses';
import { TEither } from '../internal';
import { apply, bind, foldl, foldMap, map, pure } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_2<TEither>);
export const lift3 = d.lift3({ apply, map } as Apply_2<TEither>);
export const lift4 = d.lift4({ apply, map } as Apply_2<TEither>);
export const lift5 = d.lift5({ apply, map } as Apply_2<TEither>);

export const composeKleisli = d.composeKleisli({ bind } as BindOnly_2<TEither>);
export const composeKleisliFlipped = d.composeKleisliFlipped({ bind } as BindOnly_2<TEither>);
export const join = d.join({ bind } as BindOnly_2<TEither>);

export const all = d.all({ foldMap } as FoldMapOnly_2<TEither>);
export const and = d.and({ foldMap } as FoldMapOnly_2<TEither>);
export const any = d.any({ foldMap } as FoldMapOnly_2<TEither>);
export const fold = d.fold({ foldMap } as FoldMapOnly_2<TEither>);
export const intercalate = d.intercalate({ foldl } as FoldLOnly_2<TEither>);
export const length = d.length({ foldMap } as FoldMapOnly_2<TEither>);
export const maximumBy = d.maximumBy({ foldl } as FoldLOnly_2<TEither>);
export const minimumBy = d.minimumBy({ foldl } as FoldLOnly_2<TEither>);
export const oneOf = d.oneOf({ foldMap } as FoldMapOnly_2<TEither>);
export const oneOfMap = d.oneOfMap({ foldMap } as FoldMapOnly_2<TEither>);
export const or = d.or({ foldMap } as FoldMapOnly_2<TEither>);
export const product = d.product({ foldMap } as FoldMapOnly_2<TEither>);
export const sum = d.sum({ foldMap } as FoldMapOnly_2<TEither>);
export const surround = d.surround({ foldMap } as FoldMapOnly_2<TEither>);
export const surroundMap = d.surroundMap({ foldMap } as FoldMapOnly_2<TEither>);

export const flap = d.flap({ map } as Functor_2<TEither>);
export const voidLeft = d.voidLeft({ map } as Functor_2<TEither>);
export const voidRight = d.voidRight({ map } as Functor_2<TEither>);
export const $$void = d.$$void({ map } as Functor_2<TEither>);

export const pipeK = d.pipeK({ bind, pure } as BindOnly_2<TEither> & PureOnly_2<TEither>);
export const pipeKValue = d.pipeKValue({ bind, pure } as BindOnly_2<TEither> & PureOnly_2<TEither>);
