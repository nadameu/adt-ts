import { Generic1, Type1, Generic2, Type2 } from '../Generic';
import { MonadThrow1, MonadThrow2 } from './MonadThrow';

export interface MonadError1<f extends Generic1> extends MonadThrow1<f> {
  catchError: <a>(f: () => Type1<f, a>) => (fa: Type1<f, a>) => Type1<f, a>;
}

export interface MonadError2<f extends Generic2> extends MonadThrow2<f> {
  catchError: <e, a>(f: (_: e) => Type2<f, e, a>) => (fea: Type2<f, e, a>) => Type2<f, e, a>;
}

export type MonadError = {
  [k in keyof MonadError1<never> & keyof MonadError2<never>]: MonadError1<Generic1>[k];
};
