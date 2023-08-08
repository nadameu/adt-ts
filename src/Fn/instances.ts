import { Step, tailRec } from '../helpers';
import { Category_2, Semigroupoid_2 } from '../typeclasses';
import { makeApplicativeInstance } from '../typeclasses/Applicative';
import { makeApplyInstance } from '../typeclasses/Apply';
import { makeBindInstance } from '../typeclasses/Bind';
import { makeFunctorInstance } from '../typeclasses/Functor';
import { makeMonadInstance } from '../typeclasses/Monad';
import { makeMonadRecInstance } from '../typeclasses/MonadRec';
import { apply, bind, compose, identity, map, pure } from './functions/original';
import { TFn, TFn_ } from './internal';

export const semigroupoidFn = { compose } as Semigroupoid_2<TFn>;
export const categoryFn = { compose, identity } as Category_2<TFn>;

export const functorFn = makeFunctorInstance<TFn_>({ map });
export const applyFn = makeApplyInstance<TFn_>({ apply, map });
export const bindFn = makeBindInstance<TFn_>({ apply, bind, map });
export const applicativeFn = makeApplicativeInstance<TFn_>({ apply, map, pure });
export const monadFn = makeMonadInstance<TFn_>({ apply, bind, map, pure });
export const monadRecFn = makeMonadRecInstance<TFn_>({
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
