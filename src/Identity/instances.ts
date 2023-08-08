import { tailRec } from '../helpers';
import { identity } from '../helpers/identity';
import { makeApplicativeInstance } from '../typeclasses/Applicative';
import { makeApplyInstance } from '../typeclasses/Apply';
import { makeBindInstance } from '../typeclasses/Bind';
import { makeFunctorInstance } from '../typeclasses/Functor';
import { makeMonadInstance } from '../typeclasses/Monad';
import { makeMonadRecInstance } from '../typeclasses/MonadRec';
import { TIdentity } from './internal';

export const functorIdentity = makeFunctorInstance<TIdentity>({ map: identity });
export const applyIdentity = makeApplyInstance<TIdentity>({ map: identity, apply: identity });

export const applicativeIdentity = makeApplicativeInstance<TIdentity>({
  apply: identity,
  map: identity,
  pure: identity,
});
export const bindIdentity = makeBindInstance<TIdentity>({
  apply: identity,
  bind: identity,
  map: identity,
});
export const monadIdentity = makeMonadInstance<TIdentity>({
  apply: identity,
  bind: identity,
  map: identity,
  pure: identity,
});
export const monadRecIdentity = makeMonadRecInstance<TIdentity>({
  apply: identity,
  bind: identity,
  map: identity,
  pure: identity,
  tailRecM: tailRec,
});
