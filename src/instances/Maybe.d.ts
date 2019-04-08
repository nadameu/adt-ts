import { Semigroup } from '../classes/Semigroup';
import { Setoid } from '../classes/Setoid';
import { fn } from '../combinators';
import * as fl from '../fantasy-land';

interface MaybeBase<a> {
	[fl.ap]<b>(that: Maybe<fn<a, b>>): Maybe<b>;
	[fl.concat]<b extends Semigroup<b>>(this: Maybe<b>, that: Maybe<b>): Maybe<b>;
	[fl.equals]<b extends Setoid<b>>(this: Maybe<b>, that: Maybe<b>): boolean;
	[fl.map]<b>(f: (_: a) => b): Maybe<b>;
}
interface MaybeConstructor {
	prototype: Maybe<any>;
	[fl.empty]<a extends Semigroup<a> = never>(): Maybe<a>;
}
export const Maybe: MaybeConstructor;
interface Just<a> extends MaybeBase<a> {
	isJust: true;
	isNothing: false;
	value: a;
}
export const Just: <a>(value: a) => Maybe<a>;
export interface Nothing<a = never> extends MaybeBase<a> {
	isJust: false;
	isNothing: true;
}
export const Nothing: Maybe<never>;
export type Maybe<a> = Just<a> | Nothing<a>;

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Maybe: Maybe<z>;
	}
}
