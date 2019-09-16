import { lift2 } from '../../derivations';
import { Anon, Generic1, Type1 } from '../../Generic';
import { ConsList, isCons, isSnoc, SnocList } from '../../List/definitions';
import * as list from '../../List/functions';
import { Maybe } from '../../Maybe/definitions';
import {
  Applicative_1,
  Apply_1,
  Bind_1,
  Compactable_1,
  CompactOnly_1,
  FilterOnly_1,
  Foldable_1,
  foldMapDefaultL,
  Functor_1,
  Monoid_1,
  partitionDefaultFilter,
  Semigroup_1,
  separateDefault,
  sequenceDefault,
  Traversable_1,
} from '../../typeclasses';
import { SeparateOnly_1 } from '../../typeclasses/Compactable';
import {
  filterDefault,
  filterMapDefault,
  FilterMapOnly_1,
  partitionMapDefault,
} from '../../typeclasses/Filterable';
import { TraverseOnly_1 } from '../../typeclasses/Traversable';
import { wiltDefault, witherDefault } from '../../typeclasses/Witherable';
import { TIterable } from '../internal';

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

export const traverse: Traversable_1<TIterable>['traverse'] = <m extends Generic1>({
  apply,
  map,
  pure,
}: Anon<Applicative_1<m>>) => <a, b>(f: (_: a) => Type1<m, b>) => (
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
};

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

export const compact: Compactable_1<TIterable>['compact'] = <a>(
  fma: Iterable<Maybe<a>>
): Iterable<a> => ({
  *[Symbol.iterator]() {
    for (const ma of fma) if (ma.isJust) yield ma.value;
  },
});

export const separate = separateDefault({
  map,
  compact,
} as CompactOnly_1<TIterable> & Functor_1<TIterable>);

export const filterMap = filterMapDefault({
  map,
  compact,
} as CompactOnly_1<TIterable> & Functor_1<TIterable>);

export const filter = filterDefault({ filterMap } as FilterMapOnly_1<TIterable>);

export const partition = partitionDefaultFilter({
  filter,
} as FilterOnly_1<TIterable>);

export const partitionMap = partitionMapDefault({ map, separate } as Functor_1<TIterable> &
  SeparateOnly_1<TIterable>);

export const wilt = wiltDefault({ separate, traverse } as SeparateOnly_1<TIterable> &
  TraverseOnly_1<TIterable>);

export const wither = witherDefault({ compact, traverse } as CompactOnly_1<TIterable> &
  TraverseOnly_1<TIterable>);
