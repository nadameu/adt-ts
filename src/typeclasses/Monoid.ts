import { Generic1, Type1 } from '../Generic';
import { Semigroup0, Semigroup1 } from './Semigroup';

export interface Monoid0<a> extends Semigroup0<a> {
  mempty: () => a;
}
export interface Monoid1<f extends Generic1> extends Semigroup1<f> {
  mempty: <a = never>() => Type1<f, a>;
}

export type Monoid = {
  [k in keyof Monoid0<never> & keyof Monoid1<never>]: Monoid0<unknown>[k];
};
