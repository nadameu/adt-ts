import { makeAlt } from '../typeclasses/Alt';
import { makeAlternative } from '../typeclasses/Alternative';
import { makeApplicative } from '../typeclasses/Applicative';
import { makeApply } from '../typeclasses/Apply';
import { makeBind } from '../typeclasses/Bind';
import { Eq, makeEq } from '../typeclasses/Eq';
import { makeFoldable } from '../typeclasses/Foldable';
import { makeFunctor } from '../typeclasses/Functor';
import { makeMonad } from '../typeclasses/Monad';
import { makeMonoid } from '../typeclasses/Monoid';
import { makePlus } from '../typeclasses/Plus';
import { makeSemigroup } from '../typeclasses/Semigroup';
import { makeTraversable } from '../typeclasses/Traversable';
import { CatQueue } from './definitions';
import {
  append,
  foldl,
  foldMap,
  foldr,
  map,
  mempty,
  sequence,
  apply,
  alt,
  bind,
  cons,
  empty,
  pure,
  traverse,
  uncons,
} from './functions';
import { TCatQueue } from './internal';

export const makeEqCatQueue = <a>(eqA: Eq<a>) =>
  makeEq<CatQueue<a>>({
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
  });
export const semigroupCatQueue = makeSemigroup<TCatQueue>({ append });
export const monoidCatQueue = makeMonoid<TCatQueue>({ ...semigroupCatQueue, mempty });
export const foldableCatQueue = makeFoldable<TCatQueue>({ foldl, foldMap, foldr });
export const traversableCatQueue = makeTraversable<TCatQueue>({
  foldl,
  foldMap,
  foldr,
  map,
  sequence,
  traverse,
});
export const functorCatQueue = makeFunctor<TCatQueue>({ map });
export const applyCatQueue = makeApply<TCatQueue>({ apply, map });
export const applicativeCatQueue = makeApplicative<TCatQueue>({ apply, map, pure });
export const bindCatQueue = makeBind<TCatQueue>({ apply, bind, map });
export const monadCatQueue = makeMonad<TCatQueue>({ apply, bind, map, pure });
export const altCatQueue = makeAlt<TCatQueue>({ alt, map });
export const plusCatQueue = makePlus<TCatQueue>({ alt, empty, map });
export const alternativeCatQueue = makeAlternative<TCatQueue>({ alt, apply, empty, map, pure });
