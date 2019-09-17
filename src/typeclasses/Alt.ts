import { Generic1, Generic1Type, Generic2, Generic2Type, Type1, Type2 } from '../Generic';
import { Functor_1, Functor_2 } from './Functor';

export interface Alt_1<f extends Generic1> extends Functor_1<f> {
  alt: <a>(fx: Type1<f, a>) => (fy: Type1<f, a>) => Type1<f, a>;
}

export interface Alt_2<f extends Generic2> extends Functor_2<f> {
  alt: <a, b>(fx: Type2<f, a, b>) => (fy: Type2<f, a, b>) => Type2<f, a, b>;
}

export interface AltOnly_1<f extends Generic1> extends Pick<Alt_1<f>, Generic1Type | 'alt'> {}

export interface AltOnly_2<f extends Generic2> extends Pick<Alt_2<f>, Generic2Type | 'alt'> {}
