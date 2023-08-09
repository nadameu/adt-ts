import { Either } from '../Either/definitions';
import * as E from '../Either/functions/helpers';
import * as G from '../Generic';
import { identity } from '../helpers';
import { applicativeIdentity } from '../Identity/instances';
import { Just, Maybe } from '../Maybe/definitions';
import { Applicative_1, Applicative_2 } from './Applicative';
import { CompactOnly_1, SeparateOnly_1 } from './Compactable';
import { Filterable_1, Filterable_A } from './Filterable';
import { Traversable_1, Traversable_A, TraverseOnly_1 } from './Traversable';

export interface WiltOnly_1<t extends G.Generic1> extends G.Identified1<t> {
  wilt: Helpers1<t>['wilt'];
}
export interface WitherOnly_1<t extends G.Generic1> extends G.Identified1<t> {
  wither: Helpers1<t>['wither'];
}
export interface Witherable_1<t extends G.Generic1>
  extends Filterable_1<t>,
    Traversable_1<t>,
    WiltOnly_1<t>,
    WitherOnly_1<t> {}

export interface WiltOnly_A extends G.IdentifiedA {
  wilt: HelpersA['wilt'];
}
export interface WitherOnly_A extends G.IdentifiedA {
  wither: HelpersA['wither'];
}
export interface Witherable_A extends Filterable_A, Traversable_A, WiltOnly_A, WitherOnly_A {}

interface Helpers1<t extends G.Generic1> extends Filterable_1<t>, Traversable_1<t> {
  wilt: Helper1Applicative<t>['wilt'];
  wilted: Helper1Applicative<t>['wilted'];
  wither: Helper1Applicative<t>['wither'];
  withered: Helper1Applicative<t>['withered'];
}
interface HelpersA extends Filterable_A, Traversable_A {
  wilt: HelperAApplicative['wilt'];
  wilted: HelperAApplicative['wilted'];
  wither: HelperAApplicative['wither'];
  withered: HelperAApplicative['withered'];
}

interface Helpers1Applicative1<t extends G.Generic1, m extends G.Generic1> {
  wilt: <a, b, c>(
    f: (_: a) => G.Type1<m, Either<b, c>>
  ) => (ta: G.Type1<t, a>) => G.Type1<m, { left: G.Type1<t, b>; right: G.Type1<t, c> }>;
  wilted: <a, b>(
    ta: G.Type1<t, G.Type1<m, Either<a, b>>>
  ) => G.Type1<m, { left: G.Type1<t, a>; right: G.Type1<t, b> }>;
  wither: <a, b>(
    f: (_: a) => G.Type1<m, Maybe<b>>
  ) => (ta: G.Type1<t, a>) => G.Type1<m, G.Type1<t, b>>;
  withered: <a>(ta: G.Type1<t, G.Type1<m, Maybe<a>>>) => G.Type1<m, G.Type1<t, a>>;
}
interface Helpers1Applicative2<t extends G.Generic1, m extends G.Generic2> {
  wilt: <a, b, c, d>(
    f: (_: a) => G.Type2<m, b, Either<c, d>>
  ) => (ta: G.Type1<t, a>) => G.Type2<m, b, { left: G.Type1<t, c>; right: G.Type1<t, d> }>;
  wilted: <a, b, c>(
    ta: G.Type1<t, G.Type2<m, a, Either<b, c>>>
  ) => G.Type2<m, a, { left: G.Type1<t, b>; right: G.Type1<t, c> }>;
  wither: <a, b, c>(
    f: (_: a) => G.Type2<m, b, Maybe<c>>
  ) => (ta: G.Type1<t, a>) => G.Type2<m, b, G.Type1<t, c>>;
  withered: <a, b>(ta: G.Type1<t, G.Type2<m, a, Maybe<b>>>) => G.Type2<m, a, G.Type1<t, b>>;
}
type Helper1Applicative<t extends G.Generic1> = {
  [k in keyof Helpers1Applicative1<never, never>]: {
    <m extends G.Generic1>(applicative: Applicative_1<m>): Helpers1Applicative1<t, m>[k];
    <m extends G.Generic2>(applicative: Applicative_2<m>): Helpers1Applicative2<t, m>[k];
  };
};

