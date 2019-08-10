import { Semigroup, Semigroup1 } from './Semigroup';
import { Generic1, Type1 } from '../Generic';

export interface Monoid<a> extends Semigroup<a> {
  mempty: () => a;
}
export interface Monoid1<f extends Generic1> extends Semigroup1<f> {
  mempty: <a = never>() => Type1<f, a>;
}
