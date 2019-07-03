import { Ring } from './Ring';

export interface DivisionRing<a> extends Ring<a> {
	recip: (x: a) => a;
}

export const leftDiv = <a>(divisionRingA: DivisionRing<a>) => (x: a) => (y: a): a =>
	divisionRingA.mul(divisionRingA.recip(y))(x);

export const rightDiv = <a>(divisionRingA: DivisionRing<a>) => (x: a) => (y: a): a =>
	divisionRingA.mul(x)(divisionRingA.recip(y));
