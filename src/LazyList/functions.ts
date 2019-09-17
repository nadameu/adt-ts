import { flip } from '../Fn/functions';
import { Anon, Generic1, Type1 } from '../Generic';
import {
  Applicative_1,
  applyDefault,
  BindOnly_1,
  Bind_1,
  Foldable_1,
  foldMapDefaultL,
  FoldROnly_1,
  Functor_1,
  GenericCons_1,
  Monoid_0,
  Monoid_1,
  Semigroup_1,
  sequenceDefault,
  Traversable_1,
  traverseDefaultCons,
} from '../typeclasses';
import { ConsResult, LazyCons, LazyList, LazyNil, NilResult } from './definitions';
import { TLazyList } from './internal';

export const cons: <a>(head: a) => (tail: LazyList<a>) => LazyList<a> = LazyCons;
export const nil = LazyNil;

export const foldr: Foldable_1<TLazyList>['foldr'] = <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (
  fa: LazyList<a>
): b => foldl(flip(f))(b)(reverse(fa));

export const foldl: Foldable_1<TLazyList>['foldl'] = <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (
  fa: LazyList<a>
): b => {
  let acc = b;
  let result = fa();
  while (result.isCons) {
    acc = f(acc)(result.head);
    result = result.tail();
  }
  return acc;
};

export const foldlWithIndex = <a, b>(f: (_: number) => (_: b) => (_: a) => b) => (b: b) => (
  xs: LazyList<a>
): b => {
  let acc = b;
  let result = xs();
  for (let i = 0; result.isCons; i++) {
    acc = f(i)(acc)(result.head);
    result = result.tail();
  }
  return acc;
};
export const foldrWithIndex = <a, b>(f: (_: number) => (_: a) => (_: b) => b) => (b: b) => (
  xs: LazyList<a>
): b =>
  foldl<[number, a], b>(b => ([i, a]) => f(i)(a)(b))(b)(
    reverse(mapWithIndex<a, [number, a]>(i => a => [i, a])(xs))
  );
export const foldMapWithIndex: {
  <m extends Generic1>(monoid: Monoid_1<m>): <a, b>(
    f: (_: number) => (_: a) => Type1<m, b>
  ) => (fa: LazyList<a>) => Type1<m, b>;
  <m>(monoid: Monoid_0<m>): <a>(f: (_: number) => (_: a) => m) => (fa: LazyList<a>) => m;
} = <m>({ append, mempty }: Anon<Monoid_0<m>>) => <a>(
  f: (_: number) => (_: a) => m
): ((fa: LazyList<a>) => m) => foldlWithIndex<a, m>(i => m => a => append(m)(f(i)(a)))(mempty());

const reverse: <a>(fa: LazyList<a>) => LazyList<a> = foldl(flip(cons))(nil);

export const foldMap = foldMapDefaultL({ foldl } as Foldable_1<TLazyList>);

export const append: Semigroup_1<TLazyList>['append'] = <a>(xs: LazyList<a>) => (
  ys: LazyList<a>
): LazyList<a> => () =>
  (result => (result.isNil ? ys() : ConsResult(result.head)(append(result.tail)(ys))))(xs());

export const bind: Bind_1<TLazyList>['bind'] = <a, b>(f: (_: a) => LazyList<b>) => (
  fa: LazyList<a>
): LazyList<b> => () =>
  (result => (result.isNil ? result : append(f(result.head))(bind(f)(result.tail))()))(fa());

export const map: Functor_1<TLazyList>['map'] = <a, b>(f: (_: a) => b) => (
  xs: LazyList<a>
): LazyList<b> => () =>
  (result => (result.isNil ? result : ConsResult(f(result.head))(map(f)(result.tail))))(xs());

export const mapWithIndex = <a, b>(f: (_: number) => (_: a) => b) =>
  (function go(i: number) {
    return (xs: LazyList<a>): LazyList<b> => () =>
      (result => (result.isNil ? result : ConsResult(f(i)(result.head))(go(i + 1)(result.tail))))(
        xs()
      );
  })(0);

export const apply = applyDefault({ bind, map } as Functor_1<TLazyList> & BindOnly_1<TLazyList>);

export const singleton = <a>(a: a) => cons(a)(nil);

export const pure: Applicative_1<TLazyList>['pure'] = singleton;

export const mempty: Monoid_1<TLazyList>['mempty'] = () => nil;

export const take = (n: number) => <a>(list: LazyList<a>): LazyList<a> => () =>
  n <= 0
    ? NilResult
    : (result => (result.isNil ? result : ConsResult(result.head)(take(n - 1)(result.tail))))(
        list()
      );

export const drop = (n: number) => <a>(list: LazyList<a>): LazyList<a> => () => {
  let result = list();
  for (let remaining = n; result.isCons && remaining > 0; remaining--) result = result.tail();
  return result;
};

export const range = (start: number) => (end: number): LazyList<number> => {
  if (!Number.isInteger(start)) throw new Error(`Starting value is not an integer: ${start}.`);
  if (!Number.isInteger(end)) throw new Error(`Ending value is not an integer: ${end}.`);
  if (start < end) {
    const ascending = (i: number): LazyList<number> => () =>
      i === end ? ConsResult(i)(nil) : ConsResult(i)(ascending(i + 1));
    return ascending(start);
  }
  const descending = (i: number): LazyList<number> => () =>
    i === end ? ConsResult(i)(nil) : ConsResult(i)(descending(i - 1));
  return descending(start);
};

export const traverse = traverseDefaultCons<TLazyList>({
  cons,
  foldr,
  nil: mempty,
} as GenericCons_1<TLazyList> & FoldROnly_1<TLazyList>);
export const sequence = sequenceDefault({ traverse } as Traversable_1<TLazyList>);

export const alt = append;
export const empty = mempty;
