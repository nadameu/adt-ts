import * as G from '../Generic';
import { identity } from '../helpers';
import { Alt_1, Alt_2, Alt_O } from './Alt';

export interface EmptyOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  empty: <a = never>() => G.Type1<f, a>;
}
export interface Plus_1<f extends G.Generic1> extends Alt_1<f>, EmptyOnly_1<f> {}

export interface EmptyOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  empty: <a = never, b = never>() => G.Type2<f, a, b>;
}
export interface Plus_2<f extends G.Generic2> extends Alt_2<f>, EmptyOnly_2<f> {}

export interface EmptyOnly_O extends G.IdentifiedO {
  empty: () => {};
}
export interface Plus_O extends Alt_O, EmptyOnly_O {}

export const makePlus: {
  <f extends G.Generic1>({ alt, empty, map }: G.Anon<Plus_1<f>>): Plus_1<f>;
  <f extends G.Generic2>({ alt, empty, map }: G.Anon<Plus_2<f>>): Plus_2<f>;
  ({ alt, empty, map }: G.Anon<Plus_O>): Plus_O;
} = identity;
