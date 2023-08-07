import { Either } from '../../Either/definitions';
import { Generic1, Generic2, Type1, Type2 } from '../../Generic';
import { unfoldr as unfoldIterable } from '../../Iterable/functions/original';
import { Maybe } from '../../Maybe/definitions';
import {
  Applicative_1,
  Applicative_2,
  Apply_1,
  Bind_1,
  Filterable_1,
  FoldROnly_1,
  Foldable_1,
  Functor_1,
  GenericCons_1,
  Monoid_1,
  Semigroup_1,
  Traversable_1,
  UnfoldROnly_1,
  Witherable_1,
  compactByFilterMap,
  foldMapDefaultR,
  partitionDefault,
  separateByPartitionMap,
  sequenceDefault,
  traverseDefaultFoldableUnfoldable,
  wiltDefault,
  witherDefault,
} from '../../typeclasses';
import { TArray } from '../internal';

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
  (xs: unknown[]): b =>
    (Array.prototype[key] as any).apply(xs, args);

const snocArray =
  <a>(xs: a[]) =>
  (x: a) => {
    xs.push(x);
    return xs;
  };

export const forEach = <a>(f: (_: a) => void): ((xs: a[]) => void) => borrow('forEach', x => f(x));

export const forEachRight =
  <a>(f: (_: a) => void) =>
  (xs: a[]) => {
    for (let i = xs.length - 1; i > -1; i--) f(xs[i]);
  };

export const forEachWithIndex = <a>(f: (_: number) => (_: a) => void): ((xs: a[]) => void) =>
  borrow('forEach', (x, i) => f(i)(x));

export const foldl: Foldable_1<TArray>['foldl'] =
  <a, b>(f: (_: b) => (_: a) => b) =>
  (b: b): ((xs: a[]) => b) =>
    borrow('reduce', (acc: b, x: a) => f(acc)(x), b);

export const bind: Bind_1<TArray>['bind'] = <a, b>(f: (_: a) => b[]): ((xs: a[]) => b[]) =>
  foldl<a, b[]>(ys => x => foldl<b, b[]>(snocArray)(ys)(f(x)))([]);

export const map: Functor_1<TArray>['map'] = <a, b>(f: (_: a) => b): ((xs: a[]) => b[]) =>
  borrow('map', x => f(x));

export const mapWithIndex = <a, b>(f: (_: number) => (_: a) => b): ((xs: a[]) => b[]) =>
  borrow('map', (x, i) => f(i)(x));

export const apply: Apply_1<TArray>['apply'] =
  <a, b>(fs: Array<(_: a) => b>) =>
  (xs: a[]): b[] =>
    foldl<(_: a) => b, b[]>(ys => f => foldl<a, b[]>(ys => x => snocArray(ys)(f(x)))(ys)(xs))([])(
      fs
    );

export const pure: Applicative_1<TArray>['pure'] = x => [x];

export const foldlWithIndex =
  <a, b>(f: (_: number) => (_: b) => (_: a) => b) =>
  (b: b): ((xs: a[]) => b) =>
    borrow('reduce', (acc: b, x: a, i) => f(i)(acc)(x), b);

export const foldr: Foldable_1<TArray>['foldr'] =
  <a, b>(f: (_: a) => (_: b) => b) =>
  (b: b): ((xs: a[]) => b) =>
    borrow('reduceRight', (acc: b, x: a) => f(x)(acc), b);

export const foldrWithIndex =
  <a, b>(f: (_: number) => (_: a) => (_: b) => b) =>
  (b: b): ((xs: a[]) => b) =>
    borrow('reduceRight', (acc: b, x: a, i) => f(i)(x)(acc), b);

export const foldMap = foldMapDefaultR({ foldr } as Foldable_1<TArray>);

export const append: Semigroup_1<TArray>['append'] = <a>(xs: a[]): ((ys: a[]) => a[]) =>
  foldl<a, a[]>(snocArray)(Array.from(xs));

export const mempty: Monoid_1<TArray>['mempty'] = () => [];

export const unfoldr =
  <a, b>(f: (_: b) => Maybe<[a, b]>) =>
  (b: b): a[] =>
    Array.from(unfoldIterable(f)(b));

export const traverse = traverseDefaultFoldableUnfoldable({
  foldr,
  unfoldr,
} as FoldROnly_1<TArray> & UnfoldROnly_1<TArray>);

type Sequenced_1<m extends Generic1, mas, as extends unknown[] = []> = mas extends []
  ? Type1<m, as>
  : mas extends [Type1<m, infer a>, ...infer rest]
  ? Sequenced_1<m, rest, [...as, a]>
  : mas extends Type1<m, infer a>[]
  ? Sequenced_1<m, [], [...as, ...a[]]>
  : never;
type Sequenced_2<
  m extends Generic2,
  mabs extends Type2<m, unknown, unknown>[],
> = mabs extends Type2<m, infer a, unknown>[] ? Sequenced_2a<m, mabs, a> : never;
type Sequenced_2a<m extends Generic2, mabs, a, bs extends unknown[] = []> = mabs extends []
  ? Type2<m, a, bs>
  : mabs extends [Type2<m, a, infer b>, ...infer rest]
  ? Sequenced_2a<m, rest, a, [...bs, b]>
  : mabs extends Type2<m, a, infer b>[]
  ? Sequenced_2a<m, [], a, [...bs, ...b[]]>
  : never;
export const sequence: {
  <m extends Generic1>(
    applicative: Applicative_1<m>
  ): <tma extends Type1<m, unknown>[]>(tma: [...tma]) => Sequenced_1<m, tma>;
  <m extends Generic2>(
    applicative: Applicative_2<m>
  ): <tmab extends Type2<m, unknown, unknown>[]>(tmab: [...tmab]) => Sequenced_2<m, tmab>;
} = sequenceDefault({ traverse } as Traversable_1<TArray>);

export const alt = append;

export const empty = mempty;

export const filter = <a>(p: (_: a) => boolean): ((fa: a[]) => a[]) => borrow('filter', x => p(x));

export const filterMap = <a, b>(p: (_: a) => Maybe<b>): ((fa: a[]) => b[]) =>
  foldl<a, b[]>(ys => x => (y => (y.isJust && ys.push(y.value), ys))(p(x)))([]);

export const compact = compactByFilterMap({ filterMap } as Filterable_1<TArray>);

export const partitionMap: Filterable_1<TArray>['partitionMap'] =
  <a, b, c>(f: (_: a) => Either<b, c>) =>
  (as: a[]) => {
    const left: b[] = [];
    const right: c[] = [];
    forEach<a>(a => {
      const either = f(a);
      if (either.isLeft) left.push(either.leftValue);
      else right.push(either.rightValue);
    })(as);
    return { left, right };
  };
export const partition = partitionDefault({ partitionMap } as Filterable_1<TArray>);
export const separate = separateByPartitionMap({ partitionMap } as Filterable_1<TArray>);

export const wither = witherDefault({ compact, traverse } as Witherable_1<TArray>);

export const wilt = wiltDefault({ separate, traverse } as Witherable_1<TArray>);

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
