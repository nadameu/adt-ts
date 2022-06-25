import * as G from '../Generic';
import { Semigroup_0, Semigroup_1, Semigroup_2 } from './Semigroup';

export interface MEmptyOnly_0<a> extends G.Identified0<a> {
  mempty: () => a;
}
export interface Monoid_0<a> extends Semigroup_0<a>, MEmptyOnly_0<a> {}

export interface MEmptyOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  mempty: <a = never>() => G.Type1<f, a>;
}
export interface Monoid_1<f extends G.Generic1> extends Semigroup_1<f>, MEmptyOnly_1<f> {}

export interface MEmptyOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  mempty: <a = never, b = never>() => G.Type2<f, a, b>;
}
export interface Monoid_2<f extends G.Generic2> extends Semigroup_2<f>, MEmptyOnly_2<f> {}
