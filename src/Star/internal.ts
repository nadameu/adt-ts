import { Generic1, Generic2, GenericFn2, GenericFn3, Type1, Type2 } from '../Generic';

export interface TStar1<f extends Generic1> extends GenericFn2 {
  type: (_: this['a']) => Type1<f, this['b']>;
}

export interface TStar2<f extends Generic2> extends GenericFn3 {
  type: (_: this['b']) => Type2<f, this['a'], this['c']>;
}
