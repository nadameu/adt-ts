import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Semigroup, Semigroup1, Semigroup2 } from './Semigroup';

export interface Monoid<a> extends Semigroup<a> {
	mempty: () => a;
}
export interface Monoid1<f extends Prop1> extends Semigroup1<f> {
	mempty: <a = never>() => Type1<f, a>;
}
export interface Monoid2<f extends Prop2> extends Semigroup2<f> {
	mempty: <a = never, b = never>() => Type2<f, a, b>;
}
