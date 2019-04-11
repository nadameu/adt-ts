import { flip, identity } from '../combinators';
import { Type1 } from '../Types';
import { Apply } from './Apply';

export interface Bind<f> extends Apply<f> {
	bind: <a, y, x, w>(
		fa: Type1<f, w, x, y, a>,
	) => <b>(f: (_: a) => Type1<f, w, x, y, b>) => Type1<f, w, x, y, b>;
}

export const bind: <f>(C: Bind<f>) => Bind<f>['bind'] = B => B.bind;

export const bindFlipped: <f>(
	B: Bind<f>,
) => <a, b, y, x, w>(
	f: (_: a) => Type1<f, w, x, y, b>,
) => (fa: Type1<f, w, x, y, a>) => Type1<f, w, x, y, b> = B => flip<any, any, any>(B.bind);

export const join: <f>(
	B: Bind<f>,
) => <a, y, x, w>(fa: Type1<f, w, x, y, Type1<f, w, x, y, a>>) => Type1<f, w, x, y, a> = B =>
	bindFlipped(B)(identity);

export const composeKleisli: <f>(
	B: Bind<f>,
) => <a, b, y, x, w>(
	f: (_: a) => Type1<f, w, x, y, b>,
) => <c>(g: (_: b) => Type1<f, w, x, y, c>) => (_: a) => Type1<f, w, x, y, c> = B => f => g => x =>
	B.bind(f(x))(g);

export const composeKleisliFlipped: <f>(
	B: Bind<f>,
) => <b, c, y, x, w>(
	f: (_: b) => Type1<f, w, x, y, c>,
) => <a>(g: (_: a) => Type1<f, w, x, y, b>) => (_: a) => Type1<f, w, x, y, c> = B => f => g => x =>
	B.bind(g(x))(f);

export const ifM: <f>(
	B: Bind<f>,
) => <y, x, w>(
	cond: Type1<f, w, x, y, boolean>,
) => <a>(
	t: Type1<f, w, x, y, a>,
) => (f: Type1<f, w, x, y, a>) => Type1<f, w, x, y, a> = B => cond => t => f =>
	B.bind(cond)(x => (x ? t : f));
