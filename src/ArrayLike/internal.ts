import { Generic1 } from '../Generic';

export interface TArrayLike extends Generic1 {
  type: ArrayLike<this['a']>;
}

export let TArray: TArrayLike;
