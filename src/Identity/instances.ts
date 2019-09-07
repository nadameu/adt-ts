import { Applicative_1, Apply_1, Bind_1, Functor_1, Monad_1 } from '../typeclasses';
import { TIdentity } from './internal';

const map = <a, b>(f: (_: a) => b) => (a: a) => f(a);
const pure = <a>(a: a) => a;

export const functorIdentity = { map } as Functor_1<TIdentity>;
export const applyIdentity = { apply: map, map } as Apply_1<TIdentity>;
export const applicativeIdentity = { apply: map, map, pure } as Applicative_1<TIdentity>;
export const bindIdentity = { apply: map, bind: map, map } as Bind_1<TIdentity>;
export const monadIdentity = { apply: map, bind: map, map, pure } as Monad_1<TIdentity>;
