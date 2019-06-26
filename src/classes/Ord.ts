import { Eq, Eq1 } from './Eq';
import { Prop1, Type1 } from '../Types';

export const Ordering = {
	LT: -1 as -1,
	EQ: 0 as 0,
	GT: 1 as 1,
};
export type Ordering = (typeof Ordering)[keyof typeof Ordering];

export interface Ord<a> extends Eq<a> {
	compare: (x: a) => (y: a) => Ordering;
}

interface Derived<a> extends Ord<a> {
	'<>': (x: a) => (y: a) => boolean;
	comparing: <b>(f: (_: b) => a) => (x: b) => (y: b) => Ordering;
	minmax: (x: a) => (y: a) => a;
	clamp: (lo: a) => (hi: a) => (x: a) => a;
	between: (lo: a) => (hi: a) => (x: a) => boolean;
}

type Derive<r extends keyof Derived<never>> = <a>(O: Ord<a>) => Derived<a>[r];

export const lte: Derive<'<>'> = ({ compare }) => x => y => compare(x)(y) !== Ordering.GT;

export const gt: Derive<'<>'> = ({ compare }) => x => y => compare(x)(y) === Ordering.GT;

export const lt: Derive<'<>'> = ({ compare }) => x => y => compare(x)(y) === Ordering.LT;

export const gte: Derive<'<>'> = ({ compare }) => x => y => compare(x)(y) !== Ordering.LT;

export const comparing: Derive<'comparing'> = ({ compare }) => f => x => y => compare(f(x))(f(y));

export const min: Derive<'minmax'> = O => x => y => (lte(O)(x)(y) ? x : y);

export const max: Derive<'minmax'> = O => x => y => (gte(O)(x)(y) ? x : y);

export const clamp: Derive<'clamp'> = O => lo => hi => x => min(O)(hi)(max(O)(lo)(x));

export const between: Derive<'between'> = O => lo => hi => x => gte(O)(x)(lo) && lte(O)(x)(hi);

export interface Ord1<f extends Prop1> extends Eq1<f> {
	compare1: <a>(O: Ord<a>) => (fx: Type1<f, a>) => (fy: Type1<f, a>) => Ordering;
}
