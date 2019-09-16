import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { MonadThrow_1, MonadThrow_2 } from './MonadThrow';

export interface MonadError_1<f extends Generic1, e> extends MonadThrow_1<f, e> {
  catchError: <a>(f: (_: e) => Type1<f, a>) => (fa: Type1<f, a>) => Type1<f, a>;
}

export interface MonadError_2<f extends Generic2> extends MonadThrow_2<f> {
  catchError: <e, a>(f: (_: e) => Type2<f, e, a>) => (fea: Type2<f, e, a>) => Type2<f, e, a>;
}

export interface CatchErrorOnly_1<f extends Generic1, e>
  extends Pick<MonadError_1<f, e>, 'Generic1Type' | 'catchError'> {}

export interface CatchErrorOnly_2<f extends Generic2>
  extends Pick<MonadError_2<f>, 'Generic2Type' | 'catchError'> {}
