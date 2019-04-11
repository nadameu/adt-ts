import { B1, B2, constant, flip, identity } from '../combinators';
import { Type1 } from '../Types';
import { Functor, map } from './Functor';

export interface Apply<f> extends Functor<f> {
	ap: <a, b, y, x, w>(
		ff: Type1<f, w, x, y, (_: a) => b>,
	) => (fa: Type1<f, w, x, y, a>) => Type1<f, w, x, y, b>;
}

export const ap: <f>(A: Apply<f>) => Apply<f>['ap'] = A => A.ap;

export const apFlipped: <f>(
	A: Apply<f>,
) => <a, y, x, w>(
	fa: Type1<f, w, x, y, a>,
) => <b>(ff: Type1<f, w, x, y, (_: a) => b>) => Type1<f, w, x, y, b> = A =>
	flip<any, any, any>(A.ap);

export const applyFirst: <f>(
	A: Apply<f>,
) => <a, y, x, w>(
	fa: Type1<f, w, x, y, a>,
) => (fb: Type1<f, w, x, y, any>) => Type1<f, w, x, y, a> = A => lift2(A)<any, any, any>(constant);

export const applySecond: <f>(
	A: Apply<f>,
) => <y, x, w>(
	fa: Type1<f, w, x, y, any>,
) => <a>(fb: Type1<f, w, x, y, a>) => Type1<f, w, x, y, a> = A =>
	lift2(A)<any, any, any>(constant(identity));

export const lift1: <f>(A: Apply<f>) => Functor<f>['map'] = map;

export const lift2: <f>(
	A: Apply<f>,
) => <a, b, c>(
	f: (_: a) => (_: b) => c,
) => <y, x, w>(
	fa: Type1<f, w, x, y, a>,
) => (fb: Type1<f, w, x, y, b>) => Type1<f, w, x, y, c> = A => B1<any, any>(A.ap)<any, any>(A.map);

export const lift3: <f>(
	A: Apply<f>,
) => <a, b, c, d>(
	f: (_: a) => (_: b) => (_: c) => d,
) => <y, x, w>(
	fa: Type1<f, w, x, y, a>,
) => (fb: Type1<f, w, x, y, b>) => (fc: Type1<f, w, x, y, c>) => Type1<f, w, x, y, d> = A =>
	B2<any, any>(A.ap)<any, any, any>(lift2(A));
