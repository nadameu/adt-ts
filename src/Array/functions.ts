import { Either } from '../Either/definitions';
import { flip } from '../Fn/functions';
import { Generic1, Type1 } from '../Generic';
import { Maybe } from '../Maybe/definitions';
import { Applicative, Applicative_1 } from '../typeclasses/Applicative';
import { Apply_1, lift2 } from '../typeclasses/Apply';
import { Bind_1 } from '../typeclasses/Bind';
import { Compactable_1 } from '../typeclasses/Compactable';
import { Filterable_1, filterDefault, partitionDefault } from '../typeclasses/Filterable';
import { Foldable_1, foldMapDefaultR } from '../typeclasses/Foldable';
import { Functor_1 } from '../typeclasses/Functor';
import { Monoid_1 } from '../typeclasses/Monoid';
import { Semigroup_1 } from '../typeclasses/Semigroup';
import { sequenceDefault, Traversable_1 } from '../typeclasses/Traversable';
import { Witherable_1 } from '../typeclasses/Witherable';
import { TArray } from './internal';

export const forEach = <a>(f: (_: a) => void) => (xs: ArrayLike<a>) => {
  const len = xs.length;
  for (let i = 0; i < len; i++) {
    f(xs[i]);
  }
};

export const forEachRight = <a>(f: (_: a) => void) => (xs: ArrayLike<a>) => {
  for (let i = xs.length - 1; i >= 0; i--) {
    f(xs[i]);
  }
};

export const forEachWithIndex = <a>(f: (_: number) => (_: a) => void) => (xs: ArrayLike<a>) => {
  const len = xs.length;
  for (let i = 0; i < len; i++) {
    f(i)(xs[i]);
  }
};

export const bind: Bind_1<TArray>['bind'] = <a, b>(f: (_: a) => ArrayLike<b>) => (
  xs: ArrayLike<a>
): ArrayLike<b> => {
  const ys: b[] = [];
  forEach<a>(x => {
    forEach<b>(y => {
      ys.push(y);
    })(f(x));
  })(xs);
  return ys;
};

export const map: Functor_1<TArray>['map'] = <a, b>(f: (_: a) => b) => (
  xs: ArrayLike<a>
): ArrayLike<b> => {
  const ys: b[] = new Array(xs.length);
  let i = 0;
  forEach<a>(x => {
    ys[i++] = f(x);
  })(xs);
  return ys;
};

export const apply: Apply_1<TArray>['apply'] = <a, b>(fs: ArrayLike<(_: a) => b>) => (
  xs: ArrayLike<a>
): ArrayLike<b> => {
  const ys: b[] = new Array(fs.length * xs.length);
  let i = 0;
  forEach<(_: a) => b>(f => {
    forEach<a>(x => {
      ys[i++] = f(x);
    })(xs);
  })(fs);
  return ys;
};

export const pure: Applicative_1<TArray>['pure'] = x => [x];

export const foldl: Foldable_1<TArray>['foldl'] = <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (
  xs: ArrayLike<a>
): b => {
  let acc = b;
  forEach<a>(x => {
    acc = f(acc)(x);
  })(xs);
  return acc;
};

export const foldlWithIndex = <a, b>(f: (_: b) => (_: number) => (_: a) => b) => (b: b) => (
  xs: ArrayLike<a>
): b => {
  let acc = b;
  forEachWithIndex<a>(i => x => {
    acc = f(acc)(i)(x);
  })(xs);
  return acc;
};

export const foldr: Foldable_1<TArray>['foldr'] = <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (
  xs: ArrayLike<a>
): b => {
  let acc = b;
  forEachRight<a>(x => {
    acc = f(x)(acc);
  })(xs);
  return acc;
};

export const foldrWithIndex = <a, b>(f: (_: number) => (_: a) => (_: b) => b) => (b: b) => (
  xs: ArrayLike<a>
): b => {
  let acc = b;
  let i = xs.length;
  forEachRight<a>(x => {
    acc = f(--i)(x)(acc);
  })(xs);
  return acc;
};

export const foldMap = foldMapDefaultR({ foldr } as Foldable_1<TArray>);

export const append: Semigroup_1<TArray>['append'] = <a>(xs: ArrayLike<a>) => (ys: ArrayLike<a>) => {
  const result: a[] = new Array(xs.length + ys.length);
  let i = 0;
  forEach<a>(x => {
    result[i++] = x;
  })(xs);
  forEach<a>(y => {
    result[i++] = y;
  })(ys);
  return result;
};

export const mempty: Monoid_1<TArray>['mempty'] = () => [];

export const traverse: Traversable_1<TArray>['traverse'] = <f extends Generic1>(
  applicative: Applicative<f>
) => <a, b>(f: (_: a) => Type1<f, b>) => (as: ArrayLike<a>): Type1<f, ArrayLike<b>> =>
  foldrWithIndex<a, Type1<f, b[]>>(i => x =>
    lift2(applicative as Applicative_1<f>)((b: b) => (bs: b[]) => ((bs[i] = b), bs))(f(x))
  )((applicative as Applicative_1<f>).pure(new Array(as.length)))(as);

export const sequence = sequenceDefault({ traverse } as Traversable_1<TArray>);

export const alt = append;

export const empty = mempty;

export const filterMap: Filterable_1<TArray>['filterMap'] = <a, b>(f: (_: a) => Maybe<b>) => (
  as: ArrayLike<a>
): ArrayLike<b> => {
  const bs: b[] = [];
  forEach<a>(a => {
    const maybeB = f(a);
    if (maybeB.isJust) bs.push(maybeB.value);
  })(as);
  return bs;
};
export const filter = filterDefault({ filterMap } as Filterable_1<TArray>);
export const compact: Compactable_1<TArray>['compact'] = filterMap(x => x);

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
export const separate: Compactable_1<TArray>['separate'] = partitionMap(x => x);

export const wither: Witherable_1<TArray>['wither'] = (<m extends Generic1>(
  applicative: Applicative_1<m>
) => <a, b>(f: (_: a) => Type1<m, Maybe<b>>) => (as: ArrayLike<a>): Type1<m, ArrayLike<b>> => {
  const lifted = lift2(applicative)<Maybe<b>, b[], b[]>(b => bs =>
    b.isNothing ? bs : (bs.push(b.value), bs)
  );
  const g = flip((a: a) => lifted(f(a)));
  return foldl(g)(applicative.pure([]))(as);
}) as any;

type WiltResult<a, b> = { left: a[]; right: b[] };
export const wilt: Witherable_1<TArray>['wilt'] = (<m extends Generic1>(
  applicative: Applicative_1<m>
) => <a, b, c>(f: (_: a) => Type1<m, Either<b, c>>) => (
  as: ArrayLike<a>
): Type1<m, WiltResult<b, c>> => {
  const lifted = lift2(applicative)<Either<b, c>, WiltResult<b, c>, WiltResult<b, c>>(
    b => ({ left, right }) =>
      b.isLeft
        ? { left: (left.push(b.leftValue), left), right }
        : { left, right: (right.push(b.rightValue), right) }
  );
  const g = flip((a: a) => lifted(f(a)));
  return foldl(g)(applicative.pure({ left: [], right: [] }))(as);
}) as any;

export const range = (start: number) => (end: number): number[] => {
  if (!Number.isInteger(start) || !Number.isInteger(end))
    throw new TypeError('Start and end must be integers.');
  const xs = new Array(end - start + 1);
  const past = end + 1;
  for (let i = 0, x = start; x < past; i++, x++) {
    xs[i] = x;
  }
  return xs;
};
