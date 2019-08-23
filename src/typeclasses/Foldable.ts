import { makeMonoidDual } from '../Dual/instances';
import { monoidEndo } from '../Endo/instances';
import { compose, flip, identity } from '../Fn/functions';
import { Generic1, Generic2, Identified1, Identified2, Type1, Type2 } from '../Generic';
import { Monoid, Monoid0, Monoid1 } from './Monoid';

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

export type Foldable = {
  [k in keyof Foldable1<never> & keyof Foldable2<never>]: Foldable1<Generic1>[k];
};

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
    <m>(monoid: Monoid0<m>): Helpers1Monoid0<f, m>[k];
    <m extends Generic1>(monoid: Monoid1<m>): Helpers1Monoid1<f, m>[k];
  };
};
type Helper2Monoid<f extends Generic2> = {
  [k in keyof Helpers2Monoid0<never, never>]: {
    <m>(monoid: Monoid0<m>): Helpers2Monoid0<f, m>[k];
    <m extends Generic1>(monoid: Monoid1<m>): Helpers2Monoid1<f, m>[k];
  };
};
type HelperMonoid = {
  [k in keyof Helper1Monoid<never>]: {
    <f extends Generic1>(foldable: Foldable1<f>): Helper1Monoid<f>[k];
    <f extends Generic2>(foldable: Foldable2<f>): Helper2Monoid<f>[k];
  };
};

export const foldlDefault: PartialHelper<'foldMap'>['foldl'] = <f extends Generic1>({
  foldMap,
}: Pick<Foldable, 'foldMap'>) => <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (
  fa: Type1<f, a>
): b => foldMap(makeMonoidDual(monoidEndo))(flip(f))(fa)(b);

export const foldrDefault: PartialHelper<'foldMap'>['foldr'] = <f extends Generic1>({
  foldMap,
}: Pick<Foldable, 'foldMap'>) => <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (
  fa: Type1<f, a>
): b => foldMap(monoidEndo)(f)(fa)(b);

export const foldMapDefaultL: PartialHelper<'foldl'>['foldMap'] = ({
  foldl,
}: Pick<Foldable, 'foldl'>) => ({ append, mempty }: Monoid) => <a>(f: (_: a) => unknown) =>
  foldl<a, unknown>(acc => x => append(acc)(f(x)))(mempty());

export const foldMapDefaultR: PartialHelper<'foldr'>['foldMap'] = ({
  foldr,
}: Pick<Foldable, 'foldr'>) => ({ append, mempty }: Monoid) => <a>(f: (_: a) => unknown) =>
  foldr<a, unknown>(compose(append)(f))(mempty());

export const fold: HelperMonoid['fold'] = ({ foldMap }: Foldable) => (monoid: Monoid) =>
  /*#__PURE__#*/ foldMap(monoid as Monoid0<unknown>)(identity);
