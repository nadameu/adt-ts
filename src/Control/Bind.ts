import { Generic1, Type } from '../Generic';
import { Apply } from './Apply';

export interface Bind<m extends Generic1> extends Apply<m> {
	bind: <a>(ma: Type<m, a>) => <b>(f: (_: a) => Type<m, b>) => Type<m, b>;
}

export const bindFlipped = <m extends Generic1>(bind: Bind<m>) => <a, b>(
	f: (_: a) => Type<m, b>,
) => (ma: Type<m, a>): Type<m, b> => bind.bind(ma)(f);

export interface Discard<a> {
	discard: <f extends Generic1>(
		bind: Bind<f>,
	) => (fa: Type<f, a>) => <b>(f: (_: a) => Type<f, b>) => Type<f, b>;
}

export const join = <m extends Generic1>(bind: Bind<m>) => <a>(
	mma: Type<m, Type<m, a>>,
): Type<m, a> => bind.bind(mma)(ma => ma);

export const composeKleisli = <m extends Generic1>(bind: Bind<m>) => <a, b>(
	f: (_: a) => Type<m, b>,
) => <c>(g: (_: b) => Type<m, c>) => (x: a): Type<m, c> => bind.bind(f(x))(g);

export const composeKleisliFlipped = <m extends Generic1>(bind: Bind<m>) => <b, c>(
	f: (_: b) => Type<m, c>,
) => <a>(g: (_: a) => Type<m, b>) => (x: a): Type<m, c> => bind.bind(g(x))(f);

export const ifM = <m extends Generic1>(bind: Bind<m>) => (cond: Type<m, boolean>) => <a>(
	t: Type<m, a>,
) => (f: Type<m, a>): Type<m, a> => bind.bind(cond)(c => (c ? t : f));
