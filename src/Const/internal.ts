import { Generic2, Generic1, Type1 } from '../Generic';

export interface TConst extends Generic2 {
  type: this['a'];
}

export interface TConst0<a> extends Generic2 {
  type: a;
}

export interface TConst1<f extends Generic1> extends Generic2 {
  type: Type1<f, this['a']>;
}
