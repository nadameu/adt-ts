import { Ordering } from '../instances/Ordering';
import { Eq, Eq1 } from './Eq';
import { Prop1, Type } from '../Types';

export interface Ord<a> extends Eq<a> {
	compare: (x: a) => (y: a) => Ordering;
}

export const lte: <a>(O: Pick<Ord<a>, 'compare'>) => (x: a) => (y: a) => boolean = ({
	compare,
}) => x => y => compare(x)(y) !== Ordering.GT;

export const gt: <a>(O: Pick<Ord<a>, 'compare'>) => (x: a) => (y: a) => boolean = ({
	compare,
}) => x => y => compare(x)(y) === Ordering.GT;

export const lt: <a>(O: Pick<Ord<a>, 'compare'>) => (x: a) => (y: a) => boolean = ({
	compare,
}) => x => y => compare(x)(y) === Ordering.LT;

export const gte: <a>(O: Pick<Ord<a>, 'compare'>) => (x: a) => (y: a) => boolean = ({
	compare,
}) => x => y => compare(x)(y) !== Ordering.LT;

export const comparing: <b>(O: Ord<b>) => <a>(f: (_: a) => b) => (x: a) => (y: a) => Ordering = ({
	compare,
}) => f => x => y => compare(f(x))(f(y));

export const min: <a>(O: Pick<Ord<a>, 'compare'>) => (x: a) => (y: a) => a = ({
	compare,
}) => x => y => (lte({ compare })(x)(y) ? x : y);

export const max: <a>(O: Pick<Ord<a>, 'compare'>) => (x: a) => (y: a) => a = ({
	compare,
}) => x => y => (gte({ compare })(x)(y) ? x : y);

export const clamp: <a>(O: Pick<Ord<a>, 'compare'>) => (lo: a) => (hi: a) => (x: a) => a = ({
	compare,
}) => lo => hi => x => min({ compare })(hi)(max({ compare })(lo)(x));

export const between: <a>(
	O: Pick<Ord<a>, 'compare'>,
) => (lo: a) => (hi: a) => (x: a) => boolean = ({ compare }) => lo => hi => x =>
	gte({ compare })(x)(lo) && lte({ compare })(x)(hi);

export interface Ord1<f extends Prop1> extends Eq1<f> {
	compare1: <a>(
		O: Ord<a>,
	) => (
		fx: Type<f, never, never, never, never, a>,
	) => (fy: Type<f, never, never, never, never, a>) => Ordering;
}
