import { Prop1, Prop2, Type1, Type2 } from '../Types';

export interface Semigroup<a> {
	append: (x: a) => (y: a) => a;
}
export interface Semigroup1<f extends Prop1> {
	append: <a>(fx: Type1<f, a>) => (fy: Type1<f, a>) => Type1<f, a>;
}
export interface Semigroup2<f extends Prop2> {
	append: <a, b>(fx: Type2<f, a, b>) => (fy: Type2<f, a, b>) => Type2<f, a, b>;
}
