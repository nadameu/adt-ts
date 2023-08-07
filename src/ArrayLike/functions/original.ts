import { Either } from '../../Either/definitions';
import { unfoldr as unfoldIterable } from '../../Iterable/functions/original';
import { Maybe } from '../../Maybe/definitions';
import {
  Applicative_1,
  Apply_1,
  Bind_1,
  compactByFilterMap,
  Filterable_1,
  Foldable_1,
  foldMapDefaultR,
  FoldROnly_1,
  Functor_1,
  Monoid_1,
  partitionDefault,
  Semigroup_1,
  separateByPartitionMap,
  sequenceDefault,
  Traversable_1,
  traverseDefaultFoldableUnfoldable,
  UnfoldROnly_1,
  wiltDefault,
  Witherable_1,
  witherDefault,
} from '../../typeclasses';
import { TArrayLike } from '../internal';

const borrow =
  <
    key extends keyof Array<any>,
    args extends unknown[] = Array<any>[key] extends (...args: infer args) => unknown
      ? args
      : unknown[],
    b = Array<any>[key] extends (_: any) => infer b ? b : unknown,
  >(
    key: key,
    ...args: args
  ) =>
  (xs: ArrayLike<unknown>): b =>
    (Array.prototype[key] as any).apply(xs, args);

const snocArray =
  <a>(xs: a[]) =>
  (x: a) => {
    xs.push(x);
    return xs;
  };

export const forEach = <a>(f: (_: a) => void): ((xs: ArrayLike<a>) => void) =>
  borrow('forEach', x => f(x));

export const forEachRight =
  <a>(f: (_: a) => void) =>
  (xs: ArrayLike<a>) => {
    for (let i = xs.length - 1; i > -1; i--) f(xs[i]);
  };

export const forEachWithIndex = <a>(
  f: (_: number) => (_: a) => void
): ((xs: ArrayLike<a>) => void) => borrow('forEach', (x, i) => f(i)(x));

export const foldl: Foldable_1<TArrayLike>['foldl'] =
  <a, b>(f: (_: b) => (_: a) => b) =>
  (b: b): ((xs: ArrayLike<a>) => b) =>
    borrow('reduce', (acc: b, x: a) => f(acc)(x), b);

export const bind: Bind_1<TArrayLike>['bind'] = <a, b>(
  f: (_: a) => ArrayLike<b>
): ((xs: ArrayLike<a>) => ArrayLike<b>) =>
  foldl<a, b[]>(ys => x => foldl<b, b[]>(snocArray)(ys)(f(x)))([]);

export const map: Functor_1<TArrayLike>['map'] = <a, b>(
  f: (_: a) => b
): ((xs: ArrayLike<a>) => ArrayLike<b>) => borrow('map', x => f(x));

export const mapWithIndex = <a, b>(
  f: (_: number) => (_: a) => b
): ((xs: ArrayLike<a>) => ArrayLike<b>) => borrow('map', (x, i) => f(i)(x));

export const apply: Apply_1<TArrayLike>['apply'] =
  <a, b>(fs: ArrayLike<(_: a) => b>) =>
  (xs: ArrayLike<a>): ArrayLike<b> =>
    foldl<(_: a) => b, b[]>(ys => f => foldl<a, b[]>(ys => x => snocArray(ys)(f(x)))(ys)(xs))([])(
      fs
    );

export const pure: Applicative_1<TArrayLike>['pure'] = x => [x];

export const foldlWithIndex =
  <a, b>(f: (_: number) => (_: b) => (_: a) => b) =>
  (b: b): ((xs: ArrayLike<a>) => b) =>
    borrow('reduce', (acc: b, x: a, i) => f(i)(acc)(x), b);

export const foldr: Foldable_1<TArrayLike>['foldr'] =
  <a, b>(f: (_: a) => (_: b) => b) =>
  (b: b): ((xs: ArrayLike<a>) => b) =>
    borrow('reduceRight', (acc: b, x: a) => f(x)(acc), b);

export const foldrWithIndex =
  <a, b>(f: (_: number) => (_: a) => (_: b) => b) =>
  (b: b): ((xs: ArrayLike<a>) => b) =>
    borrow('reduceRight', (acc: b, x: a, i) => f(i)(x)(acc), b);

export const foldMap = foldMapDefaultR({ foldr } as Foldable_1<TArrayLike>);

export const append: Semigroup_1<TArrayLike>['append'] = <a>(
  xs: ArrayLike<a>
): ((ys: ArrayLike<a>) => ArrayLike<a>) => foldl<a, a[]>(snocArray)(Array.from(xs));

export const mempty: Monoid_1<TArrayLike>['mempty'] = () => [];

export const unfoldr =
  <a, b>(f: (_: b) => Maybe<[a, b]>) =>
  (b: b): ArrayLike<a> =>
    Array.from(unfoldIterable(f)(b));

export const traverse = traverseDefaultFoldableUnfoldable({
  foldr,
  unfoldr,
} as FoldROnly_1<TArrayLike> & UnfoldROnly_1<TArrayLike>);

export const sequence = sequenceDefault({ traverse } as Traversable_1<TArrayLike>);

export const alt = append;

export const empty = mempty;

export const filter = <a>(p: (_: a) => boolean): ((fa: ArrayLike<a>) => ArrayLike<a>) =>
  borrow('filter', x => p(x));

export const filterMap = <a, b>(p: (_: a) => Maybe<b>): ((fa: ArrayLike<a>) => ArrayLike<b>) =>
  foldl<a, b[]>(ys => x => (y => (y.isJust && ys.push(y.value), ys))(p(x)))([]);

export const compact = compactByFilterMap({ filterMap } as Filterable_1<TArrayLike>);

export const partitionMap: Filterable_1<TArrayLike>['partitionMap'] =
  <a, b, c>(f: (_: a) => Either<b, c>) =>
  (as: ArrayLike<a>) => {
    const left: b[] = [];
    const right: c[] = [];
    forEach<a>(a => {
      const either = f(a);
      if (either.isLeft) left.push(either.leftValue);
      else right.push(either.rightValue);
    })(as);
    return { left, right };
  };
export const partition = partitionDefault({ partitionMap } as Filterable_1<TArrayLike>);
export const separate = separateByPartitionMap({ partitionMap } as Filterable_1<TArrayLike>);

export const wither = witherDefault({ compact, traverse } as Witherable_1<TArrayLike>);

export const wilt = wiltDefault({ separate, traverse } as Witherable_1<TArrayLike>);

export const range =
  (start: number) =>
  (end: number): number[] => {
    if (!Number.isInteger(start) || !Number.isInteger(end))
      throw new TypeError('Start and end must be integers.');
    let x = start;
    const diff = end - start;
    return diff < 0
      ? Array.from({ length: 1 - diff }, _ => x--)
      : Array.from({ length: diff + 1 }, _ => x++);
  };
