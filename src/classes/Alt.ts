import { Prop1, Type1, Prop2, Type2 } from '../Types';
import { Functor1, Functor2 } from './Functor';

export interface Alt1<f extends Prop1> extends Functor1<f> {
	alt: <a>(fx: Type1<f, a>) => (fy: Type1<f, a>) => Type1<f, a>;
}
export interface Alt2<f extends Prop2> extends Functor2<f> {
	alt: <a, b>(fx: Type2<f, a, b>) => (fy: Type2<f, a, b>) => Type2<f, a, b>;
}
