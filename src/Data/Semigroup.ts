import { Generic1, Generic2, Type } from '../Generic';

export interface Semigroup<a> {
	append: (x: a) => (y: a) => a;
}

export interface Semigroup1<f extends Generic1> {
	append: <a>(x: Type<f, a>) => (y: Type<f, a>) => Type<f, a>;
}

export interface Semigroup2<f extends Generic2> {
	append: <a, b>(x: Type<f, a, b>) => (y: Type<f, a, b>) => Type<f, a, b>;
}
