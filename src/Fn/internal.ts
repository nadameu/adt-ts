import { Generic2, GenericFn2 } from '../Generic';

export interface TFn extends GenericFn2 {
  type: (_: this['a']) => this['b'];
}

export interface TFn_ extends Generic2 {
  type: (_: this['a']) => this['b'];
}
