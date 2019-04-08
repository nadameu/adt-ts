import { fn } from '../combinators';
import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';
import { Functor } from './Functor';

export interface Apply<fa extends Apply<fa, a>, a> extends Functor<fa, a> {
	[fl.ap]<b>(this: fa, that: Apply<any, fn<a, b>>): Derive<fa, b>;
}

type Derive<fa extends Apply<fa, any>, b> = {} & {
	[key in Keys]: fa extends Type<key, infer w, infer x, infer y, any>
		? Type<key, w, x, y, b>
		: never
}[Keys];
type Param<fa extends Apply<fa, any>> = fa extends Apply<fa, infer a> ? a : never;
type ParamType<T extends fn<any, any>> = T extends fn<infer U, any> ? U : any;

export const ap = <f extends Param<ff>, ff extends Apply<ff, fn<any, any>>>(ff: ff) => (
	fa: Derive<ff, ParamType<f>>,
) => (fa as Apply<any, ParamType<f>>)[fl.ap](ff) as Derive<ff, ReturnType<f>>;

export const apFlipped = <a extends Param<fa>, fa extends Apply<fa, any>>(fa: fa) => <b>(
	ff: Derive<fa, fn<a, b>>,
) => fa[fl.ap](ff as Apply<any, fn<a, b>>) as Derive<fa, b>;
