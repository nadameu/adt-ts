import { GenericFn2 } from '../Generic';

export interface TFn extends GenericFn2 {
  type: (_: this['a']) => this['b'];
}
