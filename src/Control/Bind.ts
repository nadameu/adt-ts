import { flip, identity } from '../Data/Function';
import { Generic1, Type } from '../Generic';
import { Apply } from './Apply';

export interface Bind<m extends Generic1> extends Apply<m> {
	bind: <a>(ma: Type<m, a>) => <b>(f: (_: a) => Type<m, b>) => Type<m, b>;
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

export const join = <m extends Generic1>(
	bind: Bind<m>,
): (<a>(mma: Type<m, Type<m, a>>) => Type<m, a>) => /*@__PURE__*/ bindFlipped(bind)(identity);

export const composeKleisli = <m extends Generic1>(bind: Bind<m>) => <a, b>(
	f: (_: a) => Type<m, b>,
) => <c>(g: (_: b) => Type<m, c>): ((_: a) => Type<m, c>) => x => bind.bind(f(x))(g);

export const composeKleisliFlipped = <m extends Generic1>(
	bind: Bind<m>,
): (<b, c>(f: (_: b) => Type<m, c>) => <a>(g: (_: a) => Type<m, b>) => (_: a) => Type<m, c>) =>
	/*@__PURE__*/ flip<any, any, any>(composeKleisli(bind));

export const ifM = <m extends Generic1>(bind: Bind<m>) => (cond: Type<m, boolean>) => <a>(
	t: Type<m, a>,
) => (f: Type<m, a>): Type<m, a> => bind.bind(cond)(c => (c ? t : f));
