import { fn, K, Ki, fn2, T } from '../combinators';
import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';
import { Functor, map, mapFlipped } from './Functor';
import { Just, Maybe } from '../instances/Maybe';
import { Either, Right, Left } from '../instances/Either';

export interface Apply<fa extends Apply<fa, a>, a> extends Functor<fa, a> {
	[fl.ap]<b>(this: fa, that: Apply<any, fn<a, b>>): Derive<fa, b>;
}

type Derive<fa extends Apply<fa, any>, b> = {} & {
	[key in Keys]: fa extends Type<key, infer w, infer x, infer y, any>
		? Type<key, w, x, y, b>
		: never
}[Keys];
type DeriveInput<fa extends Apply<fa, any>, b> = Extract<Derive<fa, b>, Apply<any, b>>;
type Param<fa extends Apply<fa, any>> = fa extends Apply<fa, infer a> ? a : never;
type ParamType<T extends fn<any, any>> = T extends fn<infer U, any> ? U : any;

export const ap = <
	a extends ParamType<Param<ff>>,
	b extends ReturnType<Param<ff>>,
	ff extends Apply<ff, fn<any, any>>
>(
	ff: ff,
) => (fa: DeriveInput<ff, a>) => (fa as Apply<any, a>)[fl.ap](ff) as Derive<ff, b>;

export const apFlipped = <a extends Param<fa>, fa extends Apply<fa, any>>(fa: fa) => <b>(
	ff: DeriveInput<fa, fn<a, b>>,
) => fa[fl.ap](ff);

export const applyFirst = <a extends Param<fa>, fa extends Apply<fa, any>>(fa: fa) =>
	ap(map(K)(fa) as Apply<fa, fn<any, a>>) as <b>(fb: DeriveInput<fa, b>) => fa;

export const applySecond = <a extends Param<fa>, fa extends Apply<fa, any>>(fa: fa) =>
	ap(map(Ki)(fa) as Apply<fa, <b>(_: b) => b>) as <b>(fb: DeriveInput<fa, b>) => Derive<fa, b>;

// export const lift2 = <a, b, c>(f: fn2<a, b, c>) => <fa extends Apply<fa, a>>(fa: fa) => (
// 	fb: Derive<fa, b>,
// ) => ap(map(f)(fa) as Apply<any, fn<b, c>>)(fb as Apply<any, b>);
