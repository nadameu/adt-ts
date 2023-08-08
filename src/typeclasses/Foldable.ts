import { monoidAdditive } from '../Additive/instances';
import { makeMonoidAlternate } from '../Alternate/instances';
import { monoidConj } from '../Conj/instances';
import { monoidDisj } from '../Disj/instances';
import { makeMonoidDual } from '../Dual/instances';
import { monoidEndo } from '../Endo/instances';
import * as G from '../Generic';
import { compose, constant, flip, identity } from '../helpers';
import { Just, Maybe, Nothing } from '../Maybe/definitions';
import { monoidMultiplicative } from '../Multiplicative/instances';
import { Ordering } from '../Ordering/definitions';
import { Monoid_0, Monoid_1 } from './Monoid';
import { Plus_1, Plus_2 } from './Plus';
import { Semigroup_0, Semigroup_1 } from './Semigroup';

export interface FoldLOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  foldl: Helpers1<f>['foldl'];
}
export interface FoldROnly_1<f extends G.Generic1> extends G.Identified1<f> {
  foldr: Helpers1<f>['foldr'];
}
export interface FoldMapOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  foldMap: Helpers1<f>['foldMap'];
}
export interface Foldable_1<f extends G.Generic1>
  extends G.Identified1<f>,
    FoldLOnly_1<f>,
    FoldROnly_1<f>,
    FoldMapOnly_1<f> {}

export interface FoldLOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  foldl: Helpers2<f>['foldl'];
}

export interface FoldROnly_2<f extends G.Generic2> extends G.Identified2<f> {
  foldr: Helpers2<f>['foldr'];
}

export interface FoldMapOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  foldMap: Helpers2<f>['foldMap'];
}
export interface Foldable_2<f extends G.Generic2>
  extends G.Identified2<f>,
    FoldLOnly_2<f>,
    FoldROnly_2<f>,
    FoldMapOnly_2<f> {}

export interface FoldLOnly_O extends G.IdentifiedO {
  foldl: HelpersO['foldl'];
}
export interface FoldROnly_O extends G.IdentifiedO {
  foldr: HelpersO['foldr'];
}
export interface FoldMapOnly_O extends G.IdentifiedO {
  foldMap: HelpersO['foldMap'];
}
export interface Foldable_O extends G.IdentifiedO, FoldLOnly_O, FoldROnly_O, FoldMapOnly_O {}

export interface FoldLOnly_A extends G.IdentifiedA {
  foldl: HelpersA['foldl'];
}
export interface FoldROnly_A extends G.IdentifiedA {
  foldr: HelpersA['foldr'];
}
export interface FoldMapOnly_A extends G.IdentifiedA {
  foldMap: HelpersA['foldMap'];
}
export interface Foldable_A extends G.IdentifiedA, FoldLOnly_A, FoldROnly_A, FoldMapOnly_A {}

export const makeFoldableInstance: {
  <f extends G.Generic1>({ foldMap, foldl, foldr }: G.Anon<Foldable_1<f>>): Foldable_1<f>;
  <f extends G.Generic2>({ foldMap, foldl, foldr }: G.Anon<Foldable_2<f>>): Foldable_2<f>;
  ({ foldMap, foldl, foldr }: G.Anon<Foldable_O>): Foldable_O;
  ({ foldMap, foldl, foldr }: G.Anon<Foldable_A>): Foldable_A;
} = identity;

