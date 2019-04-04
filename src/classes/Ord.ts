import { B1, flip, on } from '../combinators';
import { Desc, GetKey, Info, MakeInfo } from '../Desc';
import { not } from '../instances/Boolean';
import { Ordering } from '../instances/Ordering';
import { Setoid } from './Setoid';

export interface Dict<info extends Info> {
	never: never;
}
export type Type<desc extends Desc, params extends any[]> = Dict<MakeInfo<desc, params>>[GetKey<
	desc,
	keyof Dict<never>
>];

export interface Ord<o extends Desc> extends Setoid<o> {
	lte: <_0 = unknown>(_: Type<o, [_0]>) => (_: Type<o, [_0]>) => boolean;
}

export const lte = <o extends Desc>(O: Ord<o>) => O.lte;
export const gt: <o extends Desc>(
	_: Ord<o>,
) => <_0 = unknown>(_: Type<o, [_0]>) => (_: Type<o, [_0]>) => boolean = O => B1(not)(lte(O));

export const lt: <o extends Desc>(
	_: Ord<o>,
) => <_0 = unknown>(_: Type<o, [_0]>) => (_: Type<o, [_0]>) => boolean = O => B1(not)(flip(lte(O)));

export const gte: <o extends Desc>(
	_: Ord<o>,
) => <_0 = unknown>(_: Type<o, [_0]>) => (_: Type<o, [_0]>) => boolean = O => flip(lte(O));

export const compare: <o extends Desc>(
	_: Ord<o>,
) => <_0 = unknown>(_: Type<o, [_0]>) => (_: Type<o, [_0]>) => Ordering = O => x => y =>
	lt(O)(x)(y) ? Ordering.LT : gt(O)(x)(y) ? Ordering.GT : Ordering.EQ;

export const comparing: <o extends Desc>(
	_: Ord<o>,
) => <a, _0 = unknown>(_: (_: a) => Type<o, [_0]>) => (_: a) => (_: a) => Ordering = O =>
	on(compare(O));

export const min: <o extends Desc>(
	_: Ord<o>,
) => <_0 = unknown>(_: Type<o, [_0]>) => (_: Type<o, [_0]>) => Type<o, [_0]> = O => x => y =>
	lt(O)(x)(y) ? x : y;

export const max: <o extends Desc>(
	_: Ord<o>,
) => <_0 = unknown>(_: Type<o, [_0]>) => (_: Type<o, [_0]>) => Type<o, [_0]> = O => x => y =>
	gt(O)(x)(y) ? x : y;

export const clamp = <o extends Desc>(O: Ord<o>) => <_0 = unknown>(lo: Type<o, [_0]>) => (
	hi: Type<o, [_0]>,
) => (x: Type<o, [_0]>): Type<o, [_0]> => min(O)(hi)(max(O)(lo)(x));

export const between = <o extends Desc>(O: Ord<o>) => <_0 = unknown>(lo: Type<o, [_0]>) => (
	hi: Type<o, [_0]>,
) => (x: Type<o, [_0]>): boolean => (lt(O)(x)(lo) || gt(O)(x)(hi) ? false : true);
