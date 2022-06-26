import { TransformResultWithSource } from 'vitest';
import { Generic1 } from '../Generic';
import { pipeValue } from '../helpers';
import { applyDefault, BindMapOnly_1, Bind_1, makeBind } from '../typeclasses/Bind';
import { Functor_1, makeFunctor } from '../typeclasses/Functor';
import { makeMonad, Monad_1 } from '../typeclasses/Monad';
import { Join, Pure } from './definitions';
import { TFree } from './internal';

export const makeFunctorFree = <f extends Generic1>(F: Functor_1<f>) => {
  const functorFree: Functor_1<TFree<f>> = makeFunctor<TFree<f>>({
    map: f => fx => fx.isPure ? Pure(f(fx.value)) : Join(F.map(functorFree.map(f))(fx.inner)),
  });
  return functorFree;
};

export const makeBindFree = <f extends Generic1>(F: Functor_1<f>) => {
  const bindMapFree: BindMapOnly_1<TFree<f>> = {
    ...makeFunctorFree(F),
    bind: f => fx =>
      fx.isPure ? f(fx.value) : Join(F.map(bindMapFree.map(bindMapFree.bind(f)))(fx.inner)),
  };
  return makeBind<TFree<f>>({ ...bindMapFree, apply: applyDefault(bindMapFree) });
};

export const makeMonadFree = <f extends Generic1>(F: Functor_1<f>) =>
  makeMonad<TFree<f>>({ ...makeBindFree(F), pure: Pure });
