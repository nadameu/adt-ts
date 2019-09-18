import { lift2 } from '../../derivations';
import { Anon, Generic1, Generic2, Type1, Type2 } from '../../Generic';
import {
  ap,
  Apply_1,
  Apply_2,
  fold1Default,
  Foldable1_1,
  Foldable_1,
  FoldROnly_1,
  GenericCons_1,
  Monad_1,
  Monoid_0,
  Semigroup_0,
  Semigroup_1,
  sequenceDefault,
  Traversable_1,
  traverseDefaultCons,
} from '../../typeclasses';
import { Cons, List, Nil } from '../definitions';
import { TList } from '../internal';
import { flip } from '../../helpers/flip';
import { Monoid_1 } from '../../typeclasses/Monoid';
import { foldMapDefaultL } from '../../typeclasses/Foldable';
import { applyDefault } from '../../typeclasses/Bind';

export const cons: <a>(head: a) => (tail: List<a>) => List<a> = Cons;
export const nil = Nil;
export const mempty = <a = never>(): List<a> => nil;
export const foldl: Foldable_1<TList>['foldl'] = f => b => xs => {
  let result = b;
  let current = xs;
  while (current.isCons) {
    result = f(result)(current.head);
    current = current.tail;
  }
  return result;
};
export const reverse = <a>(xs: List<a>): List<a> => foldl<a, List<a>>(flip(cons))(nil)(xs);
export const foldr: Foldable_1<TList>['foldr'] = f => b => xs => foldl(flip(f))(b)(reverse(xs));
export const append: Monoid_1<TList>['append'] = xs => ys => foldr(cons)(ys)(xs);
export const alt = append;
export const empty = mempty;
export const foldMap = foldMapDefaultL({ foldl } as Foldable_1<TList>);
export const map: Monad_1<TList>['map'] = <a, b>(f: (_: a) => b) =>
  foldr<a, List<b>>(x => cons(f(x)))(nil);
export const pure: Monad_1<TList>['pure'] = a => cons(a)(nil);
export const bind: Monad_1<TList>['bind'] = <a, b>(f: (_: a) => List<b>) => (
  xs: List<a>
): List<b> => {
  const ryss = foldl<a, List<List<b>>>(yss => a => cons(f(a))(yss))(nil)(xs);
  return foldl<List<b>, List<b>>(flip(append))(nil)(ryss);
};
export const apply = applyDefault({ bind, map } as Monad_1<TList>);
export const traverse = traverseDefaultCons({ cons, foldr, nil: mempty } as GenericCons_1<TList> &
  FoldROnly_1<TList>);
export const sequence = sequenceDefault({ traverse } as Traversable_1<TList>);
