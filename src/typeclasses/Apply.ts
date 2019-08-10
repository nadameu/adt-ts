import { Generic1, Type1 } from '../Generic';
import { Functor1 } from './Functor';

export interface Apply1<f extends Generic1> extends Functor1<f> {
  apply: <a, b>(f: Type1<f, (_: a) => b>) => (fa: Type1<f, a>) => Type1<f, b>;
}
