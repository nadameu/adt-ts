import { Functor, Functor2 } from '../Data/Functor';
import { Generic1, Generic2, Type } from '../Generic';

export interface Alt<f extends Generic1> extends Functor<f> {
	alt: <a>(fx: Type<f, a>) => (fy: Type<f, a>) => Type<f, a>;
}

export interface Alt2<f extends Generic2> extends Functor2<f> {
	alt: <a, b>(fx: Type<f, a, b>) => (fy: Type<f, a, b>) => Type<f, a, b>;
}
