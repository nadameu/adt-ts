import { Applicative } from '../classes/Applicative';
import { Apply } from '../classes/Apply';
import { Bind } from '../classes/Bind';
import { Functor } from '../classes/Functor';
import { ap, liftM1, Monad } from '../classes/Monad';
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
export const Nothing: Nothing = { isNothing: true };

export const bind: Bind<Maybe<_>>['bind'] = fa => f => (fa.isNothing ? fa : f(fa.value));
export const pure: Applicative<Maybe<_>>['pure'] = Just;

export const map = liftM1<Maybe<_>>({ bind, pure });
export const apply = ap<Maybe<_>>({ bind, pure });

export const functorMaybe: Functor<Maybe<_>> = { map };
export const applyMaybe: Apply<Maybe<_>> = { map, apply };
export const applicativeMaybe: Applicative<Maybe<_>> = { map, apply, pure };
export const bindMaybe: Bind<Maybe<_>> = { map, apply, bind };
export const monadMaybe: Monad<Maybe<_>> = { map, apply, pure, bind };

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Maybe: Maybe<z>;
	}
}
