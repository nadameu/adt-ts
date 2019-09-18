import { lift2 } from '../../derivations';
import { Anon, Generic1, Generic2, Type1, Type2 } from '../../Generic';
import {
  ap,
  Apply_1,
  Apply_2,
  fold1Default,
  Foldable1_1,
  Foldable_1,
  FoldROnly_1,
  GenericCons_1,
  Monad_1,
  Monoid_0,
  Semigroup_0,
  Semigroup_1,
  sequenceDefault,
  Traversable_1,
  traverseDefaultCons,
} from '../../typeclasses';
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
import { TList, TNEList } from '../internal';

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
export const nil = Nil;
export const mempty = <a = never>(): List<a> & ConsList<a> & SnocList<a> => nil;
export const alt = append;
export const empty = mempty;
export const singleton: <a>(value: a) => NEList<a> = Snoc(Nil);
export const pure = singleton;
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
        const { init, last } = current;
        return Snoc(append(next)(init))(last);
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
} = ap({ bind, pure } as Monad_1<TList>) as any;
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
        const { head, tail } = current;
        return Cons(head)(append(tail)(next));
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
export const foldMap: Foldable_1<TList>['foldMap'] = <b>({
  append,
  mempty,
}: Pick<Monoid_0<b>, 'append' | 'mempty'>) => <a>(f: (_: a) => b) => (xs: List<a>): b => {
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
  <m extends Generic1>(semigroup: Semigroup_1<m>): <a, b>(
    f: (_: a) => Type1<m, b>
  ) => (fa: NEList<a>) => Type1<m, b>;
  <m>(semigroup: Semigroup_0<m>): <a>(f: (_: a) => m) => (fa: NEList<a>) => m;
} = <b>({ append }: Pick<Semigroup_0<b>, 'append'>) => <a>(f: (_: a) => b) => (
  xs: NEList<a>
): b => {
  const { init, last } = unsnoc(xs);
  return foldr<a, b>(x => append(f(x)))(f(last))(init);
};

export const fold1 = fold1Default({ foldMap1 } as Foldable1_1<TNEList>);

export const traverse = traverseDefaultCons<TList>({ cons, foldr, nil: () => nil } as GenericCons_1<
  TList
> &
  FoldROnly_1<TList>);

export const traverse1: {
  <m extends Generic1>(apply: Apply_1<m>): <a, b>(
    f: (_: a) => Type1<m, b>
  ) => (ta: NEList<a>) => Type1<m, NEList<b>>;
  <m extends Generic2>(apply: Apply_2<m>): <a, b, c>(
    f: (_: a) => Type2<m, b, c>
  ) => (ta: NEList<a>) => Type2<m, b, NEList<c>>;
} = <f extends Generic1>(apply: Anon<Apply_1<f>>) => <a, b>(f: (_: a) => Type1<f, b>) => (
  ta: NEList<a>
): Type1<f, NEList<b>> => {
  const liftedCons = lift2(apply as Apply_1<f>)(cons);
  const { init, last } = unsnoc(ta);
  return foldr<a, Type1<f, NEList<b>>>(x => liftedCons(f(x)))(
    (apply as Apply_1<f>).map<b, NEConsList<b>>(x => cons(x)(nil))(f(last))
  )(init);
};

export const sequence = sequenceDefault({ traverse } as Traversable_1<TList>);

export const sequence1: {
  <m extends Generic1>(apply: Apply_1<m>): <a>(tma: NEList<Type1<m, a>>) => Type1<m, NEList<a>>;
  <m extends Generic2>(apply: Apply_2<m>): <a, b>(
    tmab: NEList<Type2<m, a, b>>
  ) => Type2<m, a, NEList<b>>;
} = <m extends Generic1>(apply: Anon<Apply_1<m>>) =>
  traverse1(apply as Apply_1<m>)<Type1<m, unknown>, Type1<m, unknown>>(x => x);
