import { Generic2 } from '../Generic';
import { Either } from './definitions';

export interface TEither extends Generic2 {
  type: Either<this['a'], this['b']>;
}
export let TEither: TEither;
