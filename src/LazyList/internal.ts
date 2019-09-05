import { Generic1 } from '../Generic';
import { LazyList } from './definitions';

export interface TLazyList extends Generic1 {
  type: LazyList<this['a']>;
}