interface Helpers1<f extends G.Generic1> {
  foldl: <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (fa: G.Type1<f, a>) => b;
  foldr: <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (fa: G.Type1<f, a>) => b;
  foldMap: Helper1Monoid<f>['foldMap'];
  allAny: <a>(p: (_: a) => boolean) => (fa: G.Type1<f, a>) => boolean;
  andOr: (fa: G.Type1<f, boolean>) => boolean;
  length: <a>(fa: G.Type1<f, a>) => number;
  sumProduct: (fa: G.Type1<f, number>) => number;
  maxMin: <a>(compare: (_: a) => (_: a) => Ordering) => (fa: G.Type1<f, a>) => Maybe<a>;
}
interface Helpers2<f extends G.Generic2> {
  foldl: <b, c>(f: (_: c) => (_: b) => c) => (c: c) => <a>(fab: G.Type2<f, a, b>) => c;
  foldr: <b, c>(f: (_: b) => (_: c) => c) => (c: c) => <a>(fab: G.Type2<f, a, b>) => c;
  foldMap: Helper2Monoid<f>['foldMap'];
  allAny: <b>(p: (_: b) => boolean) => <a>(fab: G.Type2<f, a, b>) => boolean;
  andOr: <a>(fab: G.Type2<f, a, boolean>) => boolean;
  length: <a, b>(fab: G.Type2<f, a, b>) => number;
  sumProduct: <a>(fab: G.Type2<f, a, number>) => number;
  maxMin: <b>(compare: (_: b) => (_: b) => Ordering) => <a>(fab: G.Type2<f, a, b>) => Maybe<b>;
}
interface HelpersO {
  foldl: <a, b>(f: (_: b) => (_: a) => b) => (b: b) => <T extends Record<keyof T, a>>(fa: T) => b;
  foldr: <a, b>(f: (_: a) => (_: b) => b) => (b: b) => <T extends Record<keyof T, a>>(fa: T) => b;
  foldMap: HelperOMonoid['foldMap'];
  allAny: <a>(p: (_: a) => boolean) => <T extends Record<keyof T, a>>(fa: T) => boolean;
  andOr: <T extends Record<keyof T, boolean>>(fa: T) => boolean;
  length: <T>(fa: T) => number;
  sumProduct: <T extends Record<keyof T, number>>(fa: T) => number;
  maxMin: <a>(
    compare: (_: a) => (_: a) => Ordering
  ) => <T extends Record<keyof T, a>>(fa: T) => Maybe<a>;
}
interface HelpersA {
  foldl: <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (fa: ArrayLike<a>) => b;
  foldr: <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (fa: ArrayLike<a>) => b;
  foldMap: HelperAMonoid['foldMap'];
  allAny: <a>(p: (_: a) => boolean) => (fa: ArrayLike<a>) => boolean;
  andOr: (fa: ArrayLike<boolean>) => boolean;
  length: <a>(fa: ArrayLike<a>) => number;
  sumProduct: (fa: ArrayLike<number>) => number;
  maxMin: <a>(compare: (_: a) => (_: a) => Ordering) => (fa: ArrayLike<a>) => Maybe<a>;
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>(foldable: Foldable_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>(foldable: Foldable_2<f>): Helpers2<f>[k];
    (foldable: Foldable_O): HelpersO[k];
    (foldable: Foldable_A): HelpersA[k];
  };
};
type PartialHelper<
  keys extends keyof Foldable_1<never> &
    keyof Foldable_2<never> &
    keyof Foldable_O &
    keyof Foldable_A,
> = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>(_: Pick<Foldable_1<f>, G.Generic1Type | keys>): Helpers1<f>[k];
    <f extends G.Generic2>(_: Pick<Foldable_2<f>, G.Generic2Type | keys>): Helpers2<f>[k];
    (_: Pick<Foldable_O, G.GenericOType | keys>): HelpersO[k];
    (_: Pick<Foldable_A, G.GenericAType | keys>): HelpersA[k];
  };
};
interface Helpers1Monoid0<f extends G.Generic1, m> {
  foldMap: <a>(f: (_: a) => m) => (fa: G.Type1<f, a>) => m;
  fold: (fm: G.Type1<f, m>) => m;
  intercalate: (sep: m) => (fm: G.Type1<f, m>) => m;
}
interface Helpers1Monoid1<f extends G.Generic1, m extends G.Generic1> {
  foldMap: <a, b>(f: (_: a) => G.Type1<m, b>) => (fa: G.Type1<f, a>) => G.Type1<m, b>;
  fold: <a>(fma: G.Type1<f, G.Type1<m, a>>) => G.Type1<m, a>;
  intercalate: <a>(sep: G.Type1<m, a>) => (fm: G.Type1<f, G.Type1<m, a>>) => G.Type1<m, a>;
}
interface Helpers2Monoid0<f extends G.Generic2, m> {
  foldMap: <b>(f: (_: b) => m) => <a>(fab: G.Type2<f, a, b>) => m;
  fold: <a>(fam: G.Type2<f, a, m>) => m;
  intercalate: (sep: m) => <a>(fm: G.Type2<f, a, m>) => m;
}
interface Helpers2Monoid1<f extends G.Generic2, m extends G.Generic1> {
  foldMap: <b, c>(f: (_: b) => G.Type1<m, c>) => <a>(fab: G.Type2<f, a, b>) => G.Type1<m, c>;
  fold: <a, b>(famb: G.Type2<f, a, G.Type1<m, b>>) => G.Type1<m, b>;
  intercalate: <b>(sep: G.Type1<m, b>) => <a>(fm: G.Type2<f, a, G.Type1<m, b>>) => G.Type1<m, b>;
}
interface HelpersOMonoid0<m> {
  foldMap: <a>(f: (_: a) => m) => <T extends Record<keyof T, a>>(fa: T) => m;
  fold: <T extends Record<keyof T, m>>(fm: T) => m;
  intercalate: (sep: m) => <T extends Record<keyof T, m>>(fm: T) => m;
}
interface HelpersOMonoid1<m extends G.Generic1> {
  foldMap: <a, b>(
    f: (_: a) => G.Type1<m, b>
  ) => <T extends Record<keyof T, a>>(fa: T) => G.Type1<m, b>;
  fold: <T extends Record<keyof T, G.Type1<m, unknown>>>(
    fma: T
  ) => G.Type1<m, T extends Record<keyof T, G.Type1<m, infer a>> ? a : never>;
  intercalate: <a>(
    sep: G.Type1<m, a>
  ) => <T extends Record<keyof T, G.Type1<m, a>>>(fm: T) => G.Type1<m, a>;
}
interface HelpersAMonoid0<m> {
  foldMap: <a>(f: (_: a) => m) => (fa: ArrayLike<a>) => m;
  fold: (fm: ArrayLike<m>) => m;
  intercalate: (sep: m) => (fm: ArrayLike<m>) => m;
}
interface HelpersAMonoid1<m extends G.Generic1> {
  foldMap: <a, b>(f: (_: a) => G.Type1<m, b>) => (fa: ArrayLike<a>) => G.Type1<m, b>;
  fold: <a>(fma: ArrayLike<G.Type1<m, a>>) => G.Type1<m, a>;
  intercalate: <a>(sep: G.Type1<m, a>) => (fm: ArrayLike<G.Type1<m, a>>) => G.Type1<m, a>;
}
type Helper1Monoid<f extends G.Generic1> = {
  [k in keyof Helpers1Monoid0<never, never>]: {
    <m extends G.Generic1>(monoid: Monoid_1<m>): Helpers1Monoid1<f, m>[k];
    <m>(monoid: Monoid_0<m>): Helpers1Monoid0<f, m>[k];
  };
};
type Helper2Monoid<f extends G.Generic2> = {
  [k in keyof Helpers2Monoid0<never, never>]: {
    <m extends G.Generic1>(monoid: Monoid_1<m>): Helpers2Monoid1<f, m>[k];
    <m>(monoid: Monoid_0<m>): Helpers2Monoid0<f, m>[k];
  };
};
type HelperOMonoid = {
  [k in keyof HelpersOMonoid0<never>]: {
    <m extends G.Generic1>(monoid: Monoid_1<m>): HelpersOMonoid1<m>[k];
    <m>(monoid: Monoid_0<m>): HelpersOMonoid0<m>[k];
  };
};
type HelperAMonoid = {
  [k in keyof HelpersAMonoid0<never>]: {
    <m extends G.Generic1>(monoid: Monoid_1<m>): HelpersAMonoid1<m>[k];
    <m>(monoid: Monoid_0<m>): HelpersAMonoid0<m>[k];
  };
};
type HelperMonoid = {
  [k in keyof Helper1Monoid<never>]: {
    <f extends G.Generic1>({ foldMap }: FoldMapOnly_1<f>): Helper1Monoid<f>[k];
    <f extends G.Generic2>({ foldMap }: FoldMapOnly_2<f>): Helper2Monoid<f>[k];
    ({ foldMap }: FoldMapOnly_O): HelperOMonoid[k];
    ({ foldMap }: FoldMapOnly_A): HelperAMonoid[k];
  };
};
type HelperMonoidL = {
  [k in keyof Helper1Monoid<never>]: {
    <f extends G.Generic1>({ foldl }: FoldLOnly_1<f>): Helper1Monoid<f>[k];
    <f extends G.Generic2>({ foldl }: FoldLOnly_2<f>): Helper2Monoid<f>[k];
    ({ foldl }: FoldLOnly_O): HelperOMonoid[k];
    ({ foldl }: FoldLOnly_A): HelperAMonoid[k];
  };
};
interface Helpers1Semigroup0<f extends G.Generic1, m> {
  surroundMap: (sep: m) => <a>(f: (_: a) => m) => (fa: G.Type1<f, a>) => m;
  surround: (sep: m) => (fm: G.Type1<f, m>) => m;
}
interface Helpers1Semigroup1<f extends G.Generic1, m extends G.Generic1> {
  surroundMap: <b>(
    sep: G.Type1<m, b>
  ) => <a>(f: (_: a) => G.Type1<m, b>) => (fa: G.Type1<f, a>) => G.Type1<m, b>;
  surround: <a>(sep: G.Type1<m, a>) => (fma: G.Type1<f, G.Type1<m, a>>) => G.Type1<m, a>;
}
interface Helpers2Semigroup0<f extends G.Generic2, m> {
  surroundMap: (sep: m) => <b>(f: (_: b) => m) => <a>(fab: G.Type2<f, a, b>) => m;
  surround: (sep: m) => <a>(fam: G.Type2<f, a, m>) => m;
}
interface Helpers2Semigroup1<f extends G.Generic2, m extends G.Generic1> {
  surroundMap: <c>(
    sep: G.Type1<m, c>
  ) => <b>(f: (_: b) => G.Type1<m, c>) => <a>(fab: G.Type2<f, a, b>) => G.Type1<m, c>;
  surround: <b>(sep: G.Type1<m, b>) => <a>(famb: G.Type2<f, a, G.Type1<m, b>>) => G.Type1<m, b>;
}
interface HelpersOSemigroup0<m> {
  surroundMap: (sep: m) => <a>(f: (_: a) => m) => <T extends Record<keyof T, a>>(fa: T) => m;
  surround: (sep: m) => <T extends Record<keyof T, m>>(fm: T) => m;
}
interface HelpersOSemigroup1<m extends G.Generic1> {
  surroundMap: <b>(
    sep: G.Type1<m, b>
  ) => <a>(f: (_: a) => G.Type1<m, b>) => <T extends Record<keyof T, a>>(fa: T) => G.Type1<m, b>;
  surround: <a>(
    sep: G.Type1<m, a>
  ) => <T extends Record<keyof T, G.Type1<m, a>>>(fma: T) => G.Type1<m, a>;
}
interface HelpersASemigroup0<m> {
  surroundMap: (sep: m) => <a>(f: (_: a) => m) => (fa: ArrayLike<a>) => m;
  surround: (sep: m) => (fm: ArrayLike<m>) => m;
}
interface HelpersASemigroup1<m extends G.Generic1> {
  surroundMap: <b>(
    sep: G.Type1<m, b>
  ) => <a>(f: (_: a) => G.Type1<m, b>) => (fa: ArrayLike<a>) => G.Type1<m, b>;
  surround: <a>(sep: G.Type1<m, a>) => (fma: ArrayLike<G.Type1<m, a>>) => G.Type1<m, a>;
}
type Helper1Semigroup<f extends G.Generic1> = {
  [k in keyof Helpers1Semigroup0<never, never>]: {
    <m extends G.Generic1>(semigroup: Semigroup_1<m>): Helpers1Semigroup1<f, m>[k];
    <m>(semigroup: Semigroup_0<m>): Helpers1Semigroup0<f, m>[k];
  };
};
type Helper2Semigroup<f extends G.Generic2> = {
  [k in keyof Helpers2Semigroup0<never, never>]: {
    <m extends G.Generic1>(semigroup: Semigroup_1<m>): Helpers2Semigroup1<f, m>[k];
    <m>(semigroup: Semigroup_0<m>): Helpers2Semigroup0<f, m>[k];
  };
};
type HelperOSemigroup = {
  [k in keyof HelpersOSemigroup0<never>]: {
    <m extends G.Generic1>(semigroup: Semigroup_1<m>): HelpersOSemigroup1<m>[k];
    <m>(semigroup: Semigroup_0<m>): HelpersOSemigroup0<m>[k];
  };
};
type HelperASemigroup = {
  [k in keyof HelpersASemigroup0<never>]: {
    <m extends G.Generic1>(semigroup: Semigroup_1<m>): HelpersASemigroup1<m>[k];
    <m>(semigroup: Semigroup_0<m>): HelpersASemigroup0<m>[k];
  };
};
type HelperSemigroup = {
  [k in keyof Helper1Semigroup<never>]: {
    <f extends G.Generic1>({ foldMap }: FoldMapOnly_1<f>): Helper1Semigroup<f>[k];
    <f extends G.Generic2>({ foldMap }: FoldMapOnly_2<f>): Helper2Semigroup<f>[k];
    ({ foldMap }: FoldMapOnly_O): HelperOSemigroup[k];
    ({ foldMap }: FoldMapOnly_A): HelperASemigroup[k];
  };
};
interface Helpers1Plus1<f extends G.Generic1, g extends G.Generic1> {
  oneOf: <a>(fga: G.Type1<f, G.Type1<g, a>>) => G.Type1<g, a>;
  oneOfMap: <a, b>(f: (_: a) => G.Type1<g, b>) => (fa: G.Type1<f, a>) => G.Type1<g, b>;
}
interface Helpers1Plus2<f extends G.Generic1, g extends G.Generic2> {
  oneOf: <a, b>(fgab: G.Type1<f, G.Type2<g, a, b>>) => G.Type2<g, a, b>;
  oneOfMap: <a, b, c>(f: (_: a) => G.Type2<g, b, c>) => (fa: G.Type1<f, a>) => G.Type2<g, b, c>;
}
interface Helpers2Plus1<f extends G.Generic2, g extends G.Generic1> {
  oneOf: <a, b>(fagb: G.Type2<f, a, G.Type1<g, b>>) => G.Type1<g, b>;
  oneOfMap: <b, c>(f: (_: b) => G.Type1<g, c>) => <a>(fab: G.Type2<f, a, b>) => G.Type1<g, c>;
}
interface Helpers2Plus2<f extends G.Generic2, g extends G.Generic2> {
  oneOf: <a, b, c>(fagbc: G.Type2<f, a, G.Type2<g, b, c>>) => G.Type2<g, b, c>;
  oneOfMap: <b, c, d>(
    f: (_: b) => G.Type2<g, c, d>
  ) => <a>(fab: G.Type2<f, a, b>) => G.Type2<g, c, d>;
}
interface HelpersOPlus1<f extends G.Generic1> {
  oneOf: <T extends Record<keyof T, G.Type1<f, unknown>>>(
    fga: T
  ) => G.Type1<f, T extends Record<keyof T, G.Type1<f, infer a>> ? a : never>;
  oneOfMap: <a, b>(
    f: (_: a) => G.Type1<f, b>
  ) => <T extends Record<keyof T, a>>(fa: T) => G.Type1<f, b>;
}
interface HelpersOPlus2<f extends G.Generic2> {
  oneOf: <T extends Record<keyof T, G.Type2<f, unknown, unknown>>>(
    fga: T
  ) => T extends Record<keyof T, G.Type2<f, infer a, infer b>>
    ? G.Type2<f, a, b>
    : G.Type2<f, never, never>;
  oneOfMap: <a, b, c>(
    f: (_: b) => G.Type2<f, a, c>
  ) => <T extends Record<keyof T, b>>(fa: T) => G.Type2<f, a, c>;
}
interface HelpersAPlus1<f extends G.Generic1> {
  oneOf: <a>(tfa: ArrayLike<G.Type1<f, a>>) => G.Type1<f, a>;
  oneOfMap: <a, b>(f: (_: a) => G.Type1<f, b>) => (fa: ArrayLike<a>) => G.Type1<f, b>;
}
interface HelpersAPlus2<f extends G.Generic2> {
  oneOf: <a, b>(tfab: ArrayLike<G.Type2<f, a, b>>) => G.Type2<f, a, b>;
  oneOfMap: <a, b, c>(f: (_: a) => G.Type2<f, b, c>) => (fa: ArrayLike<a>) => G.Type2<f, b, c>;
}
type Helper1Plus<f extends G.Generic1> = {
  [k in keyof Helpers1Plus1<never, never>]: {
    <g extends G.Generic1>(plus: Plus_1<g>): Helpers1Plus1<f, g>[k];
    <g extends G.Generic2>(plus: Plus_2<g>): Helpers1Plus2<f, g>[k];
  };
};
type Helper2Plus<f extends G.Generic2> = {
  [k in keyof Helpers2Plus1<never, never>]: {
    <g extends G.Generic1>(plus: Plus_1<g>): Helpers2Plus1<f, g>[k];
    <g extends G.Generic2>(plus: Plus_2<g>): Helpers2Plus2<f, g>[k];
  };
};
type HelperOPlus = {
  [k in keyof HelpersOPlus1<never>]: {
    <f extends G.Generic1>(plus: Plus_1<f>): HelpersOPlus1<f>[k];
    <f extends G.Generic2>(plus: Plus_2<f>): HelpersOPlus2<f>[k];
  };
};
type HelperAPlus = {
  [k in keyof Helpers1Plus1<never, never>]: {
    <f extends G.Generic1>(plus: Plus_1<f>): HelpersAPlus1<f>[k];
    <f extends G.Generic2>(plus: Plus_2<f>): HelpersAPlus2<f>[k];
  };
};
type HelperPlus = {
  [k in keyof Helper1Plus<never>]: {
    <f extends G.Generic1>({ foldMap }: FoldMapOnly_1<f>): Helper1Plus<f>[k];
    <f extends G.Generic2>({ foldMap }: FoldMapOnly_2<f>): Helper2Plus<f>[k];
    ({ foldMap }: FoldMapOnly_O): HelperOPlus[k];
    ({ foldMap }: FoldMapOnly_A): HelperAPlus[k];
  };
};

