import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Semigroup0, Semigroup1, Semigroup2 } from './Semigroup';

export interface Monoid0<a> extends Semigroup0<a> {
  mempty: () => a;
}
export interface Monoid1<f extends Generic1> extends Semigroup1<f> {
  mempty: <a = never>() => Type1<f, a>;
}
export interface Monoid2<f extends Generic2> extends Semigroup2<f> {
  mempty: <a = never, b = never>() => Type2<f, a, b>;
}

export type Monoid = {
  [k in keyof Monoid0<never> & keyof Monoid1<never> & keyof Monoid2<never>]: Monoid0<unknown>[k];
};
