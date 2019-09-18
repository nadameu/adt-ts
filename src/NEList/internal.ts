import { Generic1 } from '../Generic';
import { NEList } from './definitions';

export interface TNEList extends Generic1 {
  type: NEList<this['a']>;
}
