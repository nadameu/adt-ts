import { Generic1, Type } from '../Generic';

export interface Eq<a> {
	eq: (x: a) => (y: a) => boolean;
}

export const notEq = <a>(Eq: Eq<a>) => (x: a) => (y: a): boolean => Eq.eq(x)(y) == false;

export interface Eq1<f extends Generic1> {
	eq1: <a>(eqA: Eq<a>) => (fx: Type<f, a>) => (fy: Type<f, a>) => boolean;
}

export const notEq1 = <f extends Generic1>(eq1F: Eq1<f>) => <a>(eqA: Eq<a>) => (fx: Type<f, a>) => (
	fy: Type<f, a>,
): boolean => eq1F.eq1(eqA)(fx)(fy) === false;