export const foldlDefault: PartialHelper<'foldMap'>['foldl'] =
  <f extends G.Generic1>({ foldMap }: G.Anon<Foldable_1<f>, 'foldMap'>) =>
  <a, b>(f: (_: b) => (_: a) => b) =>
  (b: b) =>
  (fa: G.Type1<f, a>): b =>
    foldMap(makeMonoidDual(monoidEndo))(flip(f))(fa)(b);

export const foldrDefault: PartialHelper<'foldMap'>['foldr'] =
  <f extends G.Generic1>({ foldMap }: G.Anon<Foldable_1<f>, 'foldMap'>) =>
  <a, b>(f: (_: a) => (_: b) => b) =>
  (b: b) =>
  (fa: G.Type1<f, a>): b =>
    foldMap(monoidEndo)(f)(fa)(b);

export const foldMapDefaultL: PartialHelper<'foldl'>['foldMap'] =
  <f extends G.Generic1>({ foldl }: G.Anon<Foldable_1<f>, 'foldl'>) =>
  <b>({ append, mempty }: G.Anon<Monoid_0<b>>) =>
  <a>(f: (_: a) => b) =>
    foldl<a, b>(acc => x => append(acc)(f(x)))(mempty());

export const foldMapDefaultR: PartialHelper<'foldr'>['foldMap'] =
  <f extends G.Generic1>({ foldr }: Pick<Foldable_1<f>, 'foldr'>) =>
  <b>({ append, mempty }: G.Anon<Monoid_0<b>>) =>
  <a>(f: (_: a) => b) =>
    foldr<a, b>(compose(append)(f))(mempty());

