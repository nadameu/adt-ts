import { Either } from '../Either/definitions';
import { note } from '../Either/functions';
import { identity } from '../Fn/functions';
import { Anon, Generic1, Generic2, Type1, Type2 } from '../Generic';
import { applicativeIdentity } from '../Identity/instances';
import { Just, Maybe } from '../Maybe/definitions';
import { Applicative_1, Applicative_2 } from './Applicative';
import { CompactOnly_1, SeparateOnly_1 } from './Compactable';
import { Filterable_1 } from './Filterable';
import { Traversable_1, TraverseOnly_1 } from './Traversable';

export interface Witherable_1<t extends Generic1> extends Filterable_1<t>, Traversable_1<t> {
  wilt: Helpers1<t>['wilt'];
  wither: Helpers1<t>['wither'];
}

export interface WiltOnly_1<t extends Generic1>
  extends Pick<Witherable_1<t>, 'Generic1Type' | 'wilt'> {}

export interface WitherOnly_1<t extends Generic1>
  extends Pick<Witherable_1<t>, 'Generic1Type' | 'wither'> {}

interface Helpers1<t extends Generic1> {
  wilt: Helper1Applicative<t>['wilt'];
  wither: Helper1Applicative<t>['wither'];
}
interface Helpers1Applicative1<t extends Generic1, m extends Generic1> {
  wilt: <a, b, c>(
    f: (_: a) => Type1<m, Either<b, c>>
  ) => (ta: Type1<t, a>) => Type1<m, { left: Type1<t, b>; right: Type1<t, c> }>;
  wilted: <a, b>(
    ta: Type1<t, Type1<m, Either<a, b>>>
  ) => Type1<m, { left: Type1<t, a>; right: Type1<t, b> }>;
  wither: <a, b>(f: (_: a) => Type1<m, Maybe<b>>) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>;
  withered: <a>(ta: Type1<t, Type1<m, Maybe<a>>>) => Type1<m, Type1<t, a>>;
}
interface Helpers1Applicative2<t extends Generic1, m extends Generic2> {
  wilt: <a, b, c, d>(
    f: (_: a) => Type2<m, b, Either<c, d>>
  ) => (ta: Type1<t, a>) => Type2<m, b, { left: Type1<t, c>; right: Type1<t, d> }>;
  wilted: <a, b, c>(
    ta: Type1<t, Type2<m, a, Either<b, c>>>
  ) => Type2<m, a, { left: Type1<t, b>; right: Type1<t, c> }>;
  wither: <a, b, c>(
    f: (_: a) => Type2<m, b, Maybe<c>>
  ) => (ta: Type1<t, a>) => Type2<m, b, Type1<t, c>>;
  withered: <a, b>(ta: Type1<t, Type2<m, a, Maybe<b>>>) => Type2<m, a, Type1<t, b>>;
}
type Helper1Applicative<t extends Generic1> = {
  [k in keyof Helpers1Applicative1<never, never>]: {
    <m extends Generic1>(applicative: Applicative_1<m>): Helpers1Applicative1<t, m>[k];
    <m extends Generic2>(applicative: Applicative_2<m>): Helpers1Applicative2<t, m>[k];
  };
};

export const wiltDefault = <t extends Generic1>({
  separate,
  traverse,
}: SeparateOnly_1<t> & TraverseOnly_1<t>): Witherable_1<t>['wilt'] => <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => <a, b, c>(f: (_: a) => Type1<m, Either<b, c>>) => (ta: Type1<t, a>) =>
  applicative.map(separate)(traverse(applicative as Applicative_1<m>)(f)(ta));

export const witherDefault = <t extends Generic1>({
  compact,
  traverse,
}: CompactOnly_1<t> & TraverseOnly_1<t>): Witherable_1<t>['wither'] => <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => <a, b>(f: (_: a) => Type1<m, Maybe<b>>) => (ta: Type1<t, a>) =>
  applicative.map(compact)(traverse(applicative as Applicative_1<m>)(f)(ta));

export const witherByWilt = <t extends Generic1>({
  wilt,
}: WiltOnly_1<t>): Witherable_1<t>['wither'] => <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => <a, b>(f: (_: a) => Type1<m, Maybe<b>>) => (ta: Type1<t, a>) =>
  applicative.map<{ left: Maybe<void>; right: Maybe<b> }, Maybe<b>>(x => x.right)(
    wilt(applicative as Applicative_1<m>)((a: a) => applicative.map(note(undefined))(f(a)))(ta)
  );

export const partitionMapByWilt = <t extends Generic1>({
  wilt,
}: WiltOnly_1<t>): Witherable_1<t>['partitionMap'] => /*#__PURE__*/ wilt(applicativeIdentity);

export const filterMapByWither = <t extends Generic1>({
  wither,
}: WitherOnly_1<t>): Witherable_1<t>['filterMap'] => /*#__PURE__*/ wither(applicativeIdentity);

export const traverseByWither = <t extends Generic1>({
  wither,
}: WitherOnly_1<t>): Witherable_1<t>['traverse'] => <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => <a, b>(f: (_: a) => Type1<m, b>) =>
  wither(applicative as Applicative_1<m>)<a, b>(x => applicative.map(Just)(f(x)));

export const wilted = <t extends Generic1>({
  wilt,
}: WiltOnly_1<t>): Helper1Applicative<t>['wilted'] => <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => wilt(applicative as Applicative_1<m>)<Type1<m, Either<any, any>>, any, any>(identity);

export const withered = <t extends Generic1>({
  wither,
}: WitherOnly_1<t>): Helper1Applicative<t>['withered'] => <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => wither(applicative as Applicative_1<m>)<Type1<m, Maybe<any>>, any>(identity);
