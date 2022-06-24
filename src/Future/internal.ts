import { Generic1 } from '../Generic';
import { Future } from './definitions';

export interface TFuture extends Generic1 {
  type: Future<this['a']>;
}
