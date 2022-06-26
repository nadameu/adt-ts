import { Generic1 } from '../Generic';
import { Free } from './definitions';

export interface TFree<f extends Generic1> extends Generic1 {
  type: Free<f, this['a']>;
}
export let TFree: TFree<Generic1>;
