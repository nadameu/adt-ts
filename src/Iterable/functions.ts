import { Applicative1 } from '../typeclasses/Applicative';
import { Apply1, lift2 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Functor1 } from '../typeclasses/Functor';
import { Monoid1 } from '../typeclasses/Monoid';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { TIterable } from './internal';
import { foldMapDefaultL, Foldable1, fold } from '../typeclasses/Foldable';
import { Traversable1, sequenceDefault } from '../typeclasses/Traversable';
import { Type1, Generic1 } from '../Generic';
import { SSL_OP_NO_TICKET } from 'constants';
import { list } from '../List';
import { monoidList } from '../List/instances';
import { List, ConsList, NEConsList, ListTag, SnocList } from '../List/definitions';

export const map: Functor1<TIterable>['map'] = f => fa => ({
  *[Symbol.iterator]() {
    for (const x of fa) yield f(x);
  },
});

export const apply: Apply1<TIterable>['apply'] = fs => xs => ({
  *[Symbol.iterator]() {
    for (const f of fs) for (const x of xs) yield f(x);
  },
});

export const pure: Applicative1<TIterable>['pure'] = value => ({
  *[Symbol.iterator]() {
    yield value;
  },
});

export const bind: Bind1<TIterable>['bind'] = f => xs => ({
  *[Symbol.iterator]() {
    for (const x of xs) for (const y of f(x)) yield y;
  },
});

export const append: Semigroup1<TIterable>['append'] = xs => ys => ({
  *[Symbol.iterator]() {
    for (const x of xs) yield x;
    for (const y of ys) yield y;
  },
});

export const mempty: Monoid1<TIterable>['mempty'] = () => [];

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
  while (ys.tag === ListTag.Snoc) {
    acc = f(ys.last)(acc);
    ys = ys.init;
  }
  return acc;
};

export const foldMap = foldMapDefaultL({ foldl } as Foldable1<TIterable>);

export const traverse: Traversable1<TIterable>['traverse'] = (<m extends Generic1>(
  applicative: Applicative1<m>
) => <a, b>(f: (_: a) => Type1<m, b>) => (xs: Iterable<a>): Type1<m, Iterable<b>> => {
  const cons: <a>(
    fHead: Type1<m, a>
  ) => (fTail: Type1<m, ConsList<a>>) => Type1<m, NEConsList<a>> = lift2(applicative)(list.cons);
  const fys = foldr<a, Type1<m, ConsList<b>>>(a => cons(f(a)))(applicative.pure(list.nil))(xs);
  return applicative.map<ConsList<b>, Iterable<b>>(list => {
    return {
      *[Symbol.iterator]() {
        let current = list;
        while (current.tag === ListTag.Cons) {
          yield current.head;
          current = current.tail;
        }
      },
    };
  })(fys);
}) as any;

export const sequence = sequenceDefault({ traverse } as Traversable1<TIterable>);

export const fromArray = <a>(xs: ArrayLike<a>): Iterable<a> => ({
  *[Symbol.iterator]() {
    const len = xs.length;
    for (let i = 0; i < len; i++) yield xs[i];
  },
});
