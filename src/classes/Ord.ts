import { Ordering } from '../instances/Ordering';
import { Setoid } from './Setoid';

export interface Ord<a> extends Setoid<a> {
	compare: (x: a) => (y: a) => Ordering;
}

export const compare: <a>(O: Ord<a>) => Ord<a>['compare'] = O => O.compare;

export const lte: <a>(O: Ord<a>) => (x: a) => (y: a) => boolean = O => x => y =>
	O.compare(x)(y) !== Ordering.GT;

export const gt: <a>(O: Ord<a>) => (x: a) => (y: a) => boolean = O => x => y =>
	O.compare(x)(y) === Ordering.GT;

export const lt: <a>(O: Ord<a>) => (x: a) => (y: a) => boolean = O => x => y =>
	O.compare(x)(y) === Ordering.LT;

export const gte: <a>(O: Ord<a>) => (x: a) => (y: a) => boolean = O => x => y =>
	O.compare(x)(y) !== Ordering.LT;

export const comparing: <b>(
	O: Ord<b>,
) => <a>(f: (_: a) => b) => (x: a) => (y: a) => Ordering = O => f => x => y =>
	O.compare(f(x))(f(y));

export const min: <a>(O: Ord<a>) => (x: a) => (y: a) => a = O => x => y => (lte(O)(x)(y) ? x : y);

export const max: <a>(O: Ord<a>) => (x: a) => (y: a) => a = O => x => y => (gte(O)(x)(y) ? x : y);

export const clamp: <a>(O: Ord<a>) => (lo: a) => (hi: a) => (x: a) => a = O => lo => hi => x =>
	min(O)(hi)(max(O)(lo)(x));

export const between: <a>(
	O: Ord<a>,
) => (lo: a) => (hi: a) => (x: a) => boolean = O => lo => hi => x => gte(O)(x)(lo) && lte(O)(x)(hi);
