import { tailRec } from '../helpers';
import { identity } from '../helpers/identity';
import { makeApplicative } from '../typeclasses/Applicative';
import { makeApply } from '../typeclasses/Apply';
import { makeBind } from '../typeclasses/Bind';
import { makeFunctor } from '../typeclasses/Functor';
import { makeMonad } from '../typeclasses/Monad';
import { makeMonadRec } from '../typeclasses/MonadRec';
import { TIdentity } from './internal';

export const functorIdentity = makeFunctor<TIdentity>({ map: identity });
export const applyIdentity = makeApply<TIdentity>({ map: identity, apply: identity });

export const applicativeIdentity = makeApplicative<TIdentity>({
  apply: identity,
  map: identity,
  pure: identity,
});
export const bindIdentity = makeBind<TIdentity>({ apply: identity, bind: identity, map: identity });
export const monadIdentity = makeMonad<TIdentity>({
  apply: identity,
  bind: identity,
  map: identity,
  pure: identity,
});
export const monadRecIdentity = makeMonadRec<TIdentity>({
  apply: identity,
  bind: identity,
  map: identity,
  pure: identity,
  tailRecM: tailRec,
});
