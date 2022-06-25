import * as G from '../Generic';
import { Monad_1, Monad_2 } from './Monad';

export interface ThrowErrorOnly_1<f extends G.Generic1, e> extends G.Identified1<f> {
  throwError: <a = never>(e: e) => G.Type1<f, a>;
}
export interface MonadThrow_1<f extends G.Generic1, e> extends Monad_1<f>, ThrowErrorOnly_1<f, e> {}

export interface ThrowErrorOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  throwError: <e, a = never>(e: e) => G.Type2<f, e, a>;
}
export interface MonadThrow_2<f extends G.Generic2> extends Monad_2<f>, ThrowErrorOnly_2<f> {}
