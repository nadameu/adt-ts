import { Applicative1 } from '../typeclasses/Applicative';
import { Bind1, applyDefault, BindMap1 } from '../typeclasses/Bind';
import { Foldable1, foldMapDefaultR } from '../typeclasses/Foldable';
import { Functor1 } from '../typeclasses/Functor';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { LazyCons, LazyList, LazyNil } from './definitions';
import { TLazyList } from './internal';
import { Monoid1 } from '../typeclasses/Monoid';

export const foldr: Foldable1<TLazyList>['foldr'] = <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (
  fa: LazyList<a>
): b => (result => (result.isNil ? b : f(result.head)(foldr(f)(b)(result.tail))))(fa());

export const foldl: Foldable1<TLazyList>['foldl'] = <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (
  fa: LazyList<a>
): b => (result => (result.isNil ? b : foldl(f)(f(b)(result.head))(result.tail)))(fa());

export const foldMap = foldMapDefaultR({ foldr } as Foldable1<TLazyList>);

export const append: Semigroup1<TLazyList>['append'] = <a>(xs: LazyList<a>) => (
  ys: LazyList<a>
): LazyList<a> => () => foldr<a, LazyList<a>>(LazyCons)(ys)(xs)();

export const bind: Bind1<TLazyList>['bind'] = <a, b>(f: (_: a) => LazyList<b>) => (
  fa: LazyList<a>
): LazyList<b> => () => foldr<a, LazyList<b>>(x => append(f(x)))(LazyNil)(fa)();

export const map: Functor1<TLazyList>['map'] = <a, b>(f: (_: a) => b) => (
  xs: LazyList<a>
): LazyList<b> => () => foldr<a, LazyList<b>>(x => LazyCons(f(x)))(LazyNil)(xs)();

export const apply = applyDefault({ bind, map } as BindMap1<TLazyList>);

export const pure: Applicative1<TLazyList>['pure'] = <a>(a: a) => LazyCons(a)(LazyNil);

export const mempty: Monoid1<TLazyList>['mempty'] = () => LazyNil;
