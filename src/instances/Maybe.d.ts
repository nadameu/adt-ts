import { Semigroup } from '../classes/Semigroup';
import { Setoid } from '../classes/Setoid';
import * as fl from '../fantasy-land';
import { HKT } from '../HKT';
import { Keys, Type } from '../Types';

interface MaybeBase<a> extends HKT<'Maybe', a> {
	[fl.concat]<S extends Keys, a = never, b = never, c = never, d = never>(
		this: Maybe<Type<S, a, b, c, d> & Semigroup<S, a, b, c, d>>,
		that: Maybe<Type<S, a, b, c, d> & Semigroup<S, a, b, c, d>>,
	): Maybe<Type<S, a, b, c, d> & Semigroup<S, a, b, c, d>>;
	[fl.equals]<S extends Keys, a = never, b = never, c = never, d = never>(
		this: Maybe<Type<S, a, b, c, d> & Setoid<S, a, b, c, d>>,
		that: Maybe<Type<S, a, b, c, d> & Setoid<S, a, b, c, d>>,
	): boolean;
}
interface MaybeConstructor {
	prototype: Maybe<any>;
	[fl.empty](): Maybe<never>;
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
	export interface Types<a, b, c, d> {
		Maybe: Maybe<a>;
	}
}
