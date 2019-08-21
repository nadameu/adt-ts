import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Monad1, Monad2 } from './Monad';

export interface MonadThrow1<f extends Generic1> extends Monad1<f> {
  throwError: <a = never>() => Type1<f, a>;
}

export interface MonadThrow2<f extends Generic2> extends Monad2<f> {
  throwError: <e, a = never>(e: e) => Type2<f, e, a>;
}

export type MonadThrow = {
  [k in keyof MonadThrow1<never> & keyof MonadThrow2<never>]: MonadThrow1<Generic1>[k];
};