interface HelpersAApplicative1<m extends G.Generic1> {
  wilt: <a, b, c>(
    f: (_: a) => G.Type1<m, Either<b, c>>
  ) => (ta: ArrayLike<a>) => G.Type1<m, { left: b[]; right: c[] }>;
  wilted: <a, b>(
    ta: ArrayLike<G.Type1<m, Either<a, b>>>
  ) => G.Type1<m, { left: ArrayLike<a>; right: b[] }>;
  wither: <a, b>(f: (_: a) => G.Type1<m, Maybe<b>>) => (ta: ArrayLike<a>) => G.Type1<m, b[]>;
  withered: <a>(ta: ArrayLike<G.Type1<m, Maybe<a>>>) => G.Type1<m, a[]>;
}
interface HelpersAApplicative2<m extends G.Generic2> {
  wilt: <a, b, c, d>(
    f: (_: a) => G.Type2<m, b, Either<c, d>>
  ) => (ta: ArrayLike<a>) => G.Type2<m, b, { left: c[]; right: d[] }>;
  wilted: <a, b, c>(
    ta: ArrayLike<G.Type2<m, a, Either<b, c>>>
  ) => G.Type2<m, a, { left: ArrayLike<b>; right: c[] }>;
  wither: <a, b, c>(
    f: (_: a) => G.Type2<m, b, Maybe<c>>
  ) => (ta: ArrayLike<a>) => G.Type2<m, b, c[]>;
  withered: <a, b>(ta: ArrayLike<G.Type2<m, a, Maybe<b>>>) => G.Type2<m, a, b[]>;
}
type HelperAApplicative = {
  [k in keyof HelpersAApplicative1<never>]: {
    <m extends G.Generic1>(applicative: Applicative_1<m>): HelpersAApplicative1<m>[k];
    <m extends G.Generic2>(applicative: Applicative_2<m>): HelpersAApplicative2<m>[k];
  };
};

type PartialHelper<
  A extends keyof Witherable_1<never> & keyof Witherable_A,
  B extends keyof Helpers1<never> & keyof HelpersA,
> = {
  [K in keyof Helpers1<never> & keyof HelpersA]: {
    <t extends G.Generic1>(_: Pick<Witherable_1<t>, G.Generic1Type | A>): Helpers1<t>[K];
    (_: Pick<Witherable_A, G.GenericAType | A>): HelpersA[K];
  };
}[B];

export const wiltDefault: PartialHelper<'separate' | 'traverse', 'wilt'> =
  <t extends G.Generic1>({
    separate,
    traverse,
  }: G.Anon<SeparateOnly_1<t> & TraverseOnly_1<t>>): Witherable_1<t>['wilt'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b, c>(f: (_: a) => G.Type1<m, Either<b, c>>) =>
  (ta: G.Type1<t, a>) =>
    applicative.map(separate)(traverse(applicative as Applicative_1<m>)(f)(ta));

export const witherDefault: PartialHelper<'compact' | 'traverse', 'wither'> =
  <t extends G.Generic1>({
    compact,
    traverse,
  }: G.Anon<CompactOnly_1<t> & TraverseOnly_1<t>>): Witherable_1<t>['wither'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, Maybe<b>>) =>
  (ta: G.Type1<t, a>) =>
    applicative.map(compact)(traverse(applicative as Applicative_1<m>)(f)(ta));

export const witherByWilt: PartialHelper<'wilt', 'wither'> =
  <t extends G.Generic1>({ wilt }: G.Anon<WiltOnly_1<t>>): Witherable_1<t>['wither'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, Maybe<b>>) =>
  (ta: G.Type1<t, a>) =>
    applicative.map<{ left: Maybe<void>; right: Maybe<b> }, Maybe<b>>(x => x.right)(
      wilt(applicative as Applicative_1<m>)((a: a) => applicative.map(E.note(undefined))(f(a)))(ta)
    );

export const partitionMapByWilt: PartialHelper<'wilt', 'partitionMap'> = <t extends G.Generic1>({
  wilt,
}: G.Anon<WiltOnly_1<t>>): Witherable_1<t>['partitionMap'] =>
  /*#__PURE__*/ wilt(applicativeIdentity);

export const filterMapByWither: PartialHelper<'wither', 'filterMap'> = <t extends G.Generic1>({
  wither,
}: G.Anon<WitherOnly_1<t>>): Witherable_1<t>['filterMap'] =>
  /*#__PURE__*/ wither(applicativeIdentity);

export const traverseByWither: PartialHelper<'wither', 'traverse'> =
  <t extends G.Generic1>({ wither }: G.Anon<WitherOnly_1<t>>): Witherable_1<t>['traverse'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, b>) =>
    wither(applicative as Applicative_1<m>)<a, b>(x => applicative.map(Just)(f(x)));

export const wilted: PartialHelper<'wilt', 'wilted'> =
  <t extends G.Generic1>({ wilt }: G.Anon<WiltOnly_1<t>>): Helpers1<t>['wilted'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
    wilt(applicative as Applicative_1<m>)<G.Type1<m, Either<any, any>>, any, any>(identity);

export const withered: PartialHelper<'wither', 'withered'> =
  <t extends G.Generic1>({ wither }: G.Anon<WitherOnly_1<t>>): Helper1Applicative<t>['withered'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
    wither(applicative as Applicative_1<m>)<G.Type1<m, Maybe<any>>, any>(identity);
