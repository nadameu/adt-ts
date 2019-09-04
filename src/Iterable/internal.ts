import { Generic1 } from '../Generic';

export interface TIterable extends Generic1 {
  type: Iterable<this['a']>;
}
