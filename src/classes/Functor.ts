import { fn, K, T } from '../combinators';
import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';

export interface Functor<fa extends Functor<fa, a>, a> {
	[fl.map]<b>(this: fa, f: (_: a) => b): Derive<fa, b>;
}

type Derive<fa extends Functor<fa, any>, b> = {} & {
	[key in Keys]: fa extends Type<key, infer w, infer x, infer y, any>
		? Type<key, w, x, y, b>
		: never
}[Keys];
type Param<fa extends Functor<fa, any>> = fa extends Functor<fa, infer a> ? a : never;

export const map = <a, b>(f: (_: a) => b) => <fa extends Functor<fa, a>>(fa: fa) => fa[fl.map](f);

export const mapFlipped = <fa extends Functor<fa, any>>(fa: fa) => <b>(f: (_: Param<fa>) => b) =>
	fa[fl.map](f);

export const voidLeft = <fa extends Functor<fa, any>>(fa: fa) => <b>(y: b) => fa[fl.map](K(y));

export const voidRight = <a>(x: a) => <fb extends Functor<fb, any>>(fb: fb) => fb[fl.map](K(x));

const _void = <fa extends Functor<fa, any>>(fa: fa) => fa[fl.map](() => {});
export { _void as void };

type ParamType<T extends fn<any, any>> = T extends fn<infer U, any> ? U : any;
export const flap = <f extends Param<ff>, ff extends Functor<ff, fn<any, any>>>(ff: ff) => (
	x: ParamType<f>,
) => ff[fl.map](T(x)) as Derive<ff, ReturnType<f>>;
