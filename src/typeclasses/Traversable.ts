import { makeApplicativeConst } from '../Const/instances';
import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { applicativeIdentity } from '../Identity/instances';
import { Alternative, Alternative1, Alternative2 } from './Alternative';
import { Applicative, Applicative1, Applicative2 } from './Applicative';
import { lift2 } from './Apply';
import { Foldable, Foldable1, Foldable2 } from './Foldable';
import { Functor1, Functor2 } from './Functor';
import { Monoid, Monoid0, Monoid1, Monoid2 } from './Monoid';
import { compose } from '../Fn/functions';

export interface Traversable1<t extends Generic1> extends Functor1<t>, Foldable1<t> {
  traverse: Helpers1<t>['traverse'];
  sequence: Helpers1<t>['sequence'];
}

export interface Traversable2<t extends Generic2> extends Functor2<t>, Foldable2<t> {
  traverse: Helpers2<t>['traverse'];
  sequence: Helpers2<t>['sequence'];
}

export type Traversable = {
  [k in keyof Traversable1<never> & keyof Traversable2<never>]: Traversable1<Generic1>[k];
};

interface Helpers1<t extends Generic1> {
  traverse: Helper1Applicative<t>['traverse'];
  sequence: Helper1Applicative<t>['sequence'];
}
interface Helpers2<t extends Generic2> {
  traverse: Helper2Applicative<t>['traverse'];
  sequence: Helper2Applicative<t>['sequence'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <t extends Generic1>(traversable: Traversable1<t>): Helpers1<t>[k];
    <t extends Generic2>(traversable: Traversable2<t>): Helpers2<t>[k];
  };
};
type PartialHelper<keys extends keyof Traversable1<never> & keyof Traversable2<never>> = {
  [k in keyof Helpers1<never>]: {
    <t extends Generic1>(_: Pick<Traversable1<t>, 'Generic1Type' | keys>): Helpers1<t>[k];
    <t extends Generic2>(_: Pick<Traversable2<t>, 'Generic2Type' | keys>): Helpers2<t>[k];
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
    <m extends Generic1>(applicative: Applicative1<m>): Helpers1Applicative1<t, m>[k];
    <m extends Generic2>(applicative: Applicative2<m>): Helpers1Applicative2<t, m>[k];
  };
};
type Helper2Applicative<t extends Generic2> = {
  [k in keyof Helpers2Applicative1<never, never>]: {
    <m extends Generic1>(applicative: Applicative1<m>): Helpers2Applicative1<t, m>[k];
    <m extends Generic2>(applicative: Applicative2<m>): Helpers2Applicative2<t, m>[k];
  };
};
type HelperApplicative = {
  [k in keyof Helper1Applicative<never>]: {
    <t extends Generic1>(traversable: Traversable1<t>): Helper1Applicative<t>[k];
    <t extends Generic2>(traversable: Traversable2<t>): Helper2Applicative<t>[k];
  };
};

export const sequenceDefault: PartialHelper<'traverse'>['sequence'] = ({
  traverse,
}: Pick<Traversable, 'traverse'>) => (applicative: Applicative) =>
  traverse(applicative as Applicative1<Generic1>)(x => x);

export const traverseDefault: PartialHelper<'map' | 'sequence'>['traverse'] = ({
  map,
  sequence,
}: Pick<Traversable, 'map' | 'sequence'>) => (applicative: Applicative) => (
  f: (_: any) => unknown
) => (ta: unknown) => sequence(applicative as Applicative1<Generic1>)(map(f)(ta));

export const foldMapDefaultByTraverse: {
  <f extends Generic1>({
    traverse,
  }: Pick<Traversable1<f>, 'Generic1Type' | 'traverse'>): Traversable1<f>['foldMap'];
  <f extends Generic2>({
    traverse,
  }: Pick<Traversable2<f>, 'Generic2Type' | 'traverse'>): Traversable2<f>['foldMap'];
} = ({ traverse }: Pick<Traversable, 'traverse'>) => (monoid: Monoid) =>
  traverse(makeApplicativeConst(monoid as Monoid0<unknown>));

export const mapDefaultByTraverse: {
  <f extends Generic1>({
    traverse,
  }: Pick<Traversable1<f>, 'Generic1Type' | 'traverse'>): Traversable1<f>['map'];
  <f extends Generic2>({
    traverse,
  }: Pick<Traversable2<f>, 'Generic2Type' | 'traverse'>): Traversable2<f>['map'];
} = ({ traverse }: Pick<Traversable, 'traverse'>) => traverse(applicativeIdentity);

export const traverseDefaultFoldableMonoidApplicative: {
  <t extends Generic1>(
    _: Pick<
      Foldable1<t> & Monoid1<t> & Applicative1<t>,
      'Generic1Type' | 'append' | 'foldMap' | 'mempty' | 'pure'
    >
  ): Traversable1<t>['traverse'];
  <t extends Generic2>(
    _: Pick<
      Foldable2<t> & Monoid2<t> & Applicative2<t>,
      'Generic2Type' | 'append' | 'foldMap' | 'mempty' | 'pure'
    >
  ): Traversable2<t>['traverse'];
} = ({
  append,
  mempty,
  foldMap,
  pure,
}: Pick<Foldable & Monoid & Applicative, 'append' | 'foldMap' | 'mempty' | 'pure'>) => (
  applicative: Applicative
) => <a>(f: (_: a) => unknown) =>
  foldMap({
    append: lift2(applicative as Applicative1<Generic1>)(append),
    mempty: () => applicative.pure(mempty()),
  } as Monoid0<unknown>)(compose(applicative.map(pure))(f));

export const traverseDefaultFoldableAlternative: {
  <t extends Generic1>(
    _: Pick<Foldable1<t> & Alternative1<t>, 'Generic1Type' | 'alt' | 'empty' | 'foldMap' | 'pure'>
  ): Traversable1<t>['traverse'];
  <t extends Generic2>(
    _: Pick<Foldable2<t> & Alternative2<t>, 'Generic2Type' | 'alt' | 'empty' | 'foldMap' | 'pure'>
  ): Traversable2<t>['traverse'];
} = ({
  alt,
  empty,
  foldMap,
  pure,
}: Pick<Foldable & Alternative, 'alt' | 'empty' | 'foldMap' | 'pure'>) =>
  traverseDefaultFoldableMonoidApplicative({
    append: alt,
    foldMap,
    mempty: empty,
    pure,
  } as Foldable1<Generic1> & Monoid1<Generic1> & Applicative1<Generic1>);
