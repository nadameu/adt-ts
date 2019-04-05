import { equals, Setoid } from '../classes/Setoid';
import * as fl from '../fantasy-land';
import { HKT } from '../HKT';
import { Keys, Type } from '../Types';

class MaybeBase<a> implements HKT<'Maybe', a> {
	'@@HKT': ['Maybe', a, never, never, never];
	get isNothing(this: Maybe<a>) {
		return !this.isJust;
	}

	[fl.equals]<S extends Keys, a = never, b = never, c = never, d = never>(
		this: Maybe<Type<S, a, b, c, d> & Setoid<S, a, b, c, d>>,
		that: Maybe<Type<S, a, b, c, d> & Setoid<S, a, b, c, d>>,
	): boolean {
		return this.isJust && that.isJust
			? equals(this.value as any)(that.value as any)
			: this.isJust === that.isJust;
	}
}
export interface Just<a> extends MaybeBase<a> {
	isJust: true;
	isNothing: false;
	value: a;
}
export const Just = <a>(value: a): Just<a> => {
	const just = new MaybeBase() as any;
	just.isJust = true;
	just.value = value;
	return just;
};
export interface Nothing<a = never> extends MaybeBase<a> {
	isJust: false;
	isNothing: true;
}
export const Nothing: Nothing = Object.assign(new MaybeBase() as any, { isJust: false });
export type Maybe<a> = Just<a> | Nothing<a>;

declare module '../Types' {
	export interface Types<a, b, c, d> {
		Maybe: Maybe<a>;
	}
}
