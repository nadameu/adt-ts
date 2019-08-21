import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Alt1, Alt2 } from './Alt';

export interface Plus1<f extends Generic1> extends Alt1<f> {
  empty: <a = never>() => Type1<f, a>;
}

export interface Plus2<f extends Generic2> extends Alt2<f> {
  empty: <a = never, b = never>() => Type2<f, a, b>;
}

export type Plus = {
  [k in keyof Plus1<never> & keyof Plus2<never>]: Plus1<Generic1>[k];
};
