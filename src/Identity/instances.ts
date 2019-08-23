import { Functor1 } from '../typeclasses/Functor';
import { TIdentity } from './internal';
import { Apply1 } from '../typeclasses/Apply';
import { Applicative1 } from '../typeclasses/Applicative';
import { Bind1 } from '../typeclasses/Bind';
import { Monad1 } from '../typeclasses/Monad';

const map = <a, b>(f: (_: a) => b) => (a: a) => f(a);
const pure = <a>(a: a) => a;

export const functorIdentity = { map } as Functor1<TIdentity>;
export const applyIdentity = { apply: map, map } as Apply1<TIdentity>;
export const applicativeIdentity = { apply: map, map, pure } as Applicative1<TIdentity>;
export const bindIdentity = { apply: map, bind: map, map } as Bind1<TIdentity>;
export const monadIdentity = { apply: map, bind: map, map, pure } as Monad1<TIdentity>;
