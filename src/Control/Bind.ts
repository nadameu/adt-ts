import { flip, identity } from '../Data/Function';
import { Generic1, Generic2, Type } from '../Generic';
import { Apply, Apply2 } from './Apply';

export interface Bind<m extends Generic1> extends Apply<m> {
	bind: <a>(ma: Type<m, a>) => <b>(f: (_: a) => Type<m, b>) => Type<m, b>;
}

export interface Bind2<m extends Generic2> extends Apply2<m> {
	bind: <a, b>(ma: Type<m, a, b>) => <c>(f: (_: b) => Type<m, a, c>) => Type<m, a, c>;
}

interface Helpers<m extends Generic1> {
	bindFlipped: <a, b>(f: (_: a) => Type<m, b>) => (ma: Type<m, a>) => Type<m, b>;
	join: <a>(mma: Type<m, Type<m, a>>) => Type<m, a>;
	composeKleisli: <a, b>(
		f: (_: a) => Type<m, b>,
	) => <c>(g: (_: b) => Type<m, c>) => (_: a) => Type<m, c>;
	composeKleisliFlipped: <b, c>(
		f: (_: b) => Type<m, c>,
	) => <a>(g: (_: a) => Type<m, b>) => (_: a) => Type<m, c>;
	ifM: (cond: Type<m, boolean>) => <a>(t: Type<m, a>) => (f: Type<m, a>) => Type<m, a>;
}
interface Helpers2<m extends Generic2> {
	bindFlipped: <a, b, c>(f: (_: b) => Type<m, a, c>) => (ma: Type<m, a, b>) => Type<m, a, c>;
	join: <a, b>(mma: Type<m, a, Type<m, a, b>>) => Type<m, a, b>;
	composeKleisli: <a, b, c>(
		f: (_: b) => Type<m, a, c>,
	) => <d>(g: (_: c) => Type<m, a, d>) => (_: b) => Type<m, a, d>;
	composeKleisliFlipped: <a, c, d>(
		f: (_: c) => Type<m, a, d>,
	) => <b>(g: (_: b) => Type<m, a, c>) => (_: b) => Type<m, a, d>;
	ifM: <a>(
		cond: Type<m, a, boolean>,
	) => <b>(t: Type<m, a, b>) => (f: Type<m, a, b>) => Type<m, a, b>;
}
interface Helper<k extends keyof Helpers<Generic1>> {
	<m extends Generic1>(bind: Bind<m>): Helpers<m>[k];
	<m extends Generic2>(bind: Bind2<m>): Helpers2<m>[k];
}

export const bindFlipped = <m extends Generic1>(
	bind: Bind<m>,
): (<a, b>(f: (_: a) => Type<m, b>) => (ma: Type<m, a>) => Type<m, b>) =>
	/*@__PURE__*/ flip(bind.bind);

export interface Discard<a> {
	discard: <f extends Generic1>(
		bind: Bind<f>,
	) => (fa: Type<f, a>) => <b>(f: (_: a) => Type<f, b>) => Type<f, b>;
}

export const join: Helper<'join'> = <m extends Generic1>(
	bind: Bind<m>,
): (<a>(mma: Type<m, Type<m, a>>) => Type<m, a>) => /*@__PURE__*/ bindFlipped(bind)(identity);

export const composeKleisli: Helper<'composeKleisli'> = <m extends Generic1>(bind: Bind<m>) => <
	a,
	b
>(
	f: (_: a) => Type<m, b>,
) => <c>(g: (_: b) => Type<m, c>): ((_: a) => Type<m, c>) => x => bind.bind(f(x))(g);

export const composeKleisliFlipped: Helper<'composeKleisliFlipped'> = <m extends Generic1>(
	bind: Bind<m>,
): (<b, c>(f: (_: b) => Type<m, c>) => <a>(g: (_: a) => Type<m, b>) => (_: a) => Type<m, c>) =>
	/*@__PURE__*/ flip<any, any, any>(composeKleisli(bind));

export const ifM: Helper<'ifM'> = <m extends Generic1>(bind: Bind<m>) => (
	cond: Type<m, boolean>,
) => <a>(t: Type<m, a>) => (f: Type<m, a>): Type<m, a> => bind.bind(cond)(c => (c ? t : f));
