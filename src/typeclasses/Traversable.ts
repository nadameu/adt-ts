import { makeApplicativeConst } from '../Const/instances';
import { Anon, Generic1, Generic1Type, Generic2, Generic2Type, Type1, Type2 } from '../Generic';
import { applicativeIdentity } from '../Identity/instances';
import { Alternative_1, Alternative_2 } from './Alternative';
import { Applicative_1, Applicative_2, PureOnly_1, PureOnly_2 } from './Applicative';
import { Apply_1, lift2 } from './Apply';
import { Foldable_1, Foldable_2, FoldMapOnly_1, FoldMapOnly_2 } from './Foldable';
import { Functor_1, Functor_2 } from './Functor';
import { Monoid_0, Monoid_1, Monoid_2 } from './Monoid';
import { AltOnly_1, AltOnly_2 } from './Alt';
import { EmptyOnly_1, EmptyOnly_2 } from './Plus';

export interface Traversable_1<t extends Generic1> extends Functor_1<t>, Foldable_1<t> {
  traverse: Helpers1<t>['traverse'];
  sequence: Helpers1<t>['sequence'];
}

export interface Traversable_2<t extends Generic2> extends Functor_2<t>, Foldable_2<t> {
  traverse: Helpers2<t>['traverse'];
  sequence: Helpers2<t>['sequence'];
}

export interface TraverseOnly_1<t extends Generic1>
  extends Pick<Traversable_1<t>, Generic1Type | 'traverse'> {}

export interface TraverseOnly_2<t extends Generic2>
  extends Pick<Traversable_2<t>, Generic2Type | 'traverse'> {}

export interface SequenceOnly_1<t extends Generic1>
  extends Pick<Traversable_1<t>, Generic1Type | 'sequence'> {}

export interface SequenceOnly_2<t extends Generic2>
  extends Pick<Traversable_2<t>, Generic2Type | 'sequence'> {}

interface Helpers1<t extends Generic1> {
  foldMap: Traversable_1<t>['foldMap'];
  map: Traversable_1<t>['map'];
  traverse: Helper1Applicative<t>['traverse'];
  sequence: Helper1Applicative<t>['sequence'];
}
interface Helpers2<t extends Generic2> {
  foldMap: Traversable_2<t>['foldMap'];
  map: Traversable_2<t>['map'];
  traverse: Helper2Applicative<t>['traverse'];
  sequence: Helper2Applicative<t>['sequence'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <t extends Generic1>(traversable: Traversable_1<t>): Helpers1<t>[k];
    <t extends Generic2>(traversable: Traversable_2<t>): Helpers2<t>[k];
  };
};
type PartialHelper<keys extends keyof Traversable_1<never> & keyof Traversable_2<never>> = {
  [k in keyof Helpers1<never>]: {
    <t extends Generic1>(_: Pick<Traversable_1<t>, Generic1Type | keys>): Helpers1<t>[k];
    <t extends Generic2>(_: Pick<Traversable_2<t>, Generic2Type | keys>): Helpers2<t>[k];
  };
};
interface Helpers1Applicative1<t extends Generic1, m extends Generic1> {
  traverse: <a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>;
  sequence: <a>(tma: Type1<t, Type1<m, a>>) => Type1<m, Type1<t, a>>;
}
interface Helpers1Applicative2<t extends Generic1, m extends Generic2> {
  traverse: <a, b, c>(f: (_: a) => Type2<m, b, c>) => (ta: Type1<t, a>) => Type2<m, b, Type1<t, c>>;
  sequence: <a, b>(tmab: Type1<t, Type2<m, a, b>>) => Type2<m, a, Type1<t, b>>;
}
interface Helpers2Applicative1<t extends Generic2, m extends Generic1> {
  traverse: <b, c>(
    f: (_: b) => Type1<m, c>
  ) => <a>(tab: Type2<t, a, b>) => Type1<m, Type2<t, a, c>>;
  sequence: <a, b>(tamb: Type2<t, a, Type1<m, b>>) => Type1<m, Type2<t, a, b>>;
}
interface Helpers2Applicative2<t extends Generic2, m extends Generic2> {
  traverse: <a, c, d>(
    f: (_: c) => Type2<m, a, d>
  ) => <b>(tbc: Type2<t, b, c>) => Type2<m, a, Type2<t, b, d>>;
  sequence: <a, b, c>(tambc: Type2<t, a, Type2<m, b, c>>) => Type2<m, b, Type2<t, a, c>>;
}
type Helper1Applicative<t extends Generic1> = {
  [k in keyof Helpers1Applicative1<never, never>]: {
    <m extends Generic1>(applicative: Applicative_1<m>): Helpers1Applicative1<t, m>[k];
    <m extends Generic2>(applicative: Applicative_2<m>): Helpers1Applicative2<t, m>[k];
  };
};
type Helper2Applicative<t extends Generic2> = {
  [k in keyof Helpers2Applicative1<never, never>]: {
    <m extends Generic1>(applicative: Applicative_1<m>): Helpers2Applicative1<t, m>[k];
    <m extends Generic2>(applicative: Applicative_2<m>): Helpers2Applicative2<t, m>[k];
  };
};
type HelperApplicative = {
  [k in keyof Helper1Applicative<never>]: {
    <t extends Generic1>(traversable: Traversable_1<t>): Helper1Applicative<t>[k];
    <t extends Generic2>(traversable: Traversable_2<t>): Helper2Applicative<t>[k];
  };
};