export const fold: HelperMonoid['fold'] =
  <f extends G.Generic1>({ foldMap }: G.Anon<Foldable_1<f>, 'foldMap'>) =>
  <a>(monoid: G.Anon<Monoid_0<a>>) =>
    foldMap(monoid as Monoid_0<a>)<a>(identity);

export const oneOfMap: HelperPlus['oneOfMap'] =
  <f extends G.Generic1>({ foldMap }: G.Anon<Foldable_1<f>, 'foldMap'>) =>
  <g extends G.Generic1>(
    plus: G.Anon<Plus_1<g>>
  ): (<a, b>(f: (_: a) => G.Type1<g, b>) => (fa: G.Type1<f, a>) => G.Type1<g, b>) =>
    foldMap(makeMonoidAlternate(plus as Plus_1<g>));

export const oneOf: HelperPlus['oneOf'] =
  <f extends G.Generic1>(foldable: G.Anon<Foldable_1<f>, 'foldMap'>) =>
  <g extends G.Generic1>(
    plus: G.Anon<Plus_1<g>>
  ): (<a>(fga: G.Type1<f, G.Type1<g, a>>) => G.Type1<g, a>) =>
    oneOfMap(foldable as Foldable_1<f>)(plus as Plus_1<g>)(identity);

export const intercalate: HelperMonoidL['intercalate'] =
  <f extends G.Generic1>({ foldl }: G.Anon<Foldable_1<f>, 'foldl'>) =>
  <a>({ append, mempty }: G.Anon<Monoid_0<a>, 'append' | 'mempty'>) =>
  (sep: a) =>
  (xs: G.Type1<f, a>): a => {
    type Result = { init: true; acc: a } | { init: false; acc: a };
    const go =
      (result: Result) =>
      (x: a): Result =>
        result.init
          ? { init: false, acc: x }
          : { init: false, acc: append(append(result.acc)(sep))(x) };
    return foldl(go)({ init: true, acc: mempty() })(xs).acc;
  };

