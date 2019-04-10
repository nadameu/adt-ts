import { constant, flip, fn, identity, pipe_, thrush } from '../combinators';
import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';

export interface Functor<a> {
	[fl.map]<b>(f: (_: a) => b): Functor<b>;
}

type Derive<fa, b> = {} & {
	[key in Keys]: fa extends Type<key, infer w, infer x, infer y, any>
		? Extract<Type<key, w, x, y, b>, Functor<b>>
		: never
}[Keys];
type Accept<fa, a> = fa & Functor<a>;

export const mapFlipped = <a, fa>(fa: Accept<fa, a>) => <b>(f: (_: a) => b) =>
	fa[fl.map](f) as Derive<fa, b>;

export const map: <a, b>(f: (_: a) => b) => <fa>(fa: Accept<fa, a>) => Derive<fa, b> = flip(
	mapFlipped,
);

export const voidRight: <a>(x: a) => <b, fb>(fb: Accept<fb, b>) => Derive<fb, a> = pipe_(
	constant,
	map,
);

export const voidLeft: <a, fa>(fa: Accept<fa, a>) => <b>(y: b) => Derive<fa, b> = flip(
	pipe_(constant(identity), map),
);

const _void: <a, fa>(fa: Accept<fa, a>) => Derive<fa, void> = map(() => {});
export { _void as void };

export const flap: <a, b, ff>(ff: Accept<ff, fn<a, b>>) => (x: a) => Derive<ff, b> = flip(
	pipe_(thrush, map),
);
