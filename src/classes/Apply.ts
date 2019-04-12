import { B1, B2, constant, flip, identity } from '../combinators';
import { Type1 } from '../Types';
import { Functor } from './Functor';

export interface Apply<f> extends Functor<f> {
	apply: <a, b, y, x, w>(
		ff: Type1<f, w, x, y, (_: a) => b>,
	) => (fa: Type1<f, w, x, y, a>) => Type1<f, w, x, y, b>;
}

export const apply: <f>(A: Pick<Apply<f>, 'apply'>) => Apply<f>['apply'] = A => A.apply;

export const applyFlipped: <f>(
	A: Pick<Apply<f>, 'apply'>,
) => <a, y, x, w>(
	fa: Type1<f, w, x, y, a>,
) => <b>(ff: Type1<f, w, x, y, (_: a) => b>) => Type1<f, w, x, y, b> = A =>
	flip<any, any, any>(A.apply);

export const applyFirst: <f>(
	A: Pick<Apply<f>, 'apply' | 'map'>,
) => <a, y, x, w>(
	fa: Type1<f, w, x, y, a>,
) => (fb: Type1<f, w, x, y, any>) => Type1<f, w, x, y, a> = A => lift2(A)<any, any, any>(constant);

export const applySecond: <f>(
	A: Pick<Apply<f>, 'apply' | 'map'>,
) => <y, x, w>(
	fa: Type1<f, w, x, y, any>,
) => <a>(fb: Type1<f, w, x, y, a>) => Type1<f, w, x, y, a> = A =>
	lift2(A)<any, any, any>(constant(identity));

export const lift2: <f>(
	A: Pick<Apply<f>, 'apply' | 'map'>,
) => <a, b, c>(
	f: (_: a) => (_: b) => c,
) => <y, x, w>(
	fa: Type1<f, w, x, y, a>,
) => (fb: Type1<f, w, x, y, b>) => Type1<f, w, x, y, c> = A =>
	B1<any, any>(A.apply)<any, any>(A.map);

export const lift3: <f>(
	A: Pick<Apply<f>, 'apply' | 'map'>,
) => <a, b, c, d>(
	f: (_: a) => (_: b) => (_: c) => d,
) => <y, x, w>(
	fa: Type1<f, w, x, y, a>,
) => (fb: Type1<f, w, x, y, b>) => (fc: Type1<f, w, x, y, c>) => Type1<f, w, x, y, d> = A =>
	B2<any, any>(A.apply)<any, any, any>(lift2(A));
