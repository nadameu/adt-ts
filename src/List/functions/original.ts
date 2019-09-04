import { Either, Left, Right } from '../../Either/definitions';
import { Generic1, Generic2, Type1, Type2 } from '../../Generic';
import { Applicative1 } from '../../typeclasses/Applicative';
import { Apply, Apply1, Apply2, lift2 } from '../../typeclasses/Apply';
import { Foldable1 } from '../../typeclasses/Foldable';
import { ap, Monad1 } from '../../typeclasses/Monad';
import { Monoid0 } from '../../typeclasses/Monoid';
import { Semigroup0, Semigroup1 } from '../../typeclasses/Semigroup';
import { sequenceDefault, Traversable1 } from '../../typeclasses/Traversable';
import {
  Append,
  Cons,
  ConsList,
  isCons,
  isNil,
  isSnoc,
  List,
  ListTag,
  NEConsList,
  NEList,
  NESnocList,
  Nil,
  Snoc,
  SnocList,
} from '../definitions';
import { TList } from '../internal';

export const cons: {
  <a>(head: a): {
    (tail: ConsList<a>): NEConsList<a>;
    (tail: List<a>): NEList<a>;
  };
} = Cons as any;
export const snoc: {
  <a>(init: SnocList<a>): (last: a) => NESnocList<a>;
  <a>(init: List<a>): (last: a) => NEList<a>;
} = Snoc as any;
export const append: {
  <a>(left: NEList<a>): (right: List<a>) => NEList<a>;
  <a>(left: List<a>): {
    (right: NEList<a>): NEList<a>;
    (right: List<a>): List<a>;
  };
} = <a>(left: List<a>) => (right: List<a>): any =>
  isNil(left) ? right : isNil(right) ? left : Append(left)(right);
export const nil: List<never> & ConsList<never> & SnocList<never> = Nil;
export const mempty = <a = never>(): List<a> & ConsList<a> & SnocList<a> => nil;
export const alt = append;
export const empty = mempty;
export const singleton: <a>(value: a) => NEList<a> = Snoc(Nil);
export const pure = singleton;
export const map: {
  <a, b>(f: (_: a) => b): {
    (xs: NEList<a>): NEList<b>;
    (xs: List<a>): List<b>;
  };
} = <a, b>(f: (_: a) => b): ((xs: List<a>) => any) => foldr<a, List<b>>(x => cons(f(x)))(nil);
export const bind: {
  <a, b>(f: (_: a) => NEList<b>): {
    (xs: NEList<a>): NEList<b>;
    (xs: List<a>): List<b>;
  };
  <a, b>(f: (_: a) => List<b>): (xs: List<a>) => List<b>;
} = <a, b>(f: (_: a) => List<b>): ((xs: List<a>) => any) =>
  foldr<a, List<b>>(x => append(f(x)))(nil);
export const apply: {
  <a, b>(ff: NEList<(_: a) => b>): {
    (fa: NEList<a>): NEList<b>;
    (fa: List<a>): List<b>;
  };
  <a, b>(ff: List<(_: a) => b>): (fa: List<a>) => List<b>;
} = ap({ bind, pure } as Monad1<TList>) as any;
export const uncons: {
  <a>(list: NEConsList<a>): NEConsList<a>;
  <a>(list: NEList<a>): Cons<a>;
  <a>(list: List<a>): Cons<a> | Nil;
} = (<a>(list: List<a>): Cons<a> | Nil => {
  let current = list;
  let next: List<a> = nil;
  for (;;) {
    switch (current.tag) {
      case ListTag.Cons: {
        return current;
      }
      case ListTag.Snoc: {
        next = cons(current.last)(next);
        current = current.init;
        break;
      }
      case ListTag.Append: {
        next = append(current.right)(next);
        current = current.left;
        break;
      }
      case ListTag.Nil: {
        if (isNil(next)) return Nil;
        current = next;
        next = nil;
        break;
      }
    }
  }
}) as any;
export const unsnoc: {
  <a>(list: NESnocList<a>): NESnocList<a>;
  <a>(list: NEList<a>): Snoc<a>;
  <a>(list: List<a>): Snoc<a> | Nil;
} = (<a>(list: List<a>): Snoc<a> | Nil => {
  let current = list;
  let next: List<a> = nil;
  for (;;) {
    switch (current.tag) {
      case ListTag.Cons: {
        next = snoc(next)(current.head);
        current = current.tail;
        break;
      }
      case ListTag.Snoc: {
        return current;
      }
      case ListTag.Append: {
        next = append(next)(current.left);
        current = current.right;
        break;
      }
      case ListTag.Nil: {
        if (isNil(next)) return Nil;
        current = next;
        next = nil;
        break;
      }
    }
  }
}) as any;
export const foldl = <a, b>(f: (_: b) => (_: a) => b) => (b0: b) => (xs: List<a>): b => {
  let acc = b0;
  let current = uncons(xs);
  while (isCons(current)) {
    const { head, tail } = current;
    acc = f(acc)(head);
    current = uncons(tail);
  }
  return acc;
};
export const foldr = <a, b>(f: (_: a) => (_: b) => b) => (b0: b) => (xs: List<a>): b => {
  let acc = b0;
  let current = unsnoc(xs);
  while (isSnoc(current)) {
    const { init, last } = current;
    acc = f(last)(acc);
    current = unsnoc(init);
  }
  return acc;
};
export const foldMap: Foldable1<TList>['foldMap'] = <b>({
  append,
  mempty,
}: Pick<Monoid0<b>, 'append' | 'mempty'>) => <a>(f: (_: a) => b) => (xs: List<a>): b => {
  let left = mempty();
  let current = xs;
  let right = mempty();
  let next: ConsList<{ current: List<a>; right: b }> = nil;
  for (;;) {
    switch (current.tag) {
      case ListTag.Cons: {
        left = append(left)(f(current.head));
        current = current.tail;
        break;
      }
      case ListTag.Snoc: {
        right = append(f(current.last))(right);
        current = current.init;
        break;
      }
      case ListTag.Append: {
        next = cons({ current: current.right as List<a>, right })(next);
        current = current.left;
        right = mempty();
        break;
      }
      case ListTag.Nil: {
        left = append(left)(right);
        if (isNil(next)) return left;
        current = next.head.current;
        right = next.head.right;
        next = next.tail;
        break;
      }
    }
  }
};