export const surroundMap: HelperSemigroup['surroundMap'] =
  <f extends G.Generic1>({ foldMap }: G.Anon<Foldable_1<f>, 'foldMap'>) =>
  <m>({ append }: G.Anon<Semigroup_0<m>, 'append'>) =>
  (d: m) =>
  <a>(t: (_: a) => m) =>
  (f: G.Type1<f, a>): m => {
    const joined = (a: a) => (m: m) => append(append(d)(t(a)))(m);
    return foldMap(monoidEndo)(joined)(f)(d);
  };

export const surround: HelperSemigroup['surround'] =
  <f extends G.Generic1>(foldable: G.Anon<Foldable_1<f>, 'foldMap'>) =>
  <m>(semigroup: G.Anon<Semigroup_0<m>>) =>
  (d: m): ((f: G.Type1<f, m>) => m) =>
    surroundMap(foldable as Foldable_1<f>)(semigroup as Semigroup_0<m>)(d)(identity);

export const all: PartialHelper<'foldMap'>['allAny'] = <f extends G.Generic1>({
  foldMap,
}: G.Anon<Foldable_1<f>, 'foldMap'>): (<a>(
  p: (_: a) => boolean
) => (fa: G.Type1<f, a>) => boolean) => /*#__PURE__*/ foldMap(monoidConj);

