import { Generic1, Type1 } from '../Generic';
import { Semigroup, Semigroup1 } from './Semigroup';

export interface Monoid<a> extends Semigroup<a> {
  mempty: () => a;
}
export interface Monoid1<f extends Generic1> extends Semigroup1<f> {
  mempty: <a = never>() => Type1<f, a>;
}

export type AnyMonoid = Pick<
  Monoid<unknown> & Monoid1<Generic1>,
  keyof Monoid<unknown> & keyof Monoid1<Generic1>
>;
