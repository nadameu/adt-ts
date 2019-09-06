import { Generic1, Type1 } from '../Generic';
import { list } from '../List';
import { ConsList, isCons, isSnoc, SnocList } from '../List/definitions';
import { Applicative_1 } from '../typeclasses/Applicative';
import { Apply_1, lift2 } from '../typeclasses/Apply';
import { Bind_1 } from '../typeclasses/Bind';
import { Foldable_1, foldMapDefaultL } from '../typeclasses/Foldable';
import { Functor_1 } from '../typeclasses/Functor';
import { Monoid_1 } from '../typeclasses/Monoid';
import { Semigroup_1 } from '../typeclasses/Semigroup';
import { sequenceDefault, Traversable_1 } from '../typeclasses/Traversable';
import { TIterable } from './internal';

export const map: Functor_1<TIterable>['map'] = f => fa => ({
  *[Symbol.iterator]() {
    for (const x of fa) yield f(x);
  },
});

export const apply: Apply_1<TIterable>['apply'] = fs => xs => ({
  *[Symbol.iterator]() {
    for (const f of fs) for (const x of xs) yield f(x);
  },
});

export const pure: Applicative_1<TIterable>['pure'] = value => ({
  *[Symbol.iterator]() {
    yield value;
  },
});

export const bind: Bind_1<TIterable>['bind'] = f => xs => ({
  *[Symbol.iterator]() {
    for (const x of xs) for (const y of f(x)) yield y;
  },
});

export const append: Semigroup_1<TIterable>['append'] = xs => ys => ({
  *[Symbol.iterator]() {
    for (const x of xs) yield x;
    for (const y of ys) yield y;
  },
});

export const mempty: Monoid_1<TIterable>['mempty'] = () => [];

export const alt = append;
export const empty = mempty;

export const foldl = <a, b>(f: (_: b) => (_: a) => b) => (b0: b) => (xs: Iterable<a>): b => {
  let acc = b0;
  for (const x of xs) {
    acc = f(acc)(x);
  }
  return acc;
};

export const foldr = <a, b>(f: (_: a) => (_: b) => b) => (b0: b) => (xs: Iterable<a>): b => {
  let ys = foldl<a, SnocList<a>>(list.snoc)(list.nil)(xs);
  let acc = b0;
  while (isSnoc(ys)) {
    acc = f(ys.last)(acc);
    ys = ys.init;
  }
  return acc;
};

export const foldMap = foldMapDefaultL({ foldl } as Foldable_1<TIterable>);

export const traverse: Traversable_1<TIterable>['traverse'] = (<m extends Generic1>({
  apply,
  map,
  pure,
}: Applicative_1<m>) => <a, b>(f: (_: a) => Type1<m, b>) => (
  as: Iterable<a>
): Type1<m, Iterable<b>> => {
  const liftedCons: <a>(
    fx: Type1<m, a>
  ) => (fxs: Type1<m, ConsList<a>>) => Type1<m, ConsList<a>> = lift2({
    apply,
    map,
  } as Apply_1<m>)(list.cons);
  const liftedNil = pure(list.nil);
  const ms = foldl<a, SnocList<Type1<m, b>>>(ys => x => list.snoc(ys)(f(x)))(list.nil)(as);
  const mbs = list.foldr<Type1<m, b>, Type1<m, ConsList<b>>>(liftedCons)(liftedNil)(ms);
  return map(
    (bs: ConsList<b>): Iterable<b> => ({
      *[Symbol.iterator]() {
        for (let b = bs; isCons(b); b = b.tail) yield b.head;
      },
    })
  )(mbs);
}) as any;

export const sequence = sequenceDefault({ traverse } as Traversable_1<TIterable>);

export const range = (start: number) => (end: number): Iterable<number> => {
  if (!Number.isInteger(start) || !Number.isInteger(end))
    throw new TypeError('Start and end must be integers.');
  return {
    *[Symbol.iterator]() {
      for (let i = start; i <= end; i++) yield i;
    },
  };
};

export const fromArray = <a>(xs: ArrayLike<a>): Iterable<a> => ({
  *[Symbol.iterator]() {
    const len = xs.length;
    for (let i = 0; i < len; i++) yield xs[i];
  },
});
