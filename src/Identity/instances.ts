import { identity } from '../helpers/identity';
import { Applicative_1, Apply_1, Bind_1, Functor_1, Monad_1 } from '../typeclasses';
import { TIdentity } from './internal';

export const functorIdentity = { map: identity } as Functor_1<TIdentity>;
export const applyIdentity = { apply: identity, map: identity } as Apply_1<TIdentity>;
export const applicativeIdentity = {
  apply: identity,
  map: identity,
  pure: identity,
} as Applicative_1<TIdentity>;
export const bindIdentity = { apply: identity, bind: identity, map: identity } as Bind_1<TIdentity>;
export const monadIdentity = {
  apply: identity,
  bind: identity,
  map: identity,
  pure: identity,
} as Monad_1<TIdentity>;
