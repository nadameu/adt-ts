import { identity } from '../combinators';
import { Prop1, Type1, Prop2, Type2, AnyFn3, AnyFn1, AnyFn4 } from '../Types';
import { Apply1, Apply2 } from './Apply';

export interface Bind1<f extends Prop1> extends Apply1<f> {
	bind: <a>(fa: Type1<f, a>) => <b>(f: (_: a) => Type1<f, b>) => Type1<f, b>;
}
export interface Bind2<f extends Prop2> extends Apply2<f> {
	bind: <a, b>(fa: Type2<f, a, b>) => <c>(f: (_: b) => Type2<f, a, c>) => Type2<f, a, c>;
}

export const bindFlipped: {
	<f extends Prop2>(B: Pick<Bind2<f>, 'bind'>): <a, b, c>(
		f: (_: b) => Type2<f, a, c>,
	) => (fa: Type2<f, a, b>) => Type2<f, a, c>;
	<f extends Prop1>(B: Pick<Bind1<f>, 'bind'>): <a, b>(
		f: (_: a) => Type1<f, b>,
	) => (fa: Type1<f, a>) => Type1<f, b>;
} = (({ bind }) => f => fa => bind(fa)(f)) as AnyFn3;

export const join: {
	<f extends Prop2>(B: Pick<Bind2<f>, 'bind'>): <a, b>(
		fa: Type2<f, a, Type2<f, a, b>>,
	) => Type2<f, a, b>;
	<f extends Prop1>(B: Pick<Bind1<f>, 'bind'>): <a>(fa: Type1<f, Type1<f, a>>) => Type1<f, a>;
} = (({ bind }) => bindFlipped({ bind })(identity)) as AnyFn1;

export const composeKleisli: {
	<f extends Prop2>(B: Pick<Bind2<f>, 'bind'>): <a, b, c>(
		f: (_: b) => Type2<f, a, c>,
	) => <d>(g: (_: c) => Type2<f, a, d>) => (_: b) => Type2<f, a, d>;
	<f extends Prop1>(B: Pick<Bind1<f>, 'bind'>): <a, b>(
		f: (_: a) => Type1<f, b>,
	) => <c>(g: (_: b) => Type1<f, c>) => (_: a) => Type1<f, c>;
} = (({ bind }) => f => g => x => bind(f(x))(g)) as AnyFn4;

export const composeKleisliFlipped: {
	<f extends Prop2>(B: Pick<Bind2<f>, 'bind'>): <c, d, a>(
		f: (_: c) => Type2<f, a, d>,
	) => <b>(g: (_: b) => Type2<f, a, c>) => (_: b) => Type2<f, a, d>;
	<f extends Prop1>(B: Pick<Bind1<f>, 'bind'>): <b, c>(
		f: (_: b) => Type1<f, c>,
	) => <a>(g: (_: a) => Type1<f, b>) => (_: a) => Type1<f, c>;
} = (({ bind }) => f => g => x => bind(g(x))(f)) as AnyFn4;

export const ifM: {
	<f extends Prop2>(B: Pick<Bind2<f>, 'bind'>): <a>(
		cond: Type2<f, a, boolean>,
	) => <b>(whenTrue: Type2<f, a, b>) => (whenFalse: Type2<f, a, b>) => Type2<f, a, b>;
	<f extends Prop1>(B: Pick<Bind1<f>, 'bind'>): (
		cond: Type1<f, boolean>,
	) => <a>(whenTrue: Type1<f, a>) => (whenFalse: Type1<f, a>) => Type1<f, a>;
} = (({ bind }) => cond => whenTrue => whenFalse =>
	bind(cond)(x => (x ? whenTrue : whenFalse))) as <f extends Prop1>(
	B: Pick<Bind1<f>, 'bind'>,
) => (
	cond: Type1<f, boolean>,
) => <a>(whenTrue: Type1<f, a>) => (whenFalse: Type1<f, a>) => Type1<f, a>;
