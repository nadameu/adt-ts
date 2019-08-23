import { Generic1, Type1 } from '../Generic';
import { Maybe } from '../Maybe/definitions';
import { Applicative, Applicative1 } from '../typeclasses/Applicative';
import { Apply1, lift2 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Foldable1, foldMapDefaultR } from '../typeclasses/Foldable';
import { flap, Functor1 } from '../typeclasses/Functor';
import { Monoid1 } from '../typeclasses/Monoid';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { sequenceDefault, Traversable1 } from '../typeclasses/Traversable';
import {
  Witherable1,
  partitionMapByWilt,
  filterMapByWither,
  witherDefault,
  wiltDefault,
} from '../typeclasses/Witherable';
import { TArray } from './internal';
import { Either } from '../Either/definitions';
import {
  partitionDefault,
  Filterable1,
  filterDefault,
  filterMapDefault,
  maybeBool,
} from '../typeclasses/Filterable';
import { Compactable1 } from '../typeclasses/Compactable';

export const forEach = <a>(f: (_: a) => void) => (xs: a[]) => {
  const len = xs.length;
  for (let i = 0; i < len; i++) {
    f(xs[i]);
  }
};

export const forEachBackwards = <a>(f: (_: a) => void) => (xs: a[]) => {
  for (let i = xs.length - 1; i >= 0; i--) {
    f(xs[i]);
  }
};

export const forEachWithIndex = <a>(f: (_: number) => (_: a) => void) => (xs: a[]) => {
  const len = xs.length;
  for (let i = 0; i < len; i++) {
    f(i)(xs[i]);
  }
};

export const bind: Bind1<TArray>['bind'] = <a, b>(f: (_: a) => b[]) => (xs: a[]): b[] => {
  const result: b[] = [];
  forEach((x: a) => {
    forEach((y: b) => {
      result.push(y);
    })(f(x));
  })(xs);
  return result;
};

export const map: Functor1<TArray>['map'] = <a, b>(f: (_: a) => b) => (xs: a[]): b[] => {
  const result: b[] = new Array(xs.length);
  forEachWithIndex(i => (x: a) => {
    result[i] = f(x);
  })(xs);
  return result;
};

export const apply: Apply1<TArray>['apply'] = <a, b>(fs: Array<(_: a) => b>) => (xs: a[]): b[] => {
  const xLen = xs.length;
  const result: b[] = new Array(fs.length * xLen);
  forEachWithIndex(iF => (f: (_: a) => b) => {
    forEachWithIndex(iX => (x: a) => {
      result[iF * xLen + iX] = f(x);
    })(xs);
  })(fs);
  return result;
};

export const pure: Applicative1<TArray>['pure'] = x => [x];

export const foldl: Foldable1<TArray>['foldl'] = <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (
  xs: a[]
): b => {
  let acc = b;
  forEach((x: a) => {
    acc = f(acc)(x);
  })(xs);
  return acc;
};

export const foldr: Foldable1<TArray>['foldr'] = <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (
  xs: a[]
): b => {
  let acc = b;
  forEachBackwards((x: a) => {
    acc = f(x)(acc);
  })(xs);
  return acc;
};

export const foldMap = foldMapDefaultR({ foldr } as Foldable1<TArray>);

export const append: Semigroup1<TArray>['append'] = <a>(xs: a[]) => (ys: a[]) => {
  const lenX = xs.length;
  const lenY = ys.length;
  const result: a[] = new Array(lenX + lenY);
  for (let r = 0; r < lenX; r++) {
    result[r] = xs[r];
  }
  for (let i = 0, r = lenX; i < lenY; i++, r++) {
    result[r] = ys[i];
  }
  return result;
};

export const mempty: Monoid1<TArray>['mempty'] = () => [];

export const traverse: Traversable1<TArray>['traverse'] = <m extends Generic1>(
  applicative: Applicative
) => <a, b>(f: (_: a) => Type1<m, b>) => (as: a[]): Type1<m, b[]> => {
  const push = lift2(applicative as Applicative1<m>)((bs: b[]) => (b: b) => (i: number) => {
    bs[i] = b;
    return bs;
  });
  const fl = flap(applicative as Applicative1<m>);

  let fbs = (applicative as Applicative1<m>).pure(new Array<b>(as.length));
  const len = as.length;
  for (let i = 0; i < len; i++) {
    const fb = f(as[i]);
    fbs = fl(i)(push(fbs)(fb));
  }
  return fbs;
};

export const sequence = sequenceDefault({ traverse } as Traversable1<TArray>);

export const alt = append;

export const empty = mempty;

export const filterMap: Filterable1<TArray>['filterMap'] = <a, b>(f: (_: a) => Maybe<b>) => (
  as: a[]
): b[] => {
  const bs: b[] = [];
  const len = as.length;
  for (let i = 0; i < len; i++) {
    const maybeB = f(as[i]);
    if (maybeB.isJust) bs.push(maybeB.value);
  }
  return bs;
};
export const filter = filterDefault({ filterMap } as Filterable1<TArray>);
export const compact: Compactable1<TArray>['compact'] = filterMap(x => x);

export const partitionMap: Filterable1<TArray>['partitionMap'] = <a, b, c>(
  f: (_: a) => Either<b, c>
) => (as: a[]) => {
  const left: b[] = [];
  const right: c[] = [];
  const len = as.length;
  for (let i = 0; i < len; i++) {
    const either = f(as[i]);
    if (either.isLeft) left.push(either.leftValue);
    else right.push(either.rightValue);
  }
  return { left, right };
};
export const partition = partitionDefault({ partitionMap } as Filterable1<TArray>);
export const separate: Compactable1<TArray>['separate'] = partitionMap(x => x);

export const wither = witherDefault({ compact, traverse } as Witherable1<TArray>);
export const wilt = wiltDefault({ separate, traverse } as Witherable1<TArray>);
