import * as d from '../../derivations';
import {
  Apply_1,
  BindOnly_1,
  FoldLOnly_1,
  FoldMapOnly_1,
  Functor_1,
  PureOnly_1,
} from '../../typeclasses';
import { TNEList } from '../internal';
import { apply, bind, foldl, foldMap, map, pure } from './original';

export const lift2 = d.lift2({ apply, map } as Apply_1<TNEList>);
export const lift3 = d.lift3({ apply, map } as Apply_1<TNEList>);
export const lift4 = d.lift4({ apply, map } as Apply_1<TNEList>);
export const lift5 = d.lift5({ apply, map } as Apply_1<TNEList>);

export const composeKleisli = d.composeKleisli({ bind } as BindOnly_1<TNEList>);
export const composeKleisliFlipped = d.composeKleisliFlipped({ bind } as BindOnly_1<TNEList>);
export const join = d.join({ bind } as BindOnly_1<TNEList>);

export const all = d.all({ foldMap } as FoldMapOnly_1<TNEList>);
export const and = d.and({ foldMap } as FoldMapOnly_1<TNEList>);
export const any = d.any({ foldMap } as FoldMapOnly_1<TNEList>);
export const fold = d.fold({ foldMap } as FoldMapOnly_1<TNEList>);
export const intercalate = d.intercalate({ foldl } as FoldLOnly_1<TNEList>);
export const length = d.length({ foldMap } as FoldMapOnly_1<TNEList>);
export const maximumBy = d.maximumBy({ foldl } as FoldLOnly_1<TNEList>);
export const minimumBy = d.minimumBy({ foldl } as FoldLOnly_1<TNEList>);
export const oneOf = d.oneOf({ foldMap } as FoldMapOnly_1<TNEList>);
export const oneOfMap = d.oneOfMap({ foldMap } as FoldMapOnly_1<TNEList>);
export const or = d.or({ foldMap } as FoldMapOnly_1<TNEList>);
export const product = d.product({ foldMap } as FoldMapOnly_1<TNEList>);
export const sum = d.sum({ foldMap } as FoldMapOnly_1<TNEList>);
export const surround = d.surround({ foldMap } as FoldMapOnly_1<TNEList>);
export const surroundMap = d.surroundMap({ foldMap } as FoldMapOnly_1<TNEList>);

export const flap = d.flap({ map } as Functor_1<TNEList>);
export const voidLeft = d.voidLeft({ map } as Functor_1<TNEList>);
export const voidRight = d.voidRight({ map } as Functor_1<TNEList>);
export const $$void = d.$$void({ map } as Functor_1<TNEList>);

export const pipeK = d.pipeK({ bind, pure } as BindOnly_1<TNEList> & PureOnly_1<TNEList>);
