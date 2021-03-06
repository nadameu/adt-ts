import { array } from '../Array';
import { Compose_1_1 } from '../Compose/definitions';
import { makeApplicativeConst } from '../Const/instances';
import {
  Anon,
  Generic1,
  Generic1Type,
  Generic2,
  Generic2Type,
  GenericOType,
  Type1,
  Type2,
} from '../Generic';
import { flip } from '../helpers/flip';
import { identity } from '../helpers/identity';
import { applicativeIdentity } from '../Identity/instances';
import { Just, Maybe, Nothing } from '../Maybe/definitions';
import { Alternative_1, Alternative_2 } from './Alternative';
import { Applicative_1, Applicative_2 } from './Applicative';
import { Apply_1, lift2 } from './Apply';
import {
  Foldable_1,
  Foldable_2,
  Foldable_O,
  FoldLOnly_1,
  FoldLOnly_2,
  FoldMapOnly_1,
  FoldMapOnly_2,
  FoldROnly_1,
  FoldROnly_2,
} from './Foldable';
import { Functor_1, Functor_2, Functor_O } from './Functor';
import { Monoid_0 } from './Monoid';

export interface Traversable_1<t extends Generic1> extends Functor_1<t>, Foldable_1<t> {
  traverse: Helpers1<t>['traverse'];
  sequence: Helpers1<t>['sequence'];
}

export interface Traversable_2<t extends Generic2> extends Functor_2<t>, Foldable_2<t> {
  traverse: Helpers2<t>['traverse'];
  sequence: Helpers2<t>['sequence'];
}

export interface Traversable_O extends Functor_O, Foldable_O {
  traverse: HelpersO['traverse'];
  sequence: HelpersO['sequence'];
}

export interface TraverseOnly_1<t extends Generic1>
  extends Pick<Traversable_1<t>, Generic1Type | 'traverse'> {}

export interface TraverseOnly_2<t extends Generic2>
  extends Pick<Traversable_2<t>, Generic2Type | 'traverse'> {}

export interface TraverseOnly_O extends Pick<Traversable_O, GenericOType | 'traverse'> {}

export interface SequenceOnly_1<t extends Generic1>
  extends Pick<Traversable_1<t>, Generic1Type | 'sequence'> {}

export interface SequenceOnly_2<t extends Generic2>
  extends Pick<Traversable_2<t>, Generic2Type | 'sequence'> {}

export interface SequenceOnly_O extends Pick<Traversable_O, GenericOType | 'sequence'> {}

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
interface HelpersO {
  foldMap: Traversable_O['foldMap'];
  map: Traversable_O['map'];
  traverse: HelperOApplicative['traverse'];
  sequence: HelperOApplicative['sequence'];
}
type PartialHelper<
  keys extends keyof Traversable_1<never> & keyof Traversable_2<never> & keyof Traversable_O
> = {
  [k in keyof Helpers1<never>]: {
    <t extends Generic1>(_: Pick<Traversable_1<t>, Generic1Type | keys>): Helpers1<t>[k];
    <t extends Generic2>(_: Pick<Traversable_2<t>, Generic2Type | keys>): Helpers2<t>[k];
    (_: Pick<Traversable_O, GenericOType | keys>): HelpersO[k];
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
interface HelpersOApplicative1<m extends Generic1> {
  traverse: <a, b>(
    f: (_: a) => Type1<m, b>
  ) => <T extends Record<keyof T, a>>(ta: T) => Type1<m, { [k in keyof T]: b }>;
  sequence: <T extends Record<keyof T, Type1<m, unknown>>>(
    tma: T
  ) => Type1<m, { [k in keyof T]: T[k] extends Type1<m, infer a> ? a : never }>;
}
interface HelpersOApplicative2<m extends Generic2> {
  traverse: <a, b, c>(
    f: (_: b) => Type2<m, a, c>
  ) => <T extends Record<keyof T, b>>(ta: T) => Type2<m, a, { [k in keyof T]: c }>;
  sequence: <T extends Record<keyof T, Type2<m, unknown, unknown>>>(
    tma: T
  ) => Type2<
    m,
    T extends Record<keyof T, Type2<m, infer a, unknown>> ? a : never,
    { [k in keyof T]: T[k] extends Type2<m, unknown, infer b> ? b : never }
  >;
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
type HelperOApplicative = {
  [k in keyof HelpersOApplicative1<never>]: {
    <m extends Generic1>(applicative: Applicative_1<m>): HelpersOApplicative1<m>[k];
    <m extends Generic2>(applicative: Applicative_2<m>): HelpersOApplicative2<m>[k];
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

export interface UnfoldROnly_1<f extends Generic1> {
  unfoldr: <a, b>(f: (_: b) => Maybe<[a, b]>) => (b: b) => Type1<f, a>;
}
export interface UnfoldROnly_2<f extends Generic2> {
  unfoldr: <a, b, c>(f: (_: c) => Maybe<[b, c]>) => (b: c) => Type2<f, a, b>;
}

export const traverseDefaultFoldableUnfoldable: {
  <f extends Generic1>({ foldr, unfoldr }: FoldROnly_1<f> & UnfoldROnly_1<f>): Traversable_1<
    f
  >['traverse'];
  <f extends Generic2>({ foldr, unfoldr }: FoldROnly_2<f> & UnfoldROnly_2<f>): Traversable_2<
    f
  >['traverse'];
} = <f extends Generic1>({
  foldr,
  unfoldr,
}: Anon<FoldROnly_1<f> & UnfoldROnly_1<f>>): Traversable_1<f>['traverse'] => <m extends Generic1>(
  applicative: Anon<Applicative_1<m>>
) => <a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<f, a>): Type1<m, Type1<f, b>> => {
  interface Tuple<t> {
    0: t;
    1: List<t>;
    length: 2;
  }
  type List<t> = Maybe<Tuple<t>>;
  const liftedCons = lift2(applicative as Applicative_1<m>)<b, List<b>, List<b>>(head => tail =>
    Just([head, tail])
  );
  return applicative.map(unfoldr<b, List<b>>(x => x as Maybe<[b, List<b>]>))(
    foldr<a, Type1<m, List<b>>>((a: a) => liftedCons(f(a)))(applicative.pure(Nothing))(ta)
  );
};
