import { Compose_1_1 } from '../Compose';
import { makeApplicativeConst } from '../Const';
import * as G from '../Generic';
import { flip, identity } from '../helpers';
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

export interface TraverseOnly_1<t extends G.Generic1> extends G.Identified1<t> {
  traverse: Helpers1<t>['traverse'];
}
export interface SequenceOnly_1<t extends G.Generic1> extends G.Identified1<t> {
  sequence: Helpers1<t>['sequence'];
}
export interface Traversable_1<t extends G.Generic1>
  extends Functor_1<t>,
    Foldable_1<t>,
    TraverseOnly_1<t>,
    SequenceOnly_1<t> {}

export interface TraverseOnly_2<t extends G.Generic2> extends G.Identified2<t> {
  traverse: Helpers2<t>['traverse'];
}
export interface SequenceOnly_2<t extends G.Generic2> extends G.Identified2<t> {
  sequence: Helpers2<t>['sequence'];
}
export interface Traversable_2<t extends G.Generic2>
  extends Functor_2<t>,
    Foldable_2<t>,
    TraverseOnly_2<t>,
    SequenceOnly_2<t> {}

export interface TraverseOnly_O extends G.IdentifiedO {
  traverse: HelpersO['traverse'];
}
export interface SequenceOnly_O extends G.IdentifiedO {
  sequence: HelpersO['sequence'];
}
export interface Traversable_O extends Functor_O, Foldable_O, TraverseOnly_O, SequenceOnly_O {}

export const makeTraversable: {
  <f extends G.Generic1>({ foldMap, foldl, foldr }: G.Anon<Traversable_1<f>>): Traversable_1<f>;
  <f extends G.Generic2>({ foldMap, foldl, foldr }: G.Anon<Traversable_2<f>>): Traversable_2<f>;
  ({ foldMap, foldl, foldr }: G.Anon<Traversable_O>): Traversable_O;
} = identity;

interface Helpers1<t extends G.Generic1> {
  foldMap: Traversable_1<t>['foldMap'];
  map: Traversable_1<t>['map'];
  traverse: Helper1Applicative<t>['traverse'];
  sequence: Helper1Applicative<t>['sequence'];
}
interface Helpers2<t extends G.Generic2> {
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
    <t extends G.Generic1>(_: Pick<Traversable_1<t>, G.Generic1Type | keys>): Helpers1<t>[k];
    <t extends G.Generic2>(_: Pick<Traversable_2<t>, G.Generic2Type | keys>): Helpers2<t>[k];
    (_: Pick<Traversable_O, G.GenericOType | keys>): HelpersO[k];
  };
};
interface Helpers1Applicative1<t extends G.Generic1, m extends G.Generic1> {
  traverse: <a, b>(f: (_: a) => G.Type1<m, b>) => (ta: G.Type1<t, a>) => G.Type1<m, G.Type1<t, b>>;
  sequence: <a>(tma: G.Type1<t, G.Type1<m, a>>) => G.Type1<m, G.Type1<t, a>>;
}
interface Helpers1Applicative2<t extends G.Generic1, m extends G.Generic2> {
  traverse: <a, b, c>(
    f: (_: a) => G.Type2<m, b, c>
  ) => (ta: G.Type1<t, a>) => G.Type2<m, b, G.Type1<t, c>>;
  sequence: <a, b>(tmab: G.Type1<t, G.Type2<m, a, b>>) => G.Type2<m, a, G.Type1<t, b>>;
}
interface Helpers2Applicative1<t extends G.Generic2, m extends G.Generic1> {
  traverse: <b, c>(
    f: (_: b) => G.Type1<m, c>
  ) => <a>(tab: G.Type2<t, a, b>) => G.Type1<m, G.Type2<t, a, c>>;
  sequence: <a, b>(tamb: G.Type2<t, a, G.Type1<m, b>>) => G.Type1<m, G.Type2<t, a, b>>;
}
interface Helpers2Applicative2<t extends G.Generic2, m extends G.Generic2> {
  traverse: <a, c, d>(
    f: (_: c) => G.Type2<m, a, d>
  ) => <b>(tbc: G.Type2<t, b, c>) => G.Type2<m, a, G.Type2<t, b, d>>;
  sequence: <a, b, c>(tambc: G.Type2<t, a, G.Type2<m, b, c>>) => G.Type2<m, b, G.Type2<t, a, c>>;
}
interface HelpersOApplicative1<m extends G.Generic1> {
  traverse: <a, b>(
    f: (_: a) => G.Type1<m, b>
  ) => <T extends Record<keyof T, a>>(ta: T) => G.Type1<m, { [k in keyof T]: b }>;
  sequence: <T extends Record<keyof T, G.Type1<m, unknown>>>(
    tma: T
  ) => G.Type1<m, { [k in keyof T]: T[k] extends G.Type1<m, infer a> ? a : never }>;
}
interface HelpersOApplicative2<m extends G.Generic2> {
  traverse: <a, b, c>(
    f: (_: b) => G.Type2<m, a, c>
  ) => <T extends Record<keyof T, b>>(ta: T) => G.Type2<m, a, { [k in keyof T]: c }>;
  sequence: <T extends Record<keyof T, G.Type2<m, unknown, unknown>>>(
    tma: T
  ) => G.Type2<
    m,
    T extends Record<keyof T, G.Type2<m, infer a, unknown>> ? a : never,
    { [k in keyof T]: T[k] extends G.Type2<m, unknown, infer b> ? b : never }
  >;
}
type Helper1Applicative<t extends G.Generic1> = {
  [k in keyof Helpers1Applicative1<never, never>]: {
    <m extends G.Generic1>(applicative: Applicative_1<m>): Helpers1Applicative1<t, m>[k];
    <m extends G.Generic2>(applicative: Applicative_2<m>): Helpers1Applicative2<t, m>[k];
  };
};
type Helper2Applicative<t extends G.Generic2> = {
  [k in keyof Helpers2Applicative1<never, never>]: {
    <m extends G.Generic1>(applicative: Applicative_1<m>): Helpers2Applicative1<t, m>[k];
    <m extends G.Generic2>(applicative: Applicative_2<m>): Helpers2Applicative2<t, m>[k];
  };
};
type HelperOApplicative = {
  [k in keyof HelpersOApplicative1<never>]: {
    <m extends G.Generic1>(applicative: Applicative_1<m>): HelpersOApplicative1<m>[k];
    <m extends G.Generic2>(applicative: Applicative_2<m>): HelpersOApplicative2<m>[k];
  };
};

