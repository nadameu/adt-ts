import { Generic1 } from '../Generic';
import { CatQueue } from './definitions';

export interface TCatQueue extends Generic1 {
  type: CatQueue<this['a']>;
}
