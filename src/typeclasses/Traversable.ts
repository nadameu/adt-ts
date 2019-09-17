import { Compose_1_1 } from '../Compose/definitions';
import { makeApplicativeConst } from '../Const/instances';
import { flip, identity } from '../Fn/functions';
import { Anon, Generic1, Generic1Type, Generic2, Generic2Type, Type1, Type2 } from '../Generic';
import { applicativeIdentity } from '../Identity/instances';
import { Alternative_1, Alternative_2 } from './Alternative';
import { Applicative_1, Applicative_2 } from './Applicative';
import { Apply_1, lift2 } from './Apply';
import {
  Foldable_1,
  Foldable_2,
  FoldLOnly_1,
  FoldLOnly_2,
  FoldMapOnly_1,
  FoldMapOnly_2,
  FoldROnly_1,
  FoldROnly_2,
} from './Foldable';
import { Functor_1, Functor_2 } from './Functor';
import { Monoid_0 } from './Monoid';

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

export const traverseDefaultFoldableAlternative: {
  <f extends Generic1>(t: FoldMapOnly_1<f> & Alternative_1<f>): Traversable_1<f>['traverse'];
  <f extends Generic2>(t: FoldMapOnly_2<f> & Alternative_2<f>): Traversable_2<f>['traverse'];
} = <f extends Generic1>(
  t: Anon<FoldMapOnly_1<f> & Alternative_1<f>>
): Traversable_1<f>['traverse'] => <m extends Generic1>({
  apply,
  map,
  pure,
}: Anon<Applicative_1<m>>) => <a, b>(
  f: (_: a) => Type1<m, b>
): ((ta: Type1<f, a>) => Compose_1_1<m, f, b>) => {
  const lift = lift2({ apply, map } as Apply_1<m>);
  const monoid = {
    append: lift(t.alt),
    mempty: () => pure(t.empty()),
  } as Monoid_0<Compose_1_1<m, f, b>>;
  return t.foldMap(monoid)(a => map(t.pure)(f(a)));
};

export interface GenericCons_1<f extends Generic1> {
  cons: <a>(head: a) => (tail: Type1<f, a>) => Type1<f, a>;
  nil: <a = never>() => Type1<f, a>;
}
export interface GenericCons_2<f extends Generic2> {
  cons: <b>(head: b) => <a>(tail: Type2<f, a, b>) => Type2<f, a, b>;
  nil: <a = never, b = never>() => Type2<f, a, b>;
}

export const traverseDefaultCons: {
  <f extends Generic1>({ cons, foldr, nil }: GenericCons_1<f> & FoldROnly_1<f>): Traversable_1<
    f
  >['traverse'];
  <f extends Generic2>({ cons, foldr, nil }: GenericCons_2<f> & FoldROnly_2<f>): Traversable_2<
    f
  >['traverse'];
} = <f extends Generic1>({ cons, foldr, nil }: Anon<GenericCons_1<f> & FoldROnly_1<f>>) => <
  m extends Generic1
>({
  apply,
  map,
  pure,
}: Anon<Applicative_1<m>>) => <a, b>(
  f: (_: a) => Type1<m, b>
): ((ta: Type1<f, a>) => Type1<m, Type1<f, b>>) => {
  const lift = lift2({ apply, map } as Apply_1<m>);
  const lifted = lift(cons);
  const g = (a: a) => lifted(f(a));
  return foldr(g)(pure(nil()));
};

export interface GenericSnoc_1<f extends Generic1> {
  snoc: <a>(init: Type1<f, a>) => (last: a) => Type1<f, a>;
  nil: <a = never>() => Type1<f, a>;
}
export interface GenericSnoc_2<f extends Generic2> {
  snoc: <a, b>(init: Type2<f, a, b>) => (last: b) => Type2<f, a, b>;
  nil: <a = never, b = never>() => Type2<f, a, b>;
}

export const traverseDefaultSnoc: {
  <f extends Generic1>({ foldl, nil, snoc }: GenericSnoc_1<f> & FoldLOnly_1<f>): Traversable_1<
    f
  >['traverse'];
  <f extends Generic2>({ foldl, nil, snoc }: GenericSnoc_2<f> & FoldLOnly_2<f>): Traversable_2<
    f
  >['traverse'];
} = <f extends Generic1>({ foldl, nil, snoc }: Anon<GenericSnoc_1<f> & FoldLOnly_1<f>>) => <
  m extends Generic1
>({
  apply,
  map,
  pure,
}: Anon<Applicative_1<m>>) => <a, b>(
  f: (_: a) => Type1<m, b>
): ((ta: Type1<f, a>) => Compose_1_1<m, f, b>) => {
  const lift = lift2({ apply, map } as Apply_1<m>);
  const lifted = lift(flip(snoc));
  const g = flip((a: a) => lifted(f(a)));
  return foldl(g)(pure(nil()));
};
