import {
  Eq,
  Monoid_1,
  Semigroup_1,
  makeAltInstance,
  makeAlternativeInstance,
  makeApplicativeInstance,
  makeApplyInstance,
  makeBindInstance,
  makeFoldableInstance,
  makeFunctorInstance,
  makeMonadInstance,
  makePlusInstance,
  makeTraversableInstance,
} from '../typeclasses';
import { CatQueue } from './definitions';
import {
  alt,
  append,
  apply,
  bind,
  empty,
  foldMap,
  foldl,
  foldr,
  map,
  mempty,
  pure,
  sequence,
  traverse,
  uncons,
} from './functions';
import { TCatQueue } from './internal';

export const makeEqCatQueue = <a>(eqA: Eq<a>) =>
  ({
    eq: xs => ys => {
      let [l, r] = [uncons(xs), uncons(ys)];
      while (true) {
        if (l.isJust && r.isJust) {
          const [[lh, lt], [rh, rt]] = [l.value, r.value];
          if (!eqA.eq(lh)(rh)) return false;
          l = uncons(lt);
          r = uncons(rt);
        } else if (l.isNothing && r.isNothing) return true;
        else return false;
      }
    },
  }) as Eq<CatQueue<a>>;
export const semigroupCatQueue = /* @__PURE__ */ { append } as Semigroup_1<TCatQueue>;
export const monoidCatQueue = /* @__PURE__ */ {
  ...semigroupCatQueue,
  mempty,
} as Monoid_1<TCatQueue>;
export const foldableCatQueue = /* @__PURE__ */ makeFoldableInstance<TCatQueue>({
  foldl,
  foldMap,
  foldr,
});
export const traversableCatQueue = /* @__PURE__ */ makeTraversableInstance<TCatQueue>({
  foldl,
  foldMap,
  foldr,
  map,
  sequence,
  traverse,
});
export const functorCatQueue = /* @__PURE__ */ makeFunctorInstance<TCatQueue>({ map });
export const applyCatQueue = /* @__PURE__ */ makeApplyInstance<TCatQueue>({ apply, map });
export const applicativeCatQueue = /* @__PURE__ */ makeApplicativeInstance<TCatQueue>({
  apply,
  map,
  pure,
});
export const bindCatQueue = /* @__PURE__ */ makeBindInstance<TCatQueue>({ apply, bind, map });
export const monadCatQueue = /* @__PURE__ */ makeMonadInstance<TCatQueue>({
  apply,
  bind,
  map,
  pure,
});
export const altCatQueue = /* @__PURE__ */ makeAltInstance<TCatQueue>({ alt, map });
export const plusCatQueue = /* @__PURE__ */ makePlusInstance<TCatQueue>({ alt, empty, map });
export const alternativeCatQueue = /* @__PURE__ */ makeAlternativeInstance<TCatQueue>({
  alt,
  apply,
  empty,
  map,
  pure,
});
