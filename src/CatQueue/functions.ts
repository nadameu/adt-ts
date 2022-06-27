import { lift2 } from '../derivations';
import { Anon, Generic1, Type1 } from '../Generic';
import { pipeValue, thrush } from '../helpers';
import { Cons, Nil } from '../List/definitions';
import * as L from '../List/functions';
import { Just, Maybe, Nothing } from '../Maybe/definitions';
import {
  ap,
  Applicative_1,
  Apply_1,
  BindPureOnly_1,
  Bind_1,
  Functor_1,
  GenericSnoc_1,
  Monoid_1,
  sequenceDefault,
  Traversable_1,
  traverseDefaultSnoc,
  TraverseOnly_1,
} from '../typeclasses';
import { makeApply } from '../typeclasses/Apply';
import {
  Foldable_1,
  FoldLOnly_1,
  foldMapDefaultL,
  FoldMapOnly_1,
  foldrDefault,
} from '../typeclasses/Foldable';
import { CatQueue } from './definitions';
import { monoidCatQueue } from './instances';
import { TCatQueue } from './internal';

export const empty = <a = never>(): CatQueue<a> => CatQueue<a>(Nil)(Nil);
export const isEmpty = (xs: CatQueue<any>): boolean => xs.left.isNil && xs.right.isNil;
export const length = (xs: CatQueue<any>): number => L.length(xs.left) + L.length(xs.right);
export const cons =
  <a>(head: a) =>
  (tail: CatQueue<a>): CatQueue<a> =>
    CatQueue(Cons(head)(tail.left))(tail.right);
export const snoc =
  <a>(init: CatQueue<a>) =>
  (last: a): CatQueue<a> =>
    CatQueue(init.left)(Cons(last)(init.right));
export const singleton: <a>(x: a) => CatQueue<a> = /* #__PURE__ */ snoc<any>(empty());
export const uncons = <a>(xs: CatQueue<a>): Maybe<[a, CatQueue<a>]> => {
  if (xs.left.isNil)
    if (xs.right.isNil) return Nothing;
    else return uncons(CatQueue(L.reverse(xs.right))(Nil));
  return Just([xs.left.head, CatQueue(xs.left.tail)(xs.right)]);
};
export const unsnoc = <a>(xs: CatQueue<a>): Maybe<[CatQueue<a>, a]> => {
  if (xs.right.isNil)
    if (xs.left.isNil) return Nothing;
    else return unsnoc(CatQueue<a>(Nil)(L.reverse(xs.left)));
  return Just([CatQueue(xs.left)(xs.right.tail), xs.right.head]);
};
export const fromFoldable =
  <f extends Generic1>(F: Foldable_1<f>) =>
  <a>(fa: Type1<f, a>): CatQueue<a> =>
    F.foldMap(monoidCatQueue)(singleton)(fa);
export const foldl: Foldable_1<TCatQueue>['foldl'] =
  <a, b>(f: (_: b) => (_: a) => b) =>
  (b: b) =>
  (fa: CatQueue<a>): b => {
    let acc = b,
      r = uncons(fa);
    while (true) {
      if (r.isNothing) return acc;
      const [hd, tl] = r.value;
      acc = f(acc)(hd);
      r = uncons(tl);
    }
  };
export const mempty = empty;
export const append = foldl(snoc);
export const foldMap = foldMapDefaultL({ foldl } as FoldLOnly_1<TCatQueue>);
export const foldr = foldrDefault({ foldMap } as FoldMapOnly_1<TCatQueue>);
export const map: Functor_1<TCatQueue>['map'] = f => xs =>
  CatQueue(L.map(f)(xs.left))(L.map(f)(xs.right));
export const traverse = traverseDefaultSnoc({
  foldl,
  nil: empty,
  snoc,
} as GenericSnoc_1<TCatQueue> & FoldLOnly_1<TCatQueue>);
export const sequence = sequenceDefault({ traverse } as TraverseOnly_1<TCatQueue>);
export const pure = singleton;
export const bind: Bind_1<TCatQueue>['bind'] = foldMap({ append, mempty } as Monoid_1<TCatQueue>);
export const apply = ap({ bind, pure } as BindPureOnly_1<TCatQueue>);
export const alt = append;
