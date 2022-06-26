import * as G from '../Generic';
import { identity } from '../helpers';
import { Functor_1, Functor_2, Functor_O } from './Functor';

export interface AltOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  alt: <a>(fx: G.Type1<f, a>) => (fy: G.Type1<f, a>) => G.Type1<f, a>;
}
export interface Alt_1<f extends G.Generic1> extends Functor_1<f>, AltOnly_1<f> {}

export interface AltOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  alt: <a, b>(fx: G.Type2<f, a, b>) => (fy: G.Type2<f, a, b>) => G.Type2<f, a, b>;
}
export interface Alt_2<f extends G.Generic2> extends Functor_2<f>, AltOnly_2<f> {}

export interface AltOnly_O extends G.IdentifiedO {
  alt: <T>(x: T) => <U>(y: U) => {
    [k in keyof T | keyof U]: k extends keyof T ? T[k] : k extends keyof U ? U[k] : never;
  };
}
export interface Alt_O extends Functor_O, AltOnly_O {}

export const makeAlt: {
  <f extends G.Generic1>({ alt, map }: G.Anon<Alt_1<f>>): Alt_1<f>;
  <f extends G.Generic2>({ alt, map }: G.Anon<Alt_2<f>>): Alt_2<f>;
  ({ alt, map }: G.Anon<Alt_O>): Alt_O;
} = identity;
