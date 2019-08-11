import { Generic1, Type1 } from '../Generic';
import { MonadThrow1 } from './MonadThrow';

export interface MonadError1<f extends Generic1> extends MonadThrow1<f> {
  catchError: <a>(f: () => Type1<f, a>) => (fa: Type1<f, a>) => Type1<f, a>;
}
