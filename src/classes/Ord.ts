import { Ordering } from '../instances/Ordering';
import { Eq, Eq1 } from './Eq';
import { Prop1, Type1 } from '../Types';

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

type Derive<k extends keyof Ord<never>, r extends keyof Derived<never>> = <a>(
	O: Pick<Ord<a>, k>,
) => Derived<a>[r];

export const lte: Derive<'compare', '<>'> = ({ compare }) => x => y =>
	compare(x)(y) !== Ordering.GT;

export const gt: Derive<'compare', '<>'> = ({ compare }) => x => y => compare(x)(y) === Ordering.GT;

export const lt: Derive<'compare', '<>'> = ({ compare }) => x => y => compare(x)(y) === Ordering.LT;

export const gte: Derive<'compare', '<>'> = ({ compare }) => x => y =>
	compare(x)(y) !== Ordering.LT;

export const comparing: Derive<'compare', 'comparing'> = ({ compare }) => f => x => y =>
	compare(f(x))(f(y));

export const min: Derive<'compare', 'minmax'> = ({ compare }) => x => y =>
	lte({ compare })(x)(y) ? x : y;

export const max: Derive<'compare', 'minmax'> = ({ compare }) => x => y =>
	gte({ compare })(x)(y) ? x : y;

export const clamp: Derive<'compare', 'clamp'> = ({ compare }) => lo => hi => x =>
	min({ compare })(hi)(max({ compare })(lo)(x));

export const between: Derive<'compare', 'between'> = ({ compare }) => lo => hi => x =>
	gte({ compare })(x)(lo) && lte({ compare })(x)(hi);

export interface Ord1<f extends Prop1> extends Eq1<f> {
	compare1: <a>(O: Ord<a>) => (fx: Type1<f, a>) => (fy: Type1<f, a>) => Ordering;
}
