import { compose, constant, flip, fn, thrush } from '../combinators';
import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';

export interface Functor<fa extends Functor<any, a>, a> {
	[fl.map]<b>(this: fa, f: (_: a) => b): DeriveType<fa, b>;
}

type DeriveType<fa extends Functor<any, any>, b> = {} & {
	[key in Keys]: fa extends Type<key, infer w, infer x, infer y, any>
		? Type<key, w, x, y, b>
		: never
}[Keys];
type Derive<fa extends Functor<any, any>, b> = {} & Extract<DeriveType<fa, b>, Functor<any, b>>;
type Param<fa extends Functor<any, any>> = fa extends Functor<any, infer a> ? a : never;
type ParamType<T extends fn<any, any>> = T extends fn<infer U, any> ? U : any;

export const map = <a, b>(f: (_: a) => b) => <fa extends Functor<any, a>>(fa: fa) =>
	fa[fl.map](f) as Derive<fa, b>;

export const mapFlipped: <fa extends Functor<any, any>>(
	fa: fa,
) => <b>(f: (_: Param<fa>) => b) => Derive<fa, b> = flip(map);

export const voidLeft = <fa extends Functor<any, any>>(
	fa: fa,
): (<b>(y: b) => Derive<fa, Param<fa>>) => compose<any, any>(mapFlipped(fa))(constant);

export const voidRight = <a>(x: a): (<fb extends Functor<any, any>>(fb: fb) => Derive<fb, a>) =>
	map(constant(x));

const _void: <fa extends Functor<any, any>>(fa: fa) => Derive<fa, void> = map(() => {});
export { _void as void };

export const flap = <f extends Param<ff>, ff extends Functor<any, fn<any, any>>>(
	ff: ff,
): ((x: ParamType<f>) => Derive<ff, ReturnType<f>>) => compose<any, any>(mapFlipped(ff))(thrush);
