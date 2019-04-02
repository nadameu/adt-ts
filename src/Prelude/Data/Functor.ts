import { Desc, TypeDesc } from '../../Type';
import * as Fn from './Function';

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

export interface Functor<f extends TypeDesc> {
	map: <a, b>(f: (_: a) => b) => <_0>(_: Type<f, [a, _0]>) => Type<f, [b, _0]>;
}

export const mapFlipped: <f extends TypeDesc>(
	_: Functor<f>,
) => <a, _0>(_: Type<f, [a, _0]>) => <b>(_: (_: a) => b) => Type<f, [b, _0]> = F => fa => f =>
	F.map(f)(fa);
export const voidRight: <f extends TypeDesc>(
	_: Functor<f>,
) => <a>(_: a) => <b, _0>(_: Type<f, [b, _0]>) => Type<f, [a, _0]> = F => x => fb =>
	mapFlipped(F)(fb)(Fn.const(x));
const _void: <f extends TypeDesc>(
	_: Functor<f>,
) => <a, _0>(_: Type<f, [a, _0]>) => Type<f, [void, _0]> = F => voidRight(F)(undefined as void);
export { _void as void };
export const voidLeft: <f extends TypeDesc>(
	_: Functor<f>,
) => <a, _0>(_: Type<f, [a, _0]>) => <b>(_: b) => Type<f, [b, _0]> = F => fa => x =>
	voidRight(F)(x)(fa);
export const flap: <f extends TypeDesc>(
	_: Functor<f>,
) => <a, b, _0>(_: Type<f, [(_: a) => b, _0]>) => (_: a) => Type<f, [b, _0]> = F => ff => x =>
	mapFlipped(F)(ff)(f => f(x));
