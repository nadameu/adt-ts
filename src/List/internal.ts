import { Generic1 } from '../Generic';
import { List } from './definitions';

export interface TList extends Generic1 {
  type: List<this['a']>;
}
