import { Generic1 } from '../Generic';

export interface TFirst extends Generic1 {
  type: this['a'];
}

export let TFirst: TFirst;
