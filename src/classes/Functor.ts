import { constant, thrush } from '../combinators';
import { AnyFn1, AnyFn2, AnyFn3, Prop1, Prop2, Type1, Type2 } from '../Types';

export interface Functor1<f extends Prop1> {
	map: <a, b>(f: (_: a) => b) => (fa: Type1<f, a>) => Type1<f, b>;
}
export interface Functor2<f extends Prop2> {
	map: <b, c>(f: (_: b) => c) => <a>(fa: Type2<f, a, b>) => Type2<f, a, c>;
}

export const mapFlipped: {
	<f extends Prop2>(F: Functor2<f>): <a, b>(
		fa: Type2<f, a, b>,
	) => <c>(f: (_: b) => c) => Type2<f, a, c>;
	<f extends Prop1>(F: Functor1<f>): <a>(fa: Type1<f, a>) => <b>(f: (_: a) => b) => Type1<f, b>;
} = (({ map }) => fa => f => map(f)(fa)) as AnyFn3;

export const voidLeft: {
	<f extends Prop2>(F: Functor2<f>): <a>(fa: Type2<f, a, any>) => <b>(y: b) => Type2<f, a, b>;
	<f extends Prop1>(F: Functor1<f>): (fa: Type1<f, any>) => <b>(y: b) => Type1<f, b>;
} = (({ map }) => fa => y => map(constant(y))(fa)) as AnyFn3;

export const voidRight: {
	<f extends Prop2>(F: Functor2<f>): <a>(x: a) => <b>(fb: Type2<f, b, any>) => Type2<f, b, a>;
	<f extends Prop1>(F: Functor1<f>): <a>(x: a) => (fb: Type1<f, any>) => Type1<f, a>;
} = (({ map }) => x => map(constant(x))) as AnyFn2;

const _void: {
	<f extends Prop2>(F: Functor2<f>): <a>(fa: Type2<f, a, any>) => Type2<f, a, void>;
	<f extends Prop1>(F: Functor1<f>): (fa: Type1<f, any>) => Type1<f, void>;
} = (({ map }) => map(constant(undefined))) as AnyFn1;
export { _void as void };

export const flap: {
	<f extends Prop2>(F: Functor2<f>): <a, b, c>(
		ff: Type2<f, a, (_: b) => c>,
	) => (x: b) => Type2<f, a, c>;
	<f extends Prop1>(F: Functor1<f>): <a, b>(ff: Type1<f, (_: a) => b>) => (x: a) => Type1<f, b>;
} = (({ map }) => ff => x => map(thrush(x))(ff)) as AnyFn3;
