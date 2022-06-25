import * as G from '../Generic';

export interface Semigroup_0<a> extends G.Identified0<a> {
  append: (x: a) => (y: a) => a;
}

export interface Semigroup_1<f extends G.Generic1> extends G.Identified1<f> {
  append: <a>(fx: G.Type1<f, a>) => (fy: G.Type1<f, a>) => G.Type1<f, a>;
}

export interface Semigroup_2<f extends G.Generic2> extends G.Identified2<f> {
  append: <a, b>(fx: G.Type2<f, a, b>) => (fy: G.Type2<f, a, b>) => G.Type2<f, a, b>;
}
