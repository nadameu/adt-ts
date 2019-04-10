import { compose, constant, flip, identity, thrush } from '../combinators';
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

export const map: {
	<a, b>(f: (_: a) => b): <fa>(fa: Accept<fa, a>) => Derive<fa, b>;
} = (f: any) => (fa: any): any => fa[fl.map](f);

export const voidRight: {
	<a>(x: a): <fb>(fb: Accept<fb, any>) => Derive<fb, a>;
} = compose(map)(constant) as any;

export const voidLeft: {
	<fa>(fa: Accept<fa, any>): <b>(y: b) => Derive<fa, b>;
} = flip(compose(map)(constant(identity)));

const _void: {
	<fa>(fa: Accept<fa, any>): Derive<fa, void>;
} = map(constant(undefined));
export { _void as void };

export const flap: {
	<a, b, ff>(ff: Accept<ff, (_: a) => b>): (x: a) => Derive<ff, b>;
} = flip(compose(map)(thrush)) as any;