export const sequenceDefault: PartialHelper<'traverse'>['sequence'] =
  <f extends G.Generic1>({ traverse }: G.Anon<Traversable_1<f>, 'traverse'>) =>
  <g extends G.Generic1>(applicative: G.Anon<Applicative_1<g>>) =>
    traverse(applicative as Applicative_1<g>)<G.Type1<g, unknown>, G.Type1<g, unknown>>(identity);

export const traverseDefault: PartialHelper<'map' | 'sequence'>['traverse'] =
  <f extends G.Generic1>({ map, sequence }: G.Anon<Traversable_1<f>, 'map' | 'sequence'>) =>
  <g extends G.Generic1>(applicative: G.Anon<Applicative_1<g>>) =>
  <a, b>(f: (_: a) => G.Type1<g, b>) =>
  (ta: G.Type1<f, a>) =>
    sequence(applicative as Applicative_1<g>)(map(f)(ta));

export const foldMapDefaultByTraverse: PartialHelper<'traverse'>['foldMap'] =
  <f extends G.Generic1>({ traverse }: G.Anon<Traversable_1<f>, 'traverse'>) =>
  <m>(monoid: G.Anon<Monoid_0<m>>) =>
    traverse(makeApplicativeConst(monoid as Monoid_0<m>));

export const mapDefaultByTraverse: PartialHelper<'traverse'>['map'] = <f extends G.Generic1>({
  traverse,
}: G.Anon<Traversable_1<f>, 'traverse'>) => traverse(applicativeIdentity);

export const traverseDefaultFoldableAlternative: {
  <f extends G.Generic1>(t: FoldMapOnly_1<f> & Alternative_1<f>): Traversable_1<f>['traverse'];
  <f extends G.Generic2>(t: FoldMapOnly_2<f> & Alternative_2<f>): Traversable_2<f>['traverse'];
} =
  <f extends G.Generic1>(
    t: G.Anon<FoldMapOnly_1<f> & Alternative_1<f>>
  ): Traversable_1<f>['traverse'] =>
  <m extends G.Generic1>({ apply, map, pure }: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, b>): ((ta: G.Type1<f, a>) => Compose_1_1<m, f, b>) => {
    const lift = lift2({ apply, map } as Apply_1<m>);
    const monoid = {
      append: lift(t.alt),
      mempty: () => pure(t.empty()),
    } as Monoid_0<Compose_1_1<m, f, b>>;
    return t.foldMap(monoid)(a => map(t.pure)(f(a)));
  };

