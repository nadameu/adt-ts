import { Functor_1 } from '../typeclasses/Functor';
import { TIdentity } from './internal';
import { Apply_1 } from '../typeclasses/Apply';
import { Applicative_1 } from '../typeclasses/Applicative';
import { Bind_1 } from '../typeclasses/Bind';
import { Monad_1 } from '../typeclasses/Monad';

const map = <a, b>(f: (_: a) => b) => (a: a) => f(a);
const pure = <a>(a: a) => a;

export const functorIdentity = { map } as Functor_1<TIdentity>;
export const applyIdentity = { apply: map, map } as Apply_1<TIdentity>;
export const applicativeIdentity = { apply: map, map, pure } as Applicative_1<TIdentity>;
export const bindIdentity = { apply: map, bind: map, map } as Bind_1<TIdentity>;
export const monadIdentity = { apply: map, bind: map, map, pure } as Monad_1<TIdentity>;
