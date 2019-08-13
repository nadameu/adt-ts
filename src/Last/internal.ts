import { Generic1 } from '../Generic';

export interface TLast extends Generic1 {
  type: this['a'];
}

export let TLast: TLast;
