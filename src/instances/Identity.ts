import { Functor } from '../classes/Functor';
import { Placeholder as _ } from '../Types';
import { Apply } from '../classes/Apply';
import { Applicative } from '../classes/Applicative';
import { apply, identity, thrush } from '../combinators';
import { Bind } from '../classes/Bind';
import { Monad } from '../classes/Monad';

export const map: Functor<_>['map'] = apply;
export const functorIdentity: Functor<_> = { map };

export const ap: Apply<_>['ap'] = apply;
export const applyIdentity: Apply<_> = { map, ap };

export const pure: Applicative<_>['pure'] = identity;
export const applicativeIdentity: Applicative<_> = { map, ap, pure };

export const bind: Bind<_>['bind'] = thrush;
export const bindIdentity: Bind<_> = { map, ap, bind };

export const monadIdentity: Monad<_> = { map, ap, pure, bind };

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Identity: z;
	}
}
