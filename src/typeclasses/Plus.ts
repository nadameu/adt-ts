import { Generic1, Type1 } from '../Generic';
import { Alt1 } from './Alt';

export interface Plus1<f extends Generic1> extends Alt1<f> {
  empty: <a = never>() => Type1<f, a>;
}
