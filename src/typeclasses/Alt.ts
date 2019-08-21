import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Functor1, Functor2 } from './Functor';

export interface Alt1<f extends Generic1> extends Functor1<f> {
  alt: <a>(fx: Type1<f, a>) => (fy: Type1<f, a>) => Type1<f, a>;
}

export interface Alt2<f extends Generic2> extends Functor2<f> {
  alt: <a, b>(fx: Type2<f, a, b>) => (fy: Type2<f, a, b>) => Type2<f, a, b>;
}

export type Alt = {
  [k in keyof Alt1<never> & keyof Alt2<never>]: Alt1<Generic1>[k];
};
