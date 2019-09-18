import { lift2 } from '../../derivations';
import { Either } from '../../Either/definitions';
import { Anon, Generic1, Type1 } from '../../Generic';
import { flip } from '../../helpers/flip';
import { Maybe } from '../../Maybe/definitions';
import {
  Applicative_1,
  Apply_1,
  Bind_1,
  compactByFilterMap,
  Filterable_1,
  Foldable_1,
  FoldLOnly_1,
  foldMapDefaultR,
  Functor_1,
  GenericSnoc_1,
  Monoid_1,
  partitionDefault,
  Semigroup_1,
  separateByPartitionMap,
  sequenceDefault,
  Traversable_1,
  traverseDefaultSnoc,
  Witherable_1,
} from '../../typeclasses';
import { TArray } from '../internal';

const borrow = <
  key extends keyof Array<any>,
  args extends unknown[] = Array<any>[key] extends (...args: infer args) => unknown
    ? args
    : unknown[],
  b = Array<any>[key] extends (_: any) => infer b ? b : unknown
>(
  key: key,
  ...args: args
) => (xs: ArrayLike<unknown>): b => (Array.prototype[key] as any).apply(xs, args);

const snocArray = <a>(xs: a[]) => (x: a) => (xs.push(x), xs);

export const forEach = <a>(f: (_: a) => void): ((xs: ArrayLike<a>) => void) =>
  borrow('forEach', x => f(x));

export const forEachRight = <a>(f: (_: a) => void) => (xs: ArrayLike<a>) => {
  for (let i = xs.length - 1; i > -1; i--) f(xs[i]);
};

export const forEachWithIndex = <a>(
  f: (_: number) => (_: a) => void
): ((xs: ArrayLike<a>) => void) => borrow('forEach', (x, i) => f(i)(x));

export const bind: Bind_1<TArray>['bind'] = <a, b>(
  f: (_: a) => ArrayLike<b>
): ((xs: ArrayLike<a>) => ArrayLike<b>) =>
  foldl<a, b[]>(ys => x => foldl<b, b[]>(snocArray)(ys)(f(x)))([]);

export const map: Functor_1<TArray>['map'] = <a, b>(
  f: (_: a) => b
): ((xs: ArrayLike<a>) => ArrayLike<b>) => borrow('map', x => f(x));

export const mapWithIndex = <a, b>(
  f: (_: number) => (_: a) => b
): ((xs: ArrayLike<a>) => ArrayLike<b>) => borrow('map', (x, i) => f(i)(x));

export const apply: Apply_1<TArray>['apply'] = <a, b>(fs: ArrayLike<(_: a) => b>) => (
  xs: ArrayLike<a>
): ArrayLike<b> =>
  foldl<(_: a) => b, b[]>(ys => f => foldl<a, b[]>(ys => x => snocArray(ys)(f(x)))(ys)(xs))([])(fs);

export const pure: Applicative_1<TArray>['pure'] = x => [x];

export const foldl: Foldable_1<TArray>['foldl'] = <a, b>(f: (_: b) => (_: a) => b) => (
  b: b
): ((xs: ArrayLike<a>) => b) => borrow('reduce', (acc: b, x: a) => f(acc)(x), b);

export const foldlWithIndex = <a, b>(f: (_: b) => (_: number) => (_: a) => b) => (
  b: b
): ((xs: ArrayLike<a>) => b) => borrow('reduce', (acc: b, x: a, i) => f(acc)(i)(x), b);

export const foldr: Foldable_1<TArray>['foldr'] = <a, b>(f: (_: a) => (_: b) => b) => (
  b: b
): ((xs: ArrayLike<a>) => b) => borrow('reduceRight', (acc: b, x: a) => f(x)(acc), b);

export const foldrWithIndex = <a, b>(f: (_: number) => (_: a) => (_: b) => b) => (
  b: b
): ((xs: ArrayLike<a>) => b) => borrow('reduceRight', (acc: b, x: a, i) => f(i)(x)(acc), b);

export const foldMap = foldMapDefaultR({ foldr } as Foldable_1<TArray>);

export const append: Semigroup_1<TArray>['append'] = <a>(
  xs: ArrayLike<a>
): ((ys: ArrayLike<a>) => ArrayLike<a>) => foldl<a, a[]>(snocArray)(Array.from(xs));

export const mempty: Monoid_1<TArray>['mempty'] = () => [];

export const traverse = traverseDefaultSnoc(({
  foldl,
  nil: mempty,
  snoc: <a>(xs: a[]) => (x: a) => (xs.push(x), xs),
} as unknown) as FoldLOnly_1<TArray> & GenericSnoc_1<TArray>);

export const sequence = sequenceDefault({ traverse } as Traversable_1<TArray>);

export const alt = append;

export const empty = mempty;

export const filter = <a>(p: (_: a) => boolean): ((fa: ArrayLike<a>) => ArrayLike<a>) =>
  borrow('filter', x => p(x));

export const filterMap = <a, b>(p: (_: a) => Maybe<b>): ((fa: ArrayLike<a>) => ArrayLike<b>) =>
  foldl<a, b[]>(ys => x => (y => (y.isJust && ys.push(y.value), ys))(p(x)))([]);

export const compact = compactByFilterMap({ filterMap } as Filterable_1<TArray>);

export const partitionMap: Filterable_1<TArray>['partitionMap'] = <a, b, c>(
  f: (_: a) => Either<b, c>
) => (as: ArrayLike<a>) => {
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

export const wither: Witherable_1<TArray>['wither'] = <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => <a, b>(f: (_: a) => Type1<m, Maybe<b>>): ((as: ArrayLike<a>) => Type1<m, ArrayLike<b>>) => {
  const lifted = lift2(applicative as Applicative_1<m>)<Maybe<b>, b[], b[]>(mb => bs => (
    mb.isJust && bs.push(mb.value), bs
  ));
  return foldl(flip((a: a) => lifted(f(a))))(applicative.pure([]));
};

type WiltResult<a, b> = { left: a[]; right: b[] };
export const wilt: Witherable_1<TArray>['wilt'] = <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => <a, b, c>(
  f: (_: a) => Type1<m, Either<b, c>>
): ((as: ArrayLike<a>) => Type1<m, WiltResult<b, c>>) => {
  const lifted = lift2(applicative as Applicative_1<m>)<
    Either<b, c>,
    WiltResult<b, c>,
    WiltResult<b, c>
  >(ebc => ({ left, right }) => (
    ebc.isLeft ? left.push(ebc.leftValue) : right.push(ebc.rightValue), { left, right }
  ));
  return foldl(flip((a: a) => lifted(f(a))))(applicative.pure({ left: [], right: [] }));
};

export const range = (start: number) => (end: number): number[] => {
  if (!Number.isInteger(start) || !Number.isInteger(end))
    throw new TypeError('Start and end must be integers.');
  let x = start;
  const diff = end - start;
  return diff < 0
    ? Array.from({ length: 1 - diff }, _ => x--)
    : Array.from({ length: diff + 1 }, _ => x++);
};
