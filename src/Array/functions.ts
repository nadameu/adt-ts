import { Generic1, Type1 } from '../Generic';
import { Applicative1 } from '../typeclasses/Applicative';
import { Apply1, lift2 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Foldable1, foldMapDefaultR } from '../typeclasses/Foldable';
import { Functor1 } from '../typeclasses/Functor';
import { Monoid1 } from '../typeclasses/Monoid';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { sequenceDefault, Traversable1 } from '../typeclasses/Traversable';
import { TArray } from './internal';

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

export const traverse: Traversable1<TArray>['traverse'] = (<m extends Generic1>(
  applicative: Applicative1<m>
) => <a, b>(f: (_: a) => Type1<m, b>): ((xs: a[]) => Type1<m, b[]>) => {
  const push = lift2(applicative)((xs: b[]) => (x: b) => (xs.push(x), xs));
  return foldl<a, Type1<m, b[]>>(acc => x => push(acc)(f(x)))(applicative.pure([] as b[]));
}) as any;

export const sequence = sequenceDefault({ traverse } as Traversable1<TArray>);

export const alt = append;

export const empty = mempty;