export const and: PartialHelper<'foldMap'>['andOr'] = <f extends G.Generic1>(
  foldable: G.Anon<Foldable_1<f>, 'foldMap'>
): ((fa: G.Type1<f, boolean>) => boolean) =>
  /*#__PURE__*/ all(foldable as Foldable_1<f>)<boolean>(identity);

export const any: PartialHelper<'foldMap'>['allAny'] = <f extends G.Generic1>({
  foldMap,
}: G.Anon<Foldable_1<f>, 'foldMap'>): (<a>(
  p: (_: a) => boolean
) => (fa: G.Type1<f, a>) => boolean) => /*#__PURE__*/ foldMap(monoidDisj);

export const or: PartialHelper<'foldMap'>['andOr'] = <f extends G.Generic1>(
  foldable: G.Anon<Foldable_1<f>, 'foldMap'>
): ((fa: G.Type1<f, boolean>) => boolean) =>
  /*#__PURE__*/ any(foldable as Foldable_1<f>)<boolean>(identity);

export const length: PartialHelper<'foldMap'>['length'] = <f extends G.Generic1>({
  foldMap,
}: G.Anon<Foldable_1<f>, 'foldMap'>) => /*#__PURE__*/ foldMap(monoidAdditive)(constant(1)) as any;

export const sum: PartialHelper<'foldMap'>['sumProduct'] = <f extends G.Generic1>({
  foldMap,
}: G.Anon<Foldable_1<f>, 'foldMap'>) => /*#__PURE__*/ foldMap(monoidAdditive)<number>(identity);

export const product: PartialHelper<'foldMap'>['sumProduct'] = <f extends G.Generic1>({
  foldMap,
}: G.Anon<Foldable_1<f>, 'foldMap'>) =>
  /*#__PURE__*/ foldMap(monoidMultiplicative)<number>(identity);

export const maximumBy: PartialHelper<'foldl'>['maxMin'] =
  <f extends G.Generic1>({ foldl }: G.Anon<Foldable_1<f>, 'foldl'>) =>
  <a>(compare: (_: a) => (_: a) => Ordering): ((fa: G.Type1<f, a>) => Maybe<a>) =>
    foldl<a, Maybe<a>>(
      acc => x => (acc.isNothing ? Just(x) : compare(acc.value)(x) === Ordering.LT ? Just(x) : acc)
    )(Nothing);

export const minimumBy: PartialHelper<'foldl'>['maxMin'] =
  <f extends G.Generic1>({ foldl }: G.Anon<Foldable_1<f>, 'foldl'>) =>
  <a>(compare: (_: a) => (_: a) => Ordering): ((fa: G.Type1<f, a>) => Maybe<a>) =>
    foldl<a, Maybe<a>>(
      acc => x => (acc.isNothing ? Just(x) : compare(acc.value)(x) === Ordering.GT ? Just(x) : acc)
    )(Nothing);
