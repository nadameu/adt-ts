import { Either } from '../Either/definitions';
import { Generic1, Type1 } from '../Generic';
import { Maybe } from '../Maybe/definitions';
import { Applicative, Applicative1 } from '../typeclasses/Applicative';
import { Apply1, lift2 } from '../typeclasses/Apply';
import { Bind1 } from '../typeclasses/Bind';
import { Compactable1 } from '../typeclasses/Compactable';
import { Filterable1, filterDefault, partitionDefault } from '../typeclasses/Filterable';
import { Foldable1, foldMapDefaultR } from '../typeclasses/Foldable';
import { Functor1 } from '../typeclasses/Functor';
import { Monoid1 } from '../typeclasses/Monoid';
import { Semigroup1 } from '../typeclasses/Semigroup';
import { sequenceDefault, Traversable1 } from '../typeclasses/Traversable';
import { wiltDefault, Witherable1, witherDefault } from '../typeclasses/Witherable';
import { TArray } from './internal';
import { flip } from '../Fn/functions';

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

export const bind: Bind1<TArray>['bind'] = <a, b>(f: (_: a) => ArrayLike<b>) => (
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

export const map: Functor1<TArray>['map'] = <a, b>(f: (_: a) => b) => (
  xs: ArrayLike<a>
): ArrayLike<b> => {
  const ys: b[] = new Array(xs.length);
  let i = 0;
  forEach<a>(x => {
    ys[i++] = f(x);
  })(xs);
  return ys;
};

export const apply: Apply1<TArray>['apply'] = <a, b>(fs: ArrayLike<(_: a) => b>) => (
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

export const pure: Applicative1<TArray>['pure'] = x => [x];

export const foldl: Foldable1<TArray>['foldl'] = <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (
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

export const foldr: Foldable1<TArray>['foldr'] = <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (
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

export const foldMap = foldMapDefaultR({ foldr } as Foldable1<TArray>);

export const append: Semigroup1<TArray>['append'] = <a>(xs: ArrayLike<a>) => (ys: ArrayLike<a>) => {
  const result: a[] = new Array(xs.length + ys.length);
  let i = 0;
  forEach<a>(x => {
    result[i++] = x;
  })(xs);
  forEach<a>(y => {
    result[i++] = y;
  });
  return result;
};

export const mempty: Monoid1<TArray>['mempty'] = () => [];

export const traverse: Traversable1<TArray>['traverse'] = <f extends Generic1>(
  applicative: Applicative
) => <a, b>(f: (_: a) => Type1<f, b>) => (as: ArrayLike<a>): Type1<f, ArrayLike<b>> =>
  foldrWithIndex<a, Type1<f, b[]>>(i => x =>
    lift2(applicative as Applicative1<f>)((b: b) => (bs: b[]) => ((bs[i] = b), bs))(f(x))
  )((applicative as Applicative1<f>).pure(new Array(as.length)))(as);

export const sequence = sequenceDefault({ traverse } as Traversable1<TArray>);

export const alt = append;

export const empty = mempty;

export const filterMap: Filterable1<TArray>['filterMap'] = <a, b>(f: (_: a) => Maybe<b>) => (
  as: ArrayLike<a>
): ArrayLike<b> => {
  const bs: b[] = [];
  forEach<a>(a => {
    const maybeB = f(a);
    if (maybeB.isJust) bs.push(maybeB.value);
  })(as);
  return bs;
};
export const filter = filterDefault({ filterMap } as Filterable1<TArray>);
export const compact: Compactable1<TArray>['compact'] = filterMap(x => x);

export const partitionMap: Filterable1<TArray>['partitionMap'] = <a, b, c>(
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
export const partition = partitionDefault({ partitionMap } as Filterable1<TArray>);
export const separate: Compactable1<TArray>['separate'] = partitionMap(x => x);

export const wither: Witherable1<TArray>['wither'] = (<m extends Generic1>(
  applicative: Applicative1<m>
) => <a, b>(f: (_: a) => Type1<m, Maybe<b>>) => (as: ArrayLike<a>): Type1<m, ArrayLike<b>> => {
  const lifted = lift2(applicative)<Maybe<b>, b[], b[]>(b => bs =>
    b.isNothing ? bs : (bs.push(b.value), bs)
  );
  const g = flip((a: a) => lifted(f(a)));
  return foldl(g)(applicative.pure([]))(as);
}) as any;

type WiltResult<a, b> = { left: a[]; right: b[] };
export const wilt: Witherable1<TArray>['wilt'] = (<m extends Generic1>(
  applicative: Applicative1<m>
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
