import { Generic1 } from '../Generic';
import { List, NEList } from './definitions';

export interface TList extends Generic1 {
  type: List<this['a']>;
}

export interface TNEList extends Generic1 {
  type: NEList<this['a']>;
}
