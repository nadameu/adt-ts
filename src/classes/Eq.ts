import { Type1 } from '../Types';

export interface Eq<a> {
	eq: (x: a) => (y: a) => boolean;
}

export const eq: <a>(E: Eq<a>) => Eq<a>['eq'] = E => E.eq;

export const notEq: <a>(E: Eq<a>) => Eq<a>['eq'] = E => x => y => !E.eq(x)(y);

export interface Eq1<f> {
	eq1: <a>(E: Eq<a>) => <y, x, w>(x: Type1<f, w, x, y, a>) => (x: Type1<f, w, x, y, a>) => boolean;
}

export const eq1: <f>(E0: Eq1<f>) => Eq1<f>['eq1'] = E0 => E0.eq1;

export const notEq1: <f>(
	E0: Eq1<f>,
) => <a>(
	E: Eq<a>,
) => <y, x, w>(
	x: Type1<f, w, x, y, a>,
) => (x: Type1<f, w, x, y, a>) => boolean = E0 => E => x => y => !E0.eq1(E)(x)(y);
