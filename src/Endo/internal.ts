import { Generic1 } from '../Generic';

export interface TEndo extends Generic1 {
  type: (_: this['a']) => this['a'];
}
