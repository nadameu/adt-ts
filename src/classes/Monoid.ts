import { AnyFn2, AnyFn3, Prop1, Type1 } from '../Types';
import { Semigroup, Semigroup1 } from './Semigroup';

export interface Monoid<a> extends Semigroup<a> {
	mempty: () => a;
}
export interface Monoid1<f extends Prop1> extends Semigroup1<f> {
	mempty: <a = never>() => Type1<f, a>;
}

