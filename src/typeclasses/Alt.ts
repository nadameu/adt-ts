import { Generic1, Type1 } from '../Generic';
import { Functor1 } from './Functor';

export interface Alt1<f extends Generic1> extends Functor1<f> {
  alt: <a>(fx: Type1<f, a>, fy: Type1<f, a>) => Type1<f, a>;
}
