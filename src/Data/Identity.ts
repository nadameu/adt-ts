import { Applicative } from '../Control/Applicative';
import { Apply } from '../Control/Apply';
import { Bind } from '../Control/Bind';
import { Monad } from '../Control/Monad';
import { Generic1 } from '../Generic';
import { Functor } from './Functor';

declare const IdentitySymbol: unique symbol;
export type Identity<a> = a & { [IdentitySymbol]: 'Identity' };
export const Identity = <a>(x: a) => x as Identity<a>;
export interface GenericIdentity extends Generic1 {
	type: Identity<this['a']>;
}

export const map = <a, b>(f: (_: a) => b) => (fa: Identity<a>): Identity<b> => f(fa) as Identity<b>;
export const functorIdentity: Functor<GenericIdentity> = { map };

export const apply = <a, b>(ff: Identity<(_: a) => b>) => (fa: Identity<a>): Identity<b> =>
	ff(fa) as Identity<b>;
export const applyIdentity: Apply<GenericIdentity> = { ...functorIdentity, apply };

export const pure = Identity;
export const applicativeIdentity: Applicative<GenericIdentity> = { ...applyIdentity, pure };

export const bind = <a>(ma: Identity<a>) => <b>(f: (_: a) => Identity<b>): Identity<b> => f(ma);
export const bindIdentity: Bind<GenericIdentity> = { ...applyIdentity, bind };

export const monadIdentity: Monad<GenericIdentity> = { ...applicativeIdentity, ...bindIdentity };
