import { B1, B2, constant, flip, fn, fn2, fn3, identity } from '../combinators';
import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';
import { Functor, map } from './Functor';

export interface Apply<fa extends Apply<any, a>, a> extends Functor<fa, a> {
	[fl.ap]<b>(this: fa, that: Apply<any, fn<a, b>>): DeriveType<fa, b>;
}

type DeriveType<fa extends Apply<any, any>, b> = {} & {
	[key in Keys]: fa extends Type<key, infer w, infer x, infer y, any>
		? Type<key, w, x, y, b>
		: never
}[Keys];
type Derive<fa extends Apply<any, any>, b> = {} & Extract<DeriveType<fa, b>, Apply<any, b>>;
type Param<fa extends Apply<any, any>> = fa extends Apply<any, infer a> ? a : never;
type ParamType<T extends fn<any, any>> = T extends fn<infer U, any> ? U : any;

export const apFlipped = <a extends Param<fa>, fa extends Apply<any, any>>(fa: fa) => <b>(
	ff: Derive<fa, fn<a, b>>,
) => fa[fl.ap](ff) as Derive<fa, b>;

export const ap: <
	a extends ParamType<Param<ff>>,
	b extends ReturnType<Param<ff>>,
	ff extends Apply<any, fn<any, any>>
>(
	ff: ff,
) => (fa: Derive<ff, a>) => Derive<ff, b> = flip(apFlipped) as any;

export const applyFirst = <a extends Param<fa>, fa extends Apply<any, any>>(fa: fa) =>
	ap(map(constant)(fa) as Derive<fa, <b>(_: b) => a>) as <b>(fb: Derive<fa, b>) => fa;

export const applySecond = <fa extends Apply<any, any>>(fa: fa) =>
	ap(map(constant(identity))(fa) as Derive<fa, <b>(_: b) => b>) as <b>(
		fb: Derive<fa, b>,
	) => Derive<fa, b>;

export const lift1: <a, b>(
	f: fn<a, b>,
) => <fa extends Apply<any, a>>(fa: fa) => Derive<fa, b> = map as any;

export const lift2: <a, b, c>(
	f: fn2<a, b, c>,
) => <fa extends Apply<any, a>>(fa: fa) => (fb: Derive<fa, b>) => Derive<fa, c> = B1(ap as fn<
	any,
	any
>)(lift1);

export const lift3: <a, b, c, d>(
	f: fn3<a, b, c, d>,
) => <fa extends Apply<any, a>>(
	fa: fa,
) => (fb: Derive<fa, b>) => (fc: Derive<fa, c>) => Derive<fa, d> = B2(ap as fn<any, any>)(
	lift2,
) as any;
