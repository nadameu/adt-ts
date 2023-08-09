import { Either } from '../../Either/definitions';
import { unfoldr as unfoldIterable } from '../../Iterable/functions/original';
import { Maybe } from '../../Maybe/definitions';
import {
  Applicative_A,
  Apply_A,
  Bind_A,
  Filterable_A,
  FoldROnly_A,
  Foldable_A,
  Functor_A,
  Monoid_A,
  Semigroup_A,
  Traversable_A,
  TraverseOnly_A,
  UnfoldROnly_1,
  UnfoldROnly_A,
  Witherable_A,
  compactByFilterMap,
  foldMapDefaultR,
  partitionDefault,
  separateByPartitionMap,
  sequenceDefault,
  traverseDefaultFoldableUnfoldable,
  wiltDefault,
  witherDefault,
} from '../../typeclasses';

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
  (xs: a[]) => {
    for (let i = xs.length - 1; i > -1; i--) f(xs[i]);
  };

export const forEachWithIndex = <a>(f: (_: number) => (_: a) => void): ((xs: a[]) => void) =>
  borrow('forEach', (x, i) => f(i)(x));

export const foldl: Foldable_A['foldl'] =
  <a, b>(f: (_: b) => (_: a) => b) =>
  (b: b): ((xs: ArrayLike<a>) => b) =>
    borrow('reduce', (acc: b, x: a) => f(acc)(x), b);

export const bind: Bind_A['bind'] = <a, b>(
  f: (_: a) => ArrayLike<b>
): ((xs: ArrayLike<a>) => b[]) => foldl<a, b[]>(ys => x => foldl<b, b[]>(snocArray)(ys)(f(x)))([]);

export const map: Functor_A['map'] = <a, b>(f: (_: a) => b): ((xs: ArrayLike<a>) => b[]) =>
  borrow('map', x => f(x));

export const mapWithIndex = <a, b>(f: (_: number) => (_: a) => b): ((xs: ArrayLike<a>) => b[]) =>
  borrow('map', (x, i) => f(i)(x));

export const apply: Apply_A['apply'] =
  <a, b>(fs: ArrayLike<(_: a) => b>) =>
  (xs: ArrayLike<a>): b[] =>
    foldl<(_: a) => b, b[]>(ys => f => foldl<a, b[]>(ys => x => snocArray(ys)(f(x)))(ys)(xs))([])(
      fs
    );

export const pure: Applicative_A['pure'] = x => [x];

export const foldlWithIndex =
  <a, b>(f: (_: number) => (_: b) => (_: a) => b) =>
  (b: b): ((xs: ArrayLike<a>) => b) =>
    borrow('reduce', (acc: b, x: a, i) => f(i)(acc)(x), b);

export const foldr: Foldable_A['foldr'] =
  <a, b>(f: (_: a) => (_: b) => b) =>
  (b: b): ((xs: ArrayLike<a>) => b) =>
    borrow('reduceRight', (acc: b, x: a) => f(x)(acc), b);

export const foldrWithIndex =
  <a, b>(f: (_: number) => (_: a) => (_: b) => b) =>
  (b: b): ((xs: ArrayLike<a>) => b) =>
    borrow('reduceRight', (acc: b, x: a, i) => f(i)(x)(acc), b);

export const foldMap = foldMapDefaultR({ foldr } as Foldable_A);

export const append: Semigroup_A['append'] = <a>(xs: ArrayLike<a>): ((ys: ArrayLike<a>) => a[]) =>
  foldl<a, a[]>(snocArray)(Array.from(xs));

export const mempty: Monoid_A['mempty'] = () => [];

export const unfoldr: UnfoldROnly_A['unfoldr'] =
  <a, b>(f: (_: b) => Maybe<[a, b]>) =>
  (b: b): a[] =>
    Array.from(unfoldIterable(f)(b));

export const traverse = traverseDefaultFoldableUnfoldable({
  foldr,
  unfoldr,
} as FoldROnly_A & UnfoldROnly_A);

export const sequence = /* @__PURE__ */ sequenceDefault({ traverse } as TraverseOnly_A);

export const alt = append;

export const empty = mempty;

export const filter = <a>(p: (_: a) => boolean): ((fa: ArrayLike<a>) => a[]) =>
  borrow('filter', x => p(x));

export const filterMap = <a, b>(p: (_: a) => Maybe<b>): ((fa: ArrayLike<a>) => b[]) =>
  foldl<a, b[]>(ys => x => (y => (y.isJust && ys.push(y.value), ys))(p(x)))([]);

export const compact = compactByFilterMap({ filterMap } as Filterable_A);

export const partitionMap: Filterable_A['partitionMap'] =
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
export const partition = partitionDefault({ partitionMap } as Filterable_A);
export const separate = separateByPartitionMap({ partitionMap } as Filterable_A);

export const wither = witherDefault({ compact, traverse } as Witherable_A);

export const wilt = wiltDefault({ separate, traverse } as Witherable_A);

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

export const toArray = <a>(xs: ArrayLike<a>): a[] => Array.from(xs);
