import * as fl from '../fantasy-land';
import { Ordering } from '../instances/Ordering';
import { Keys, Type } from '../Types';
import { Setoid } from './Setoid';

export interface Ord<O extends Keys, a, b, c, d> extends Setoid<O, a, b, c, d> {
	[fl.lte]: (this: Type<O, a, b, c, d>, _: TO<O, a, b, c, d>) => boolean;
}

type TO<O extends Keys, a, b, c, d> = Type<O, a, b, c, d> & Ord<O, a, b, c, d>;

export const lte = <O extends Keys, a = never, b = never, c = never, d = never>(
	x: TO<O, a, b, c, d>,
) => (y: TO<O, a, b, c, d>) => x[fl.lte](y);

export const gt = <O extends Keys, a = never, b = never, c = never, d = never>(
	x: TO<O, a, b, c, d>,
) => (y: TO<O, a, b, c, d>): boolean => !x[fl.lte](y);

export const lt = <O extends Keys, a = never, b = never, c = never, d = never>(
	x: TO<O, a, b, c, d>,
) => (y: TO<O, a, b, c, d>): boolean => !y[fl.lte](x);

export const gte = <O extends Keys, a = never, b = never, c = never, d = never>(
	x: TO<O, a, b, c, d>,
) => (y: TO<O, a, b, c, d>): boolean => y[fl.lte](x);

export const compare = <O extends Keys, a = never, b = never, c = never, d = never>(
	x: TO<O, a, b, c, d>,
) => (y: TO<O, a, b, c, d>): Ordering =>
	!y[fl.lte](x) ? Ordering.LT : !x[fl.lte](y) ? Ordering.GT : Ordering.EQ;

export const comparing = <a, O extends Keys, b = never, c = never, d = never, e = never>(
	f: (_: a) => TO<O, b, c, d, e>,
) => (x: a) => (y: a) => compare<O, b, c, d, e>(f(x))(f(y));

export const min = <O extends Keys, a = never, b = never, c = never, d = never>(
	x: TO<O, a, b, c, d>,
) => (y: TO<O, a, b, c, d>): TO<O, a, b, c, d> => (lte<O, a, b, c, d>(x)(y) ? x : y);

export const max = <O extends Keys, a = never, b = never, c = never, d = never>(
	x: TO<O, a, b, c, d>,
) => (y: TO<O, a, b, c, d>): TO<O, a, b, c, d> => (gte<O, a, b, c, d>(x)(y) ? x : y);

export const clamp = <O extends Keys, a = never, b = never, c = never, d = never>(
	lo: TO<O, a, b, c, d>,
) => (hi: TO<O, a, b, c, d>) => (x: TO<O, a, b, c, d>): TO<O, a, b, c, d> => min(hi)(max(lo)(x));

export const between = <O extends Keys, a = never, b = never, c = never, d = never>(
	lo: TO<O, a, b, c, d>,
) => (hi: TO<O, a, b, c, d>) => (x: TO<O, a, b, c, d>): boolean => gte(x)(lo) && lte(x)(hi);
