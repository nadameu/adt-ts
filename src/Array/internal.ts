import { Generic1 } from '../Generic';

export interface TArray extends Generic1 {
  type: Array<this['a']>;
}

export let TArray: TArray;
