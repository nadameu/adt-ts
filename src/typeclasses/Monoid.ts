import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Semigroup_0, Semigroup_1, Semigroup_2 } from './Semigroup';

export interface Monoid_0<a> extends Semigroup_0<a> {
  mempty: () => a;
}
export interface Monoid_1<f extends Generic1> extends Semigroup_1<f> {
  mempty: <a = never>() => Type1<f, a>;
}
export interface Monoid_2<f extends Generic2> extends Semigroup_2<f> {
  mempty: <a = never, b = never>() => Type2<f, a, b>;
}

export interface MEmptyOnly_0<a> extends Pick<Monoid_0<a>, 'NotGenericType' | 'mempty'> {}

export interface MEmptyOnly_1<f extends Generic1>
  extends Pick<Monoid_1<f>, 'Generic1Type' | 'mempty'> {}

export interface MEmptyOnly_2<f extends Generic2>
  extends Pick<Monoid_2<f>, 'Generic2Type' | 'mempty'> {}
