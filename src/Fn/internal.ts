import { GenericFn } from '../Generic';

export interface TFn extends GenericFn {
  type: (_: this['a']) => this['b'];
}
