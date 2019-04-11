import { Applicative } from '../classes/Applicative';
import { Apply } from '../classes/Apply';
import { Bind } from '../classes/Bind';
import { Functor } from '../classes/Functor';
import { Placeholder as _ } from '../Types';

export type Maybe<a> = Just<a> | Nothing<a>;

export interface Just<a> {
	isNothing: false;
	value: a;
}
export const Just: <a>(value: a) => Just<a> = value => ({
	isNothing: false,
	value,
});

export interface Nothing<a = never> {
	isNothing: true;
}
export const Nothing: Nothing = { isNothing: true } as any;

export const bind: <a>(fa: Maybe<a>) => <b>(f: (_: a) => Maybe<b>) => Maybe<b> = fa => f =>
	fa.isNothing ? fa : f(fa.value);
export const pure: <a>(value: a) => Maybe<a> = Just;

export const map: <a, b>(f: (_: a) => b) => (fa: Maybe<a>) => Maybe<b> = f => fa =>
	fa.isNothing ? fa : Just(f(fa.value));
export const apFlipped: <a>(fa: Maybe<a>) => <b>(ff: Maybe<(_: a) => b>) => Maybe<b> = fa => ff =>
	fa.isNothing || ff.isNothing ? Nothing : Just(ff.value(fa.value));
export const ap: <a, b>(ff: Maybe<(_: a) => b>) => (fa: Maybe<a>) => Maybe<b> = ff => fa =>
	ff.isNothing || fa.isNothing ? Nothing : Just(ff.value(fa.value));
export const functorMaybe: Functor<Maybe<_>> = { map };
export const applyMaybe: Apply<Maybe<_>> = { map, ap };
export const applicativeMaybe: Applicative<Maybe<_>> = { map, ap, pure };
export const bindMaybe: Bind<Maybe<_>> = { map, ap, bind };

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Maybe: Maybe<z>;
	}
}
