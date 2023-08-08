import { Generic1, Type1 } from '../Generic';
import { applyDefault, BindMapOnly_1, makeBindInstance } from '../typeclasses/Bind';
import { Eq, makeEqInstance } from '../typeclasses/Eq';
import { Functor_1, makeFunctorInstance } from '../typeclasses/Functor';
import { makeMonadInstance } from '../typeclasses/Monad';
import { Free, Join, Pure } from './definitions';
import { TFree } from './internal';

export const makeEqFree = <f extends Generic1, a>(
  eqA: Eq<a>,
  makeEqF: <b>(eqB: Eq<b>) => Eq<Type1<f, b>>
): Eq<Free<f, a>> => {
  const eqFree: Eq<Free<f, a>> = makeEqInstance({
    eq: x => y =>
      x.isPure
        ? y.isPure
          ? eqA.eq(x.value)(y.value)
          : false
        : y.isPure
        ? false
        : eqF.eq(x.inner)(y.inner),
  });
  const eqF = makeEqF(eqFree);
  return eqFree;
};

export const makeFunctorFree = <f extends Generic1>(F: Functor_1<f>) => {
  const functorFree: Functor_1<TFree<f>> = makeFunctorInstance<TFree<f>>({
    map: f => fx => (fx.isPure ? Pure(f(fx.value)) : Join(F.map(functorFree.map(f))(fx.inner))),
  });
  return functorFree;
};

export const makeBindFree = <f extends Generic1>(F: Functor_1<f>) => {
  const bindMapFree: BindMapOnly_1<TFree<f>> = {
    ...makeFunctorFree(F),
    bind: f => fx => (fx.isPure ? f(fx.value) : Join(F.map(bindMapFree.bind(f))(fx.inner))),
  };
  return makeBindInstance<TFree<f>>({ ...bindMapFree, apply: applyDefault(bindMapFree) });
};

export const makeMonadFree = <f extends Generic1>(F: Functor_1<f>) =>
  makeMonadInstance<TFree<f>>({ ...makeBindFree(F), pure: Pure });
