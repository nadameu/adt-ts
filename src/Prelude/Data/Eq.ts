import { Desc, TypeDesc } from '../../Type';
export { eq1Array, eqArray } from '../../Prim/Array';
export { eqBoolean } from '../../Prim/Boolean';
export { eqNumber } from '../../Prim/Number';
export { eqRecord } from '../../Prim/Record';
export { eqString } from '../../Prim/String';

export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
	never: never;
}
export type Type<desc extends TypeDesc, params extends any[] = any[]> = desc extends keyof Dict
	? Dict<params>[desc]
	: desc extends Desc<infer key, infer descs>
	? key extends keyof Dict
		? Dict<params, descs>[key]
		: never
	: never;

export interface Eq<a extends TypeDesc> {
	eq: <_0>(_: Type<a, [_0]>) => (_: Type<a, [_0]>) => boolean;
}

export const notEq: <a extends TypeDesc>(
	_: Eq<a>,
) => <_0>(_: Type<a, [_0]>) => (_: Type<a, [_0]>) => boolean = E => x => y => !E.eq(x)(y);

export interface Eq1<f extends string> {
	eq1: <a extends TypeDesc>(
		_: Eq<a>,
	) => <_0>(_: Type<Desc<f, [a]>, [_0]>) => (_: Type<Desc<f, [a]>, [_0]>) => boolean;
}

export const notEq1: <f extends string>(
	_: Eq1<f>,
) => <a extends TypeDesc>(
	_: Eq<a>,
) => <_0>(
	_: Type<Desc<f, [a]>, [_0]>,
) => (_: Type<Desc<f, [a]>, [_0]>) => boolean = E1 => E => x => y => !E1.eq1(E)(x)(y);
