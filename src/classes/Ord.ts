import * as fl from '../fantasy-land';
import { Ordering } from '../instances/Ordering';
import { Setoid } from './Setoid';

export interface Ord<a extends Ord<a>> extends Setoid<a> {
	[fl.lte]: (this: a, _: a) => boolean;
}

export const lte = <a extends Ord<a>>(x: a) => (y: a) => x[fl.lte](y);

export const gt = <a extends Ord<a>>(x: a) => (y: a): boolean => !x[fl.lte](y);

export const lt = <a extends Ord<a>>(x: a) => (y: a): boolean => !y[fl.lte](x);

export const gte = <a extends Ord<a>>(x: a) => (y: a): boolean => y[fl.lte](x);

export const compare = <a extends Ord<a>>(x: a) => (y: a): Ordering =>
	!y[fl.lte](x) ? Ordering.LT : !x[fl.lte](y) ? Ordering.GT : Ordering.EQ;

export const comparing = <a, b extends Ord<b>>(f: (_: a) => b) => (x: a) => (y: a) =>
	compare(f(x))(f(y));

export const min = <a extends Ord<a>>(x: a) => (y: a): a => (lte(x)(y) ? x : y);

export const max = <a extends Ord<a>>(x: a) => (y: a): a => (gte(x)(y) ? x : y);

export const clamp = <a extends Ord<a>>(lo: a) => (hi: a) => (x: a): a => min(hi)(max(lo)(x));

export const between = <a extends Ord<a>>(lo: a) => (hi: a) => (x: a): boolean =>
	gte(x)(lo) && lte(x)(hi);
