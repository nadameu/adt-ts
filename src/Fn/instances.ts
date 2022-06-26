import { Step, tailRec } from '../helpers';
import { Category_2, Semigroupoid_2 } from '../typeclasses';
import { makeApplicative } from '../typeclasses/Applicative';
import { makeApply } from '../typeclasses/Apply';
import { makeBind } from '../typeclasses/Bind';
import { makeFunctor } from '../typeclasses/Functor';
import { makeMonad } from '../typeclasses/Monad';
import { makeMonadRec } from '../typeclasses/MonadRec';
import { apply, bind, compose, identity, map, pure } from './functions/original';
import { TFn, TFn_ } from './internal';

export const semigroupoidFn = { compose } as Semigroupoid_2<TFn>;
export const categoryFn = { compose, identity } as Category_2<TFn>;

export const functorFn = makeFunctor<TFn_>({ map });
export const applyFn = makeApply<TFn_>({ apply, map });
export const bindFn = makeBind<TFn_>({ apply, bind, map });
export const applicativeFn = makeApplicative<TFn_>({ apply, map, pure });
export const monadFn = makeMonad<TFn_>({ apply, bind, map, pure });
export const monadRecFn = makeMonadRec<TFn_>({
  apply,
  bind,
  map,
  pure,
  tailRecM:
    <a, b, c>(f: (_: b) => (_: a) => Step<b, c>) =>
    (z: b) =>
    (e: a): c =>
      tailRec((a: b) => f(a)(e))(z),
});