export interface GenericCons_1<f extends G.Generic1> {
  cons: <a>(head: a) => (tail: G.Type1<f, a>) => G.Type1<f, a>;
  nil: <a = never>() => G.Type1<f, a>;
}
export interface GenericCons_2<f extends G.Generic2> {
  cons: <b>(head: b) => <a>(tail: G.Type2<f, a, b>) => G.Type2<f, a, b>;
  nil: <a = never, b = never>() => G.Type2<f, a, b>;
}

export const traverseDefaultCons: {
  <f extends G.Generic1>({
    cons,
    foldr,
    nil,
  }: GenericCons_1<f> & FoldROnly_1<f>): Traversable_1<f>['traverse'];
  <f extends G.Generic2>({
    cons,
    foldr,
    nil,
  }: GenericCons_2<f> & FoldROnly_2<f>): Traversable_2<f>['traverse'];
} =
  <f extends G.Generic1>({ cons, foldr, nil }: G.Anon<GenericCons_1<f> & FoldROnly_1<f>>) =>
  <m extends G.Generic1>({ apply, map, pure }: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, b>): ((ta: G.Type1<f, a>) => G.Type1<m, G.Type1<f, b>>) => {
    const lift = lift2({ apply, map } as Apply_1<m>);
    const lifted = lift(cons);
    const g = (a: a) => lifted(f(a));
    return foldr(g)(pure(nil()));
  };

export interface GenericSnoc_1<f extends G.Generic1> {
  snoc: <a>(init: G.Type1<f, a>) => (last: a) => G.Type1<f, a>;
  nil: <a = never>() => G.Type1<f, a>;
}
export interface GenericSnoc_2<f extends G.Generic2> {
  snoc: <a, b>(init: G.Type2<f, a, b>) => (last: b) => G.Type2<f, a, b>;
  nil: <a = never, b = never>() => G.Type2<f, a, b>;
}

export const traverseDefaultSnoc: {
  <f extends G.Generic1>({
    foldl,
    nil,
    snoc,
  }: GenericSnoc_1<f> & FoldLOnly_1<f>): Traversable_1<f>['traverse'];
  <f extends G.Generic2>({
    foldl,
    nil,
    snoc,
  }: GenericSnoc_2<f> & FoldLOnly_2<f>): Traversable_2<f>['traverse'];
} =
  <f extends G.Generic1>({ foldl, nil, snoc }: G.Anon<GenericSnoc_1<f> & FoldLOnly_1<f>>) =>
  <m extends G.Generic1>({ apply, map, pure }: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, b>): ((ta: G.Type1<f, a>) => Compose_1_1<m, f, b>) => {
    const lift = lift2({ apply, map } as Apply_1<m>);
    const lifted = lift(flip(snoc));
    const g = flip((a: a) => lifted(f(a)));
    return foldl(g)(pure(nil()));
  };

export interface UnfoldROnly_1<f extends G.Generic1> {
  unfoldr: <a, b>(f: (_: b) => Maybe<[a, b]>) => (b: b) => G.Type1<f, a>;
}
export interface UnfoldROnly_2<f extends G.Generic2> {
  unfoldr: <a, b, c>(f: (_: c) => Maybe<[b, c]>) => (b: c) => G.Type2<f, a, b>;
}

export const traverseDefaultFoldableUnfoldable: {
  <f extends G.Generic1>({
    foldr,
    unfoldr,
  }: FoldROnly_1<f> & UnfoldROnly_1<f>): Traversable_1<f>['traverse'];
  <f extends G.Generic2>({
    foldr,
    unfoldr,
  }: FoldROnly_2<f> & UnfoldROnly_2<f>): Traversable_2<f>['traverse'];
} =
  <f extends G.Generic1>({
    foldr,
    unfoldr,
  }: G.Anon<FoldROnly_1<f> & UnfoldROnly_1<f>>): Traversable_1<f>['traverse'] =>
  <m extends G.Generic1>(applicative: G.Anon<Applicative_1<m>>) =>
  <a, b>(f: (_: a) => G.Type1<m, b>) =>
  (ta: G.Type1<f, a>): G.Type1<m, G.Type1<f, b>> => {
    interface Tuple<t> {
      0: t;
      1: List<t>;
      length: 2;
    }
    type List<t> = Maybe<Tuple<t>>;
    const liftedCons = lift2(applicative as Applicative_1<m>)<b, List<b>, List<b>>(
      head => tail => Just([head, tail])
    );
    return applicative.map(unfoldr<b, List<b>>(x => x as Maybe<[b, List<b>]>))(
      foldr<a, G.Type1<m, List<b>>>((a: a) => liftedCons(f(a)))(applicative.pure(Nothing))(ta)
    );
  };
