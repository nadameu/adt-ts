import { identity } from '../instances/Fn';
import { AnyFn1, AnyFn3, AnyFn4, Prop1, Prop2, Type1, Type2 } from '../Types';
import { Functor1, Functor2 } from './Functor';

export interface Extend1<f extends Prop1> extends Functor1<f> {
	extend: <a, b>(f: (_: Type1<f, a>) => b) => (fa: Type1<f, a>) => Type1<f, b>;
}

export interface Extend2<f extends Prop2> extends Functor2<f> {
	extend: <a, b, c>(f: (_: Type2<f, a, b>) => c) => (fa: Type2<f, a, b>) => Type2<f, a, c>;
}

export const extendFlipped: {
	<f extends Prop2>(E: Pick<Extend2<f>, 'extend'>): <a, b>(
		fa: Type2<f, a, b>,
	) => <c>(f: (_: Type2<f, a, b>) => c) => Type2<f, a, c>;
	<f extends Prop1>(E: Pick<Extend1<f>, 'extend'>): <a>(
		fa: Type1<f, a>,
	) => <b>(f: (_: Type1<f, a>) => b) => Type1<f, b>;
} = (({ extend }) => fa => f => extend(f)(fa)) as AnyFn3;

export const composeCoKleisli: {
	<f extends Prop2>(E: Pick<Extend2<f>, 'extend'>): <a, b, c>(
		f: (_: Type2<f, a, b>) => c,
	) => <d>(g: (_: Type2<f, a, c>) => d) => (_: Type2<f, a, b>) => d;
	<f extends Prop1>(E: Pick<Extend1<f>, 'extend'>): <a, b>(
		f: (_: Type1<f, a>) => b,
	) => <c>(g: (_: Type1<f, b>) => c) => (_: Type1<f, a>) => c;
} = (({ extend }) => f => g => fa => g(extend(f)(fa))) as AnyFn4;

export const composeCoKleisliFlipped: {
	<f extends Prop2>(E: Pick<Extend2<f>, 'extend'>): <a, c, d>(
		f: (_: Type2<f, a, c>) => d,
	) => <b>(g: (_: Type2<f, a, b>) => c) => (_: Type2<f, a, b>) => d;
	<f extends Prop1>(E: Pick<Extend1<f>, 'extend'>): <b, c>(
		f: (_: Type1<f, b>) => c,
	) => <a>(g: (_: Type1<f, a>) => b) => (_: Type1<f, a>) => c;
} = (({ extend }) => f => g => fa => f(extend(g)(fa))) as AnyFn4;

export const duplicate: {
	<f extends Prop2>(E: Pick<Extend2<f>, 'extend'>): <a, b>(
		fa: Type2<f, a, b>,
	) => Type2<f, a, Type2<f, a, b>>;
	<f extends Prop1>(E: Pick<Extend1<f>, 'extend'>): <a>(fa: Type1<f, a>) => Type1<f, Type1<f, a>>;
} = (({ extend }) => extend(identity)) as AnyFn1;
