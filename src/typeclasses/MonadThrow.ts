import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Monad_1, Monad_2 } from './Monad';

export interface MonadThrow_1<f extends Generic1> extends Monad_1<f> {
  throwError: <a = never>() => Type1<f, a>;
}

export interface MonadThrow_2<f extends Generic2> extends Monad_2<f> {
  throwError: <e, a = never>(e: e) => Type2<f, e, a>;
}
