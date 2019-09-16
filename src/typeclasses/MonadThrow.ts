import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Monad_1, Monad_2 } from './Monad';

export interface MonadThrow_1<f extends Generic1, e> extends Monad_1<f> {
  throwError: <a = never>(e: e) => Type1<f, a>;
}

export interface MonadThrow_2<f extends Generic2> extends Monad_2<f> {
  throwError: <e, a = never>(e: e) => Type2<f, e, a>;
}

export interface ThrowErrorOnly_1<f extends Generic1, e>
  extends Pick<MonadThrow_1<f, e>, 'Generic1Type' | 'throwError'> {}

export interface ThrowErrorOnly_2<f extends Generic2>
  extends Pick<MonadThrow_2<f>, 'Generic2Type' | 'throwError'> {}
