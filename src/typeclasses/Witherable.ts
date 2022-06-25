import { Either } from '../Either/definitions';
import * as E from '../Either/functions/helpers';
import * as G from '../Generic';
import { identity } from '../helpers';
import { applicativeIdentity } from '../Identity/instances';
import { Just, Maybe } from '../Maybe/definitions';
import { Applicative_1, Applicative_2 } from './Applicative';
import { CompactOnly_1, SeparateOnly_1 } from './Compactable';
import { Filterable_1 } from './Filterable';
import { Traversable_1, TraverseOnly_1 } from './Traversable';

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

interface Helpers1<t extends G.Generic1> {
  wilt: Helper1Applicative<t>['wilt'];
  wither: Helper1Applicative<t>['wither'];
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

export const wiltDefault =
  <t extends G.Generic1>({
    separate,
    traverse,
  }: SeparateOnly_1<t> & TraverseOnly_1<t>): Witherable_1<t>['wilt'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b, c>(f: (_: a) => G.Type1<m, Either<b, c>>) =>
  (ta: G.Type1<t, a>) =>
    applicative.map(separate)(traverse(applicative as Applicative_1<m>)(f)(ta));

export const witherDefault =
  <t extends G.Generic1>({
    compact,
    traverse,
  }: CompactOnly_1<t> & TraverseOnly_1<t>): Witherable_1<t>['wither'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, Maybe<b>>) =>
  (ta: G.Type1<t, a>) =>
    applicative.map(compact)(traverse(applicative as Applicative_1<m>)(f)(ta));

export const witherByWilt =
  <t extends G.Generic1>({ wilt }: WiltOnly_1<t>): Witherable_1<t>['wither'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, Maybe<b>>) =>
  (ta: G.Type1<t, a>) =>
    applicative.map<{ left: Maybe<void>; right: Maybe<b> }, Maybe<b>>(x => x.right)(
      wilt(applicative as Applicative_1<m>)((a: a) => applicative.map(E.note(undefined))(f(a)))(ta)
    );

export const partitionMapByWilt = <t extends G.Generic1>({
  wilt,
}: WiltOnly_1<t>): Witherable_1<t>['partitionMap'] => /*#__PURE__*/ wilt(applicativeIdentity);

export const filterMapByWither = <t extends G.Generic1>({
  wither,
}: WitherOnly_1<t>): Witherable_1<t>['filterMap'] => /*#__PURE__*/ wither(applicativeIdentity);

export const traverseByWither =
  <t extends G.Generic1>({ wither }: WitherOnly_1<t>): Witherable_1<t>['traverse'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, b>) =>
    wither(applicative as Applicative_1<m>)<a, b>(x => applicative.map(Just)(f(x)));

export const wilted =
  <t extends G.Generic1>({ wilt }: WiltOnly_1<t>): Helper1Applicative<t>['wilted'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
    wilt(applicative as Applicative_1<m>)<G.Type1<m, Either<any, any>>, any, any>(identity);

export const withered =
  <t extends G.Generic1>({ wither }: WitherOnly_1<t>): Helper1Applicative<t>['withered'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
    wither(applicative as Applicative_1<m>)<G.Type1<m, Maybe<any>>, any>(identity);