export const foldMap1: {
  <m extends Generic1>(semigroup: Semigroup1<m>): <a, b>(
    f: (_: a) => Type1<m, b>
  ) => (fa: NEList<a>) => Type1<m, b>;
  <m>(semigroup: Semigroup0<m>): <a>(f: (_: a) => m) => (fa: NEList<a>) => m;
} = <b>({ append }: Pick<Semigroup0<b>, 'append'>) => <a>(f: (_: a) => b) => (xs: NEList<a>): b => {
  const { init, last } = unsnoc(xs);
  return foldr<a, b>(x => append(f(x)))(f(last))(init);
};

export const traverse: Traversable1<TList>['traverse'] = <f extends Generic1>({
  apply,
  map,
  pure,
}: Pick<Applicative1<f>, 'apply' | 'map' | 'pure'>) => <a, b>(f: (_: a) => Type1<f, b>) => (
  ta: List<a>
): Type1<f, List<b>> => {
  type c = Either<b, List<b>>;
  return map<Either<b, List<b>>, List<b>>(x => (x.isLeft ? singleton(x.leftValue) : x.rightValue))(
    foldMap({
      append: lift2({ apply, map } as Apply1<f>)<c, c, Right<List<b>>>(x => y =>
        Right(
          x.isLeft
            ? y.isLeft
              ? cons(x.leftValue)(singleton(y.leftValue))
              : cons(x.leftValue)(y.rightValue)
            : y.isLeft
            ? snoc(x.rightValue)(y.leftValue)
            : append(x.rightValue)(y.rightValue)
        )
      ),
      mempty: () => pure(Right(mempty())),
    } as Monoid0<Type1<f, c>>)<a>(a => map(Left)(f(a)))(ta)
  );
};

export const traverse1: {
  <m extends Generic1>(apply: Apply1<m>): <a, b>(
    f: (_: a) => Type1<m, b>
  ) => (ta: NEList<a>) => Type1<m, NEList<b>>;
  <m extends Generic2>(apply: Apply2<m>): <a, b, c>(
    f: (_: a) => Type2<m, b, c>
  ) => (ta: NEList<a>) => Type2<m, b, NEList<c>>;
} = <f extends Generic1>(apply: Apply) => <a, b>(f: (_: a) => Type1<f, b>) => (
  ta: NEList<a>
): Type1<f, NEList<b>> => {
  const liftedCons = lift2(apply as Apply1<f>)(cons);
  const { init, last } = unsnoc(ta);
  return foldr<a, Type1<f, NEList<b>>>(x => liftedCons(f(x)))(
    (apply as Apply1<f>).map<b, NEConsList<b>>(x => cons(x)(nil))(f(last))
  )(init);
};

export const sequence = sequenceDefault({ traverse } as Traversable1<TList>);

export const sequence1: {
  <m extends Generic1>(apply: Apply1<m>): <a>(tma: NEList<Type1<m, a>>) => Type1<m, NEList<a>>;
  <m extends Generic2>(apply: Apply2<m>): <a, b>(
    tmab: NEList<Type2<m, a, b>>
  ) => Type2<m, a, NEList<b>>;
} = <m extends Generic1>(apply: Apply) =>
  traverse1(apply as Apply1<m>)<Type1<m, unknown>, Type1<m, unknown>>(x => x);
