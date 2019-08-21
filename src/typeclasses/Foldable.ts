import { autocurry2 } from '../autocurry';
import { Generic1, Generic2, Identified1, Identified2, Type1, Type2 } from '../Generic';
import { AnyMonoid, Monoid, Monoid1 } from './Monoid';

export interface Foldable1<f extends Generic1> extends Identified1<f> {
  foldl: Helpers1<f>['foldl'];
  foldr: Helpers1<f>['foldr'];
  foldMap: Helpers1<f>['foldMap'];
}

export interface Foldable2<f extends Generic2> extends Identified2<f> {
  foldl: Helpers2<f>['foldl'];
  foldr: Helpers2<f>['foldr'];
  foldMap: Helpers2<f>['foldMap'];
}

export type AnyFoldable = Pick<
  Foldable1<Generic1> & Foldable2<Generic2>,
  keyof Foldable1<Generic1> & keyof Foldable2<Generic2>
>;

interface Helpers1<f extends Generic1> {
  foldl: <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (fa: Type1<f, a>) => b;
  foldr: <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (fa: Type1<f, a>) => b;
  foldMap: Helper1Monoid<f>['foldMap'];
}
interface Helpers2<f extends Generic2> {
  foldl: <b, c>(f: (_: c) => (_: b) => c) => (c: c) => <a>(fab: Type2<f, a, b>) => c;
  foldr: <b, c>(f: (_: b) => (_: c) => c) => (c: c) => <a>(fab: Type2<f, a, b>) => c;
  foldMap: Helper2Monoid<f>['foldMap'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(foldable: Foldable1<f>): Helpers1<f>[k];
    <f extends Generic2>(foldable: Foldable2<f>): Helpers2<f>[k];
  };
};
type PartialHelper<keys extends keyof Foldable1<never> & keyof Foldable2<never>> = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(_: Pick<Foldable1<f>, 'Generic1Type' | keys>): Helpers1<f>[k];
    <f extends Generic2>(_: Pick<Foldable2<f>, 'Generic2Type' | keys>): Helpers2<f>[k];
  };
};
interface Helpers1Monoid0<f extends Generic1, m> {
  foldMap: <a>(f: (_: a) => m) => (fa: Type1<f, a>) => m;
  fold: (fm: Type1<f, m>) => m;
}
interface Helpers1Monoid1<f extends Generic1, m extends Generic1> {
  foldMap: <a, b>(f: (_: a) => Type1<m, b>) => (fa: Type1<f, a>) => Type1<m, b>;
  fold: <a>(fma: Type1<f, Type1<m, a>>) => Type1<m, a>;
}
interface Helpers2Monoid0<f extends Generic2, m> {
  foldMap: <b>(f: (_: b) => m) => <a>(fab: Type2<f, a, b>) => m;
  fold: <a>(fam: Type2<f, a, m>) => m;
}
interface Helpers2Monoid1<f extends Generic2, m extends Generic1> {
  foldMap: <b, c>(f: (_: b) => Type1<m, c>) => <a>(fab: Type2<f, a, b>) => Type1<m, c>;
  fold: <a, b>(famb: Type2<f, a, Type1<m, b>>) => Type1<m, b>;
}
type Helper1Monoid<f extends Generic1> = {
  [k in keyof Helpers1Monoid0<never, never>]: {
    <m>(monoid: Monoid<m>): Helpers1Monoid0<f, m>[k];
    <m extends Generic1>(monoid: Monoid1<m>): Helpers1Monoid1<f, m>[k];
  };
};
type Helper2Monoid<f extends Generic2> = {
  [k in keyof Helpers2Monoid0<never, never>]: {
    <m>(monoid: Monoid<m>): Helpers2Monoid0<f, m>[k];
    <m extends Generic1>(monoid: Monoid1<m>): Helpers2Monoid1<f, m>[k];
  };
};
type HelperMonoid = {
  [k in keyof Helper1Monoid<never>]: {
    <f extends Generic1>(foldable: Foldable1<f>): Helper1Monoid<f>[k];
    <f extends Generic2>(foldable: Foldable2<f>): Helper2Monoid<f>[k];
  };
};

const toDLList = (() => {
  type DLNode<a> = { prev: DLNode<a> | null; value: a; next: DLNode<a> | null };
  type DLList<a> = { first: DLNode<a>; last: DLNode<a> } | null;
  const toList: {
    <f extends Generic1>(foldable: Pick<Foldable1<f>, 'Generic1Type' | 'foldMap'>): <a>(
      fa: Type1<f, a>
    ) => DLList<a>;
    <f extends Generic2>(foldable: Pick<Foldable2<f>, 'Generic2Type' | 'foldMap'>): <a, b>(
      fab: Type2<f, a, b>
    ) => DLList<b>;
  } = ({ foldMap }: Pick<AnyFoldable, 'foldMap'>) =>
    foldMap<DLList<any>>({
      append: autocurry2((left, right) => {
        if (left === null) return right;
        if (right === null) return left;
        left.last.next = right.first;
        left.last = right.last;
        return left;
      }),
      mempty: () => null,
    } as Monoid<DLList<any>>)<unknown>(value => {
      const node = { prev: null, value, next: null };
      return { first: node, last: node };
    });
  return toList;
})();

export const foldlDefault: PartialHelper<'foldMap'>['foldl'] = (
  foldable: Pick<AnyFoldable, 'foldMap'>
) => <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (fa: unknown): b => {
  const list = toDLList(foldable as Foldable1<Generic1>)(fa);
  if (list === null) return b;
  let acc = b;
  let current: typeof list.first['next'] = list.first;
  while (current !== null) {
    acc = f(acc)(current.value as a);
    current = current.next;
  }
  return acc;
};

export const foldrDefault: PartialHelper<'foldMap'>['foldr'] = (
  foldable: Pick<AnyFoldable, 'foldMap'>
) => <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (fa: unknown): b => {
  const list = toDLList(foldable as Foldable1<Generic1>)(fa);
  if (list === null) return b;
  let acc = b;
  let current: typeof list.last['prev'] = list.last;
  while (current !== null) {
    acc = f(current.value as a)(acc);
    current = current.prev;
  }
  return acc;
};

export const foldMapDefaultL: PartialHelper<'foldl'>['foldMap'] = ({
  foldl,
}: Pick<AnyFoldable, 'foldl'>) => ({ append, mempty }: AnyMonoid) => <a>(f: (_: a) => unknown) =>
  foldl<a, unknown>(acc => x => append(acc, f(x)))(mempty());

export const foldMapDefaultR: PartialHelper<'foldr'>['foldMap'] = ({
  foldr,
}: Pick<AnyFoldable, 'foldr'>) => ({ append, mempty }: AnyMonoid) => <a>(f: (_: a) => unknown) =>
  foldr<a, unknown>(x => acc => append(f(x), acc))(mempty());

export const fold: HelperMonoid['fold'] = ({ foldMap }: AnyFoldable) => (monoid: AnyMonoid) =>
  /*#__PURE__#*/ foldMap(monoid as Monoid<unknown>)(x => x);
