import * as G from '../Generic';
import { MonadThrow_1, MonadThrow_2 } from './MonadThrow';

export interface CatchErrorOnly_1<f extends G.Generic1, e> extends G.Identified1<f> {
  catchError: <a>(f: (_: e) => G.Type1<f, a>) => (fa: G.Type1<f, a>) => G.Type1<f, a>;
}
export interface MonadError_1<f extends G.Generic1, e>
  extends MonadThrow_1<f, e>,
    CatchErrorOnly_1<f, e> {}

export interface CatchErrorOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  catchError: <e, a>(f: (_: e) => G.Type2<f, e, a>) => (fea: G.Type2<f, e, a>) => G.Type2<f, e, a>;
}
export interface MonadError_2<f extends G.Generic2> extends MonadThrow_2<f>, CatchErrorOnly_2<f> {}
