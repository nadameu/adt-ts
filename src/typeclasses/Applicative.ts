import { Generic1, Type1 } from '../Generic';
import { Apply1 } from './Apply';

export interface Applicative1<f extends Generic1> extends Apply1<f> {
  pure: <a>(a: a) => Type1<f, a>;
}
