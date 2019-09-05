import { Applicative1 } from '../typeclasses/Applicative';
import { Apply1 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Foldable1 } from '../typeclasses/Foldable';
import { Functor1 } from '../typeclasses/Functor';
import { Monad1 } from '../typeclasses/Monad';
import { Monoid1 } from '../typeclasses/Monoid';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { append, apply, bind, foldl, foldMap, foldr, map, mempty, pure } from './functions';
import { TLazyList } from './internal';
import { Eq } from '../typeclasses/Eq';
import { LazyList } from './definitions';

export const makeEqLazyList = <a>(eq: Eq<a>) =>
  ({
    eq: xs => ys => {
      let resultX = xs();
      let resultY = ys();
      while (resultX.isCons && resultY.isCons) {
        if (!eq.eq(resultX.head)(resultY.head)) return false;
        resultX = resultX.tail();
        resultY = resultY.tail();
      }
      return resultX.isCons === resultY.isCons;
    },
  } as Eq<LazyList<a>>);

export const functorLazyList = { map } as Functor1<TLazyList>;
export const applyLazyList = { apply, map } as Apply1<TLazyList>;
export const bindLazyList = { apply, bind, map } as Bind1<TLazyList>;
export const applicativeLazyList = { apply, map, pure } as Applicative1<TLazyList>;
export const monadLazyList = { apply, bind, map, pure } as Monad1<TLazyList>;

export const semigroupLazyList = { append } as Semigroup1<TLazyList>;
export const monoidLazyList = { append, mempty } as Monoid1<TLazyList>;

export const foldableLazyList = { foldMap, foldl, foldr } as Foldable1<TLazyList>;
