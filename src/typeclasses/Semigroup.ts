import {
  Generic1,
  Generic2,
  Identified0,
  Identified1,
  Identified2,
  Type1,
  Type2,
} from '../Generic';

export interface Semigroup_0<a> extends Identified0<a> {
  append: (x: a) => (y: a) => a;
}

export interface Semigroup_1<f extends Generic1> extends Identified1<f> {
  append: <a>(fx: Type1<f, a>) => (fy: Type1<f, a>) => Type1<f, a>;
}

export interface Semigroup_2<f extends Generic2> extends Identified2<f> {
  append: <a, b>(fx: Type2<f, a, b>) => (fy: Type2<f, a, b>) => Type2<f, a, b>;
}
