import { Applicative1 } from '../typeclasses/Applicative';
import { Apply1 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Foldable1, foldMapDefaultR } from '../typeclasses/Foldable';
import { Functor1 } from '../typeclasses/Functor';
import {
  Traversable1,
  traverseDefaultFoldableMonoid,
  sequenceDefault,
} from '../typeclasses/Traversable';
import { TArray } from './internal';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { Monoid1 } from '../typeclasses/Monoid';

export const bind: Bind1<TArray>['bind'] = f => xs => {
  const result: any[] = [];
  xs.forEach(x =>
    f(x).forEach(y => {
      result.push(y);
    })
  );
  return result;
};

export const map: Functor1<TArray>['map'] = f => xs => xs.map(x => f(x));

export const apply: Apply1<TArray>['apply'] = <a, b>(fs: ((_: a) => b)[]) => (xs: a[]): b[] =>
  bind<(_: a) => b, b>(f => map(f)(xs))(fs);

export const pure: Applicative1<TArray>['pure'] = x => [x];

export const foldl: Foldable1<TArray>['foldl'] = f => z => xs =>
  xs.reduce((acc, x) => f(acc)(x), z);

export const foldr: Foldable1<TArray>['foldr'] = f => z => xs =>
  xs.reduceRight((acc, x) => f(x)(acc), z);

export const foldMap = foldMapDefaultR({ foldr } as Foldable1<TArray>);

export const append: Semigroup1<TArray>['append'] = (xs, ys) => xs.concat(ys);

export const mempty: Monoid1<TArray>['mempty'] = () => [];

export const traverse = traverseDefaultFoldableMonoid({
  append,
  foldMap,
  mempty,
} as Foldable1<TArray> & Monoid1<TArray>);

export const sequence = sequenceDefault({ traverse } as Traversable1<TArray>);

export const alt = append;

export const empty = mempty;
