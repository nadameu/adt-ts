import { Generic1, Identified1, Type1 } from '../Generic';
import { Monoid, Monoid1 } from './Monoid';

export interface Foldable1<f extends Generic1> extends Identified1<f> {
  foldl: <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (fa: Type1<f, a>) => b;
  foldr: <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (fa: Type1<f, a>) => b;
  foldMap<m extends Generic1>(
    monoid: Monoid1<m>
  ): <a, b>(f: (_: a) => Type1<m, b>) => (fa: Type1<f, a>) => Type1<m, b>;
  foldMap<m>(monoid: Monoid<m>): <a>(f: (_: a) => m) => (fa: Type1<f, a>) => m;
}

const toDLList = /*#__PURE__*/ (() => {
  type DLNode<a> = { prev: DLNode<a> | null; value: a; next: DLNode<a> | null };
  type DLList<a> = { first: DLNode<a>; last: DLNode<a> } | null;
  return <f extends Generic1>(
    foldable: Pick<Foldable1<f>, 'Generic1Type' | 'foldMap'>
  ): (<a>(fa: Type1<f, a>) => DLList<a>) =>
    foldable.foldMap<DLList<unknown>>({
      NotGenericType: (undefined as unknown) as DLList<unknown>,
      append: (left, right) => {
        if (left === null) return right;
        if (right === null) return left;
        left.last.next = right.first;
        left.last = right.last;
        return left;
      },
      mempty: () => null,
    })<unknown>(value =>
      (node => ({ first: node, last: node }))({ prev: null, value, next: null })
    ) as <a>(fa: Type1<f, a>) => DLList<a>;
})();

export const foldlDefault = <f extends Generic1>(
  foldable: Pick<Foldable1<f>, 'Generic1Type' | 'foldMap'>
): Foldable1<f>['foldl'] => <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (fa: Type1<f, a>): b => {
  const list = toDLList(foldable)(fa);
  if (list === null) return b;
  let acc = b;
  let current: typeof list.first['next'] = list.first;
  while (current !== null) {
    acc = f(acc)(current.value);
    current = current.next;
  }
  return acc;
};

export const foldrDefault = <f extends Generic1>(
  foldable: Pick<Foldable1<f>, 'Generic1Type' | 'foldMap'>
): Foldable1<f>['foldr'] => <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (fa: Type1<f, a>): b => {
  const list = toDLList(foldable)(fa);
  if (list === null) return b;
  let acc = b;
  let current: typeof list.last['prev'] = list.last;
  while (current !== null) {
    acc = f(current.value)(acc);
    current = current.prev;
  }
  return acc;
};

export const foldMapDefaultL = <f extends Generic1>(
  foldable: Pick<Foldable1<f>, 'Generic1Type' | 'foldl'>
): Foldable1<f>['foldMap'] => <m>(monoid: Monoid<m> | Monoid1<any>) => <a>(f: (_: a) => m) =>
  foldable.foldl<a, m>(acc => x => monoid.append(acc, f(x)))(monoid.mempty());

export const foldMapDefaultR = <f extends Generic1>(
  foldable: Pick<Foldable1<f>, 'Generic1Type' | 'foldr'>
): Foldable1<f>['foldMap'] => <m>(monoid: Monoid<m> | Monoid1<any>) => <a>(f: (_: a) => m) =>
  foldable.foldr<a, m>(x => acc => monoid.append(f(x), acc))(monoid.mempty());

export const fold = <f extends Generic1>(
  foldable: Foldable1<f>
): {
  <m extends Generic1>(monoid: Monoid1<m>): <a>(fa: Type1<f, Type1<m, a>>) => Type1<m, a>;
  <m>(monoid: Monoid<m>): (fa: Type1<f, m>) => m;
} => <m>(monoid: Monoid<m> | Monoid1<any>): ((fa: Type1<f, m>) => m) =>
  /*#__PURE__#*/ foldable.foldMap(monoid as Monoid<m>)(x => x);
