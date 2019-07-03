import { Eq } from './Eq';
import { GT, LT, Ordering } from './Ordering';

export interface Ord<a> extends Eq<a> {
	compare: (x: a) => (y: a) => Ordering;
}

export const lessThan = <a>(ordA: Ord<a>) => (x: a) => (y: a): boolean => ordA.compare(x)(y) === LT;

export const greaterThan = <a>(ordA: Ord<a>) => (x: a) => (y: a): boolean =>
	ordA.compare(x)(y) === GT;

export const lessThanOrEq = <a>(ordA: Ord<a>) => (x: a) => (y: a): boolean =>
	ordA.compare(x)(y) !== GT;

export const greaterThanOrEq = <a>(ordA: Ord<a>) => (x: a) => (y: a): boolean =>
	ordA.compare(x)(y) !== LT;

export const comparing = <b>(ordB: Ord<b>) => <a>(f: (_: a) => b) => (x: a) => (y: a) =>
	ordB.compare(f(x))(f(y));

export const min = <a>(ordA: Ord<a>) => (x: a) => (y: a): a => (ordA.compare(x)(y) === GT ? y : x);

export const max = <a>(ordA: Ord<a>) => (x: a) => (y: a): a => (ordA.compare(x)(y) === LT ? y : x);

export const clamp = <a>(ordA: Ord<a>) => (low: a) => (hi: a) => (x: a): a =>
	min(ordA)(hi)(max(ordA)(low)(x));

export const between = <a>(ordA: Ord<a>) => (low: a) => (hi: a) => (x: a): boolean =>
	lessThan(ordA)(x)(low) ? false : greaterThan(ordA)(x)(hi) ? false : true;

// TODO: abs

// TODO: signum
