import { Generic1 } from '../Generic';

export interface TIdentity extends Generic1 {
  type: this['a'];
}
