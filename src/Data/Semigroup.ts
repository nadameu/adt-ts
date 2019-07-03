import { Generic1, Type } from '../Generic';

export interface Semigroup<a> {
	append: (x: a) => (y: a) => a;
}

export interface Semigroup1<f extends Generic1> {
	append: <a>(x: Type<f, a>) => (y: Type<f, a>) => Type<f, a>;
}
