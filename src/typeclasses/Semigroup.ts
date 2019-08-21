import { Generic1, Identified0, Identified1, Type1 } from '../Generic';

export interface Semigroup0<a> extends Identified0<a> {
  append: (x: a) => (y: a) => a;
}

export interface Semigroup1<f extends Generic1> extends Identified1<f> {
  append: <a>(fx: Type1<f, a>) => (fy: Type1<f, a>) => Type1<f, a>;
}

export type Semigroup = {
  [k in keyof Semigroup0<never> & keyof Semigroup1<never>]: Semigroup0<unknown>[k];
};
