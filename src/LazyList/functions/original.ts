import { Anon, Generic1, Generic2, Type1, Type2 } from '../../Generic';
import { flip } from '../../helpers/flip';
import { Maybe } from '../../Maybe/definitions';
import {
  Applicative_1,
  applyDefault,
  BindOnly_1,
  Bind_1,
  Foldable_1,
  foldMapDefaultL,
  FoldROnly_1,
  Functor_1,
  Monoid_0,
  Monoid_1,
  Monoid_2,
  Semigroup_1,
  sequenceDefault,
  Traversable_1,
  traverseDefaultFoldableUnfoldable,
  UnfoldROnly_1,
} from '../../typeclasses';
import { ConsResult, LazyCons, LazyList, LazyNil, NilResult } from '../definitions';
import { TLazyList } from '../internal';
import { List, list } from '../../List';

export const cons: <a>(head: a) => (tail: LazyList<a>) => LazyList<a> = LazyCons;
export const nil = LazyNil;

export const foldl: Foldable_1<TLazyList>['foldl'] =
  <a, b>(f: (_: b) => (_: a) => b) =>
  (b: b) =>
  (fa: LazyList<a>): b => {
    let acc = b;
    for (let result = fa(); result.isCons; result = result.tail()) {
      acc = f(acc)(result.head);
    }
    return acc;
  };

export const foldr: Foldable_1<TLazyList>['foldr'] =
  <a, b>(f: (_: a) => (_: b) => b) =>
  (b: b) =>
  (fa: LazyList<a>): b => {
    const reversed = foldl<a, List<a>>(flip(list.cons))(list.nil)(fa);
    return list.foldl(flip(f))(b)(reversed);
  };

export const foldlWithIndex =
  <a, b>(f: (_: number) => (_: b) => (_: a) => b) =>
  (b: b) =>
  (xs: LazyList<a>): b => {
    let acc = b;
    let result = xs();
    for (let i = 0; result.isCons; result = result.tail(), i++) acc = f(i)(acc)(result.head);
    return acc;
  };

export const mapWithIndex = <a, b>(f: (_: number) => (_: a) => b) => {
  const go =
    (i: number) =>
    (xs: LazyList<a>): LazyList<b> =>
    (result = xs()) =>
      result.isNil ? result : ConsResult(f(i)(result.head))(go(i + 1)(result.tail));
  return go(0);
};

export const foldrWithIndex =
  <a, b>(f: (_: number) => (_: a) => (_: b) => b) =>
  (b: b) =>
  (xs: LazyList<a>): b =>
    foldr<[number, a], b>(
      ([i, a]) =>
        b =>
          f(i)(a)(b)
    )(b)(mapWithIndex<a, [number, a]>(i => a => [i, a])(xs));
export const foldMapWithIndex: {
  <m extends Generic1>(
    monoid: Monoid_1<m>
  ): <a, b>(f: (_: number) => (_: a) => Type1<m, b>) => (fa: LazyList<a>) => Type1<m, b>;
  <m extends Generic2>(
    monoid: Monoid_2<m>
  ): <a, b, c>(f: (_: number) => (_: b) => Type2<m, a, c>) => (fa: LazyList<b>) => Type2<m, a, c>;
  <m>(monoid: Monoid_0<m>): <a>(f: (_: number) => (_: a) => m) => (fa: LazyList<a>) => m;
} =
  <m>({ append, mempty }: Anon<Monoid_0<m>>) =>
  <a>(f: (_: number) => (_: a) => m): ((fa: LazyList<a>) => m) =>
    foldlWithIndex<a, m>(i => m => a => append(m)(f(i)(a)))(mempty());

export const foldMap = foldMapDefaultL({ foldl } as Foldable_1<TLazyList>);

export const append: Semigroup_1<TLazyList>['append'] =
  <a>(xs: LazyList<a>) =>
  (ys: LazyList<a>): LazyList<a> =>
  (result = xs()) =>
    result.isNil ? ys() : ConsResult(result.head)(append(result.tail)(ys));

export const bind: Bind_1<TLazyList>['bind'] =
  <a, b>(f: (_: a) => LazyList<b>) =>
  (fa: LazyList<a>): LazyList<b> =>
  (result = fa()) =>
    result.isNil ? result : append(f(result.head))(bind(f)(result.tail))();

export const map: Functor_1<TLazyList>['map'] =
  <a, b>(f: (_: a) => b) =>
  (xs: LazyList<a>): LazyList<b> =>
  (result = xs()) =>
    result.isNil ? result : ConsResult(f(result.head))(map(f)(result.tail));

export const apply = applyDefault({ bind, map } as Functor_1<TLazyList> & BindOnly_1<TLazyList>);

export const singleton = <a>(a: a) => cons(a)(nil);

export const pure: Applicative_1<TLazyList>['pure'] = singleton;

export const mempty: Monoid_1<TLazyList>['mempty'] = () => nil;

export const take =
  (n: number) =>
  <a>(list: LazyList<a>): LazyList<a> =>
  (result = list()) =>
    n <= 0 || result.isNil ? NilResult : ConsResult(result.head)(take(n - 1)(result.tail));

export const drop =
  (n: number) =>
  <a>(list: LazyList<a>): LazyList<a> =>
  () => {
    let result = list();
    for (let remaining = n; result.isCons && remaining > 0; result = result.tail(), remaining--);
    return result;
  };

export const range =
  (start: number) =>
  (end: number): LazyList<number> => {
    if (!Number.isInteger(start)) throw new Error(`Starting value is not an integer: ${start}.`);
    if (!Number.isInteger(end)) throw new Error(`Ending value is not an integer: ${end}.`);
    if (start < end) {
      const ascending =
        (i: number): LazyList<number> =>
        () =>
          ConsResult(i)(i >= end ? nil : ascending(i + 1));
      return ascending(start);
    }
    const descending =
      (i: number): LazyList<number> =>
      () =>
        ConsResult(i)(i <= end ? nil : descending(i - 1));
    return descending(start);
  };

export const unfoldr1 = <a, b>(f: (_: b) => [a, Maybe<b>]) => {
  const go =
    (b: b): LazyList<a> =>
    ([value, next] = f(b)) =>
      ConsResult(value)(next.isNothing ? nil : go(next.value));
  return go;
};

export const unfoldr = <a, b>(f: (_: b) => Maybe<[a, b]>) => {
  const go =
    (b: b): LazyList<a> =>
    () => {
      let result = f(b);
      if (result.isNothing) return NilResult;
      const [value, next] = result.value;
      return ConsResult(value)(go(next));
    };
  return go;
};

export const traverse = traverseDefaultFoldableUnfoldable<TLazyList>({
  foldr,
  unfoldr,
} as FoldROnly_1<TLazyList> & UnfoldROnly_1<TLazyList>);
export const sequence = sequenceDefault({ traverse } as Traversable_1<TLazyList>);

export const alt = append;
export const empty = mempty;