export const sequenceDefault: PartialHelper<'traverse'>['sequence'] = <f extends Generic1>({
  traverse,
}: Anon<Traversable_1<f>, 'traverse'>) => <g extends Generic1>(
  applicative: Anon<Applicative_1<g>>
) => traverse(applicative as Applicative_1<g>)<Type1<g, unknown>, Type1<g, unknown>>(identity);

export const traverseDefault: PartialHelper<'map' | 'sequence'>['traverse'] = <f extends Generic1>({
  map,
  sequence,
}: Anon<Traversable_1<f>, 'map' | 'sequence'>) => <g extends Generic1>(
  applicative: Anon<Applicative_1<g>>
) => <a, b>(f: (_: a) => Type1<g, b>) => (ta: Type1<f, a>) =>
  sequence(applicative as Applicative_1<g>)(map(f)(ta));

export const foldMapDefaultByTraverse: PartialHelper<'traverse'>['foldMap'] = <f extends Generic1>({
  traverse,
}: Anon<Traversable_1<f>, 'traverse'>) => <m>(monoid: Anon<Monoid_0<m>>) =>
  traverse(makeApplicativeConst(monoid as Monoid_0<m>));

export const mapDefaultByTraverse: PartialHelper<'traverse'>['map'] = <f extends Generic1>({
  traverse,
}: Anon<Traversable_1<f>, 'traverse'>) => traverse(applicativeIdentity);

type FoldableMonoidApplicative_1<f extends Generic1> = FoldMapOnly_1<f> &
  Monoid_1<f> &
  PureOnly_1<f>;
type FoldableMonoidApplicative_2<f extends Generic2> = FoldMapOnly_2<f> &
  Monoid_2<f> &
  Applicative_2<f>;

export const traverseDefaultFoldableMonoidApplicative: {
  <t extends Generic1>(_: FoldableMonoidApplicative_1<t>): Traversable_1<t>['traverse'];
  <t extends Generic2>(_: FoldableMonoidApplicative_2<t>): Traversable_2<t>['traverse'];
} = <f extends Generic1>({
  append,
  mempty,
  foldMap,
  pure,
}: Anon<FoldableMonoidApplicative_1<f>>) => <g extends Generic1>({
  apply,
  map,
  pure: applicPure,
}: Anon<Applicative_1<g>>) => <a, b>(f: (_: a) => Type1<g, b>) =>
  foldMap({
    append: lift2({ apply, map } as Apply_1<g>)(append),
    mempty: () => applicPure(mempty()),
  } as Monoid_0<Type1<g, Type1<f, b>>>)(compose<Type1<g, b>, Type1<g, Type1<f, b>>>(map(pure))(f));

export type FoldableAlternative_1<f extends Generic1> = AltOnly_1<f> &
  EmptyOnly_1<f> &
  FoldMapOnly_1<f> &
  PureOnly_1<f>;
export type FoldableAlternative_2<f extends Generic2> = AltOnly_2<f> &
  EmptyOnly_2<f> &
  FoldMapOnly_2<f> &
  PureOnly_2<f>;

export const traverseDefaultFoldableAlternative: {
  <t extends Generic1>(_: FoldableAlternative_1<t>): Traversable_1<t>['traverse'];
  <t extends Generic2>(_: FoldableAlternative_2<t>): Traversable_2<t>['traverse'];
} = <f extends Generic1>({ alt, empty, foldMap, pure }: Anon<FoldableAlternative_1<f>>) =>
  traverseDefaultFoldableMonoidApplicative({
    append: alt,
    foldMap,
    mempty: empty,
    pure,
  } as FoldableMonoidApplicative_1<f>);
