import { Identified0, Generic1, Identified1, Type1 } from '../Generic';

export interface Semigroup<a> extends Identified0<a> {
  append: (x: a, y: a) => a;
}
export interface Semigroup1<f extends Generic1> extends Identified1<f> {
  append: <a>(fx: Type1<f, a>, fy: Type1<f, a>) => Type1<f, a>;
}
