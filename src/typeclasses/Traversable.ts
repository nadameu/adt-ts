import { Generic1, Type1 } from '../Generic';
import { Applicative1 } from './Applicative';
import { lift2 } from './Apply';
import { Foldable1 } from './Foldable';
import { Functor1 } from './Functor';
import { Monoid1 } from './Monoid';
import { Plus1 } from './Plus';

export interface Traversable1<t extends Generic1> extends Functor1<t>, Foldable1<t> {
  traverse<m extends Generic1>(
    applicative: Applicative1<m>
  ): <a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>;
  sequence<m extends Generic1>(
    applicative: Applicative1<m>
  ): <a>(tma: Type1<t, Type1<m, a>>) => Type1<m, Type1<t, a>>;
}

export const sequenceDefault = <t extends Generic1>(
  traversable: Pick<Traversable1<t>, 'Generic1Type' | 'traverse'>
): Traversable1<t>['sequence'] => applicative =>
  /*#__PURE__*/ traversable.traverse(applicative)(x => x);

export const traverseDefault = <t extends Generic1>(
  traversable: Pick<Traversable1<t>, 'Generic1Type' | 'map' | 'sequence'>
): Traversable1<t>['traverse'] => applicative => f => ta =>
  traversable.sequence(applicative)(traversable.map(f)(ta));

export const traverseDefaultFoldablePlus = <t extends Generic1>(
  foldablePlus: Pick<Foldable1<t> & Plus1<t>, 'Generic1Type' | 'alt' | 'empty' | 'foldMap'>
): Traversable1<t>['traverse'] => <m extends Generic1>(
  applicative: Applicative1<m>
): (<a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>) => {
  const liftedAlt = /*#__PURE__*/ lift2(applicative)(
    <a>(fx: Type1<t, a>) => (fy: Type1<t, a>): Type1<t, a> => foldablePlus.alt(fx, fy)
  );
  return /*#__PURE__*/ foldablePlus.foldMap({
    NotGenericType: (undefined as unknown) as Type1<m, Type1<t, unknown>>,
    append: (x, y) => liftedAlt(x)(y),
    mempty: () => applicative.pure(foldablePlus.empty()),
  });
};

export const traverseDefaultFoldableMonoid = <t extends Generic1>(
  foldableMonoid: Pick<Foldable1<t> & Monoid1<t>, 'Generic1Type' | 'append' | 'foldMap' | 'mempty'>
): Traversable1<t>['traverse'] => <m extends Generic1>(
  applicative: Applicative1<m>
): (<a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>) => {
  const liftedAppend = /*#__PURE__*/ lift2(applicative)(
    <a>(fx: Type1<t, a>) => (fy: Type1<t, a>): Type1<t, a> => foldableMonoid.append(fx, fy)
  );
  return /*#__PURE__*/ foldableMonoid.foldMap({
    NotGenericType: (undefined as unknown) as Type1<m, Type1<t, unknown>>,
    append: (x, y) => liftedAppend(x)(y),
    mempty: () => applicative.pure(foldableMonoid.mempty()),
  });
};
