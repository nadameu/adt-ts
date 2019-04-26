import { Prop1, Type1 } from '../Types';

export interface Semigroup<a> {
	append: (x: a) => (y: a) => a;
}
export interface Semigroup1<f extends Prop1> {
	append: <a>(fx: Type1<f, a>) => (fy: Type1<f, a>) => Type1<f, a>;
}
