import { Generic1, Type1 } from '../Generic';
import { Monad1 } from './Monad';

export interface MonadThrow1<f extends Generic1> extends Monad1<f> {
  throwError: <a = never>() => Type1<f, a>;
}
