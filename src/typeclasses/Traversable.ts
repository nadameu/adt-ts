import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { AnyApplicative, Applicative1, Applicative2 } from './Applicative';
import { lift2 } from './Apply';
import { AnyFoldable, Foldable1, Foldable2 } from './Foldable';
import { Functor1, Functor2 } from './Functor';
import { Monoid, Monoid1 } from './Monoid';
import { AnyPlus, Plus1, Plus2 } from './Plus';

export interface Traversable1<t extends Generic1> extends Functor1<t>, Foldable1<t> {
  traverse: Helpers1<t>['traverse'];
  sequence: Helpers1<t>['sequence'];
}

export interface Traversable2<t extends Generic2> extends Functor2<t>, Foldable2<t> {
  traverse: Helpers2<t>['traverse'];
  sequence: Helpers2<t>['sequence'];
}

export type AnyTraversable = Pick<
  Traversable1<Generic1> & Traversable2<Generic2>,
  keyof Traversable1<never> & keyof Traversable2<never>
>;

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

export const sequenceDefault: PartialHelper<'traverse'>['sequence'] = (
  traversable: Pick<AnyTraversable, 'traverse'>
) => (applicative: AnyApplicative) =>
  /*#__PURE__*/ traversable.traverse(applicative as Applicative1<Generic1>)<unknown, unknown>(
    x => x
  );

export const traverseDefault: PartialHelper<'map' | 'sequence'>['traverse'] = (
  traversable: Pick<AnyTraversable, 'map' | 'sequence'>
) => (applicative: AnyApplicative) => (f: (_: any) => unknown) => (ta: unknown) =>
  traversable.sequence(applicative as Applicative1<Generic1>)(traversable.map(f)(ta));

export const traverseDefaultFoldablePlus: {
  <t extends Generic1>(
    foldablePlus: Pick<Foldable1<t> & Plus1<t>, 'Generic1Type' | 'alt' | 'empty' | 'foldMap'>
  ): Helper1Applicative<t>['traverse'];
  <t extends Generic2>(
    foldablePlus: Pick<Foldable2<t> & Plus2<t>, 'Generic2Type' | 'alt' | 'empty' | 'foldMap'>
  ): Helper2Applicative<t>['traverse'];
} = (foldablePlus: Pick<AnyFoldable & AnyPlus, 'alt' | 'empty' | 'foldMap'>) => (
  applicative: AnyApplicative
) => {
  const liftedAlt = /*#__PURE__*/ lift2(applicative as Applicative1<Generic1>)(
    (fx: unknown) => (fy: unknown): unknown => foldablePlus.alt(fx, fy)
  );
  return /*#__PURE__*/ foldablePlus.foldMap({
    append: (x, y) => liftedAlt(x)(y),
    mempty: () => applicative.pure(foldablePlus.empty()),
  } as Monoid<unknown>);
};

export const traverseDefaultFoldableMonoid = <t extends Generic1>(
  foldableMonoid: Pick<Foldable1<t> & Monoid1<t>, 'Generic1Type' | 'append' | 'mempty' | 'foldMap'>
): Helper1Applicative<t>['traverse'] => (applicative: AnyApplicative) => {
  const liftedAlt = /*#__PURE__*/ lift2(applicative as Applicative1<Generic1>)(
    <a>(fx: Type1<t, a>) => (fy: Type1<t, a>): Type1<t, a> => foldableMonoid.append(fx, fy)
  );
  return /*#__PURE__*/ foldableMonoid.foldMap({
    append: (x, y) => liftedAlt(x)(y),
    mempty: () => applicative.pure(foldableMonoid.mempty()),
  } as Monoid<unknown>);
};
