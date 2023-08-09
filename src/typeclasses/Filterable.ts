import { Either, Left, Right } from '../Either/definitions';
import * as G from '../Generic';
import { compose, constant, identity } from '../helpers';
import { Just, Maybe, Nothing } from '../Maybe/definitions';
import { Compactable_1, Compactable_A, CompactOnly_1, SeparateOnly_1 } from './Compactable';
import { Functor_1, Functor_A } from './Functor';

export interface PartitionMapOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  partitionMap: Filterable1Helper<f>['partitionMap'];
}
export interface PartitionOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  partition: Filterable1Helper<f>['partition'];
}
export interface FilterMapOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  filterMap: Filterable1Helper<f>['filterMap'];
}
export interface FilterOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  filter: Filterable1Helper<f>['filter'];
}
export interface Filterable_1<f extends G.Generic1>
  extends Compactable_1<f>,
    Functor_1<f>,
    PartitionMapOnly_1<f>,
    PartitionOnly_1<f>,
    FilterMapOnly_1<f>,
    FilterOnly_1<f> {}

export interface PartitionMapOnly_A extends G.IdentifiedA {
  partitionMap: <a, b, c>(
    p: (_: a) => Either<b, c>
  ) => (fa: ArrayLike<a>) => { left: b[]; right: c[] };
}
export interface PartitionOnly_A extends G.IdentifiedA {
  partition: {
    <a, b extends a>(p: (a: a) => a is b): (fa: ArrayLike<a>) => { no: a[]; yes: a[] };
    <a>(p: (_: a) => boolean): (fa: ArrayLike<a>) => { no: a[]; yes: a[] };
  };
}
export interface FilterMapOnly_A extends G.IdentifiedA {
  filterMap: <a, b>(p: (_: a) => Maybe<b>) => (fa: ArrayLike<a>) => b[];
}
export interface FilterOnly_A extends G.IdentifiedA {
  filter: {
    <a, b extends a>(p: (a: a) => a is b): (fa: ArrayLike<a>) => b[];
    <a>(p: (_: a) => boolean): (fa: ArrayLike<a>) => a[];
  };
}
export interface Filterable_A
  extends Compactable_A,
    Functor_A,
    PartitionMapOnly_A,
    PartitionOnly_A,
    FilterMapOnly_A,
    FilterOnly_A {}

type Filterable1Helper<f extends G.Generic1> = {
  partitionMap: <a, b, c>(
    p: (_: a) => Either<b, c>
  ) => (fa: G.Type1<f, a>) => { left: G.Type1<f, b>; right: G.Type1<f, c> };
  partition: {
    <a, b extends a>(
      p: (a: a) => a is b
    ): (fa: G.Type1<f, a>) => { no: G.Type1<f, a>; yes: G.Type1<f, b> };
    <a>(p: (_: a) => boolean): (fa: G.Type1<f, a>) => { no: G.Type1<f, a>; yes: G.Type1<f, a> };
  };
  filterMap: <a, b>(p: (_: a) => Maybe<b>) => (fa: G.Type1<f, a>) => G.Type1<f, b>;
  filter: {
    <a, b extends a>(p: (a: a) => a is b): (fa: G.Type1<f, a>) => G.Type1<f, b>;
    <a>(p: (_: a) => boolean): (fa: G.Type1<f, a>) => G.Type1<f, a>;
  };
  compact: Compactable_1<f>['compact'];
  separate: Compactable_1<f>['separate'];
  cleared: <a, b = never>(fa: G.Type1<f, a>) => G.Type1<f, b>;
};
type FilterableAHelper = {
  partitionMap: <a, b, c>(
    p: (_: a) => Either<b, c>
  ) => (fa: ArrayLike<a>) => { left: b[]; right: c[] };
  partition: {
    <a, b extends a>(p: (a: a) => a is b): (fa: ArrayLike<a>) => { no: a[]; yes: a[] };
    <a>(p: (_: a) => boolean): (fa: ArrayLike<a>) => { no: a[]; yes: a[] };
  };
  filterMap: <a, b>(p: (_: a) => Maybe<b>) => (fa: ArrayLike<a>) => b[];
  filter: {
    <a, b extends a>(p: (a: a) => a is b): (fa: ArrayLike<a>) => b[];
    <a>(p: (_: a) => boolean): (fa: ArrayLike<a>) => a[];
  };
  compact: Compactable_A['compact'];
  separate: Compactable_A['separate'];
  cleared: <a, b = never>(fa: ArrayLike<a>) => b[];
};
type PartialHelper<
  keys extends keyof Filterable_1<never> & keyof Filterable_A,
  fn extends keyof Filterable1Helper<never> & keyof FilterableAHelper,
> = {
  [K in keyof Filterable1Helper<never>]: {
    <f extends G.Generic1>(
      _: Pick<Filterable_1<f>, G.Generic1Type | keys>
    ): Filterable1Helper<f>[K];
    (_: Pick<Filterable_A, G.GenericAType | keys>): FilterableAHelper[K];
  };
}[fn];

export const eitherBool: {
  <a, b extends a>(r: (a: a) => a is b): (_: a) => Either<a, b>;
  <a>(p: (_: a) => boolean): (_: a) => Either<a, a>;
} =
  <a>(p: (_: a) => boolean) =>
  (x: a) =>
    p(x) ? Right(x) : Left(x);

export const maybeBool: {
  <a, b extends a>(r: (a: a) => a is b): (_: a) => Maybe<b>;
  <a>(p: (_: a) => boolean): (_: a) => Maybe<a>;
} =
  <a>(p: (_: a) => boolean) =>
  (x: a) =>
    p(x) ? Just(x) : Nothing;
export const partitionMapDefault: PartialHelper<'map' | 'separate', 'partitionMap'> =
  <f extends G.Generic1>({
    map,
    separate,
  }: G.Anon<Functor_1<f> & SeparateOnly_1<f>>): Filterable_1<f>['partitionMap'] =>
  p =>
  fa =>
    separate(map(p)(fa));

export const partitionDefault: PartialHelper<'partitionMap', 'partition'> =
  <f extends G.Generic1>({
    partitionMap,
  }: G.Anon<PartitionMapOnly_1<f>>): Filterable_1<f>['partition'] =>
  <a>(p: (_: a) => boolean) =>
  (fa: G.Type1<f, a>) => {
    const { left: no, right: yes } = partitionMap(eitherBool(p))(fa);
    return { no, yes };
  };

export const partitionDefaultFilter: PartialHelper<'filter', 'partition'> =
  <f extends G.Generic1>({ filter }: G.Anon<FilterOnly_1<f>>): Filterable_1<f>['partition'] =>
  <a>(p: (_: a) => boolean) =>
  (fa: G.Type1<f, a>) => ({
    no: filter<a>(x => !p(x))(fa),
    yes: filter(p)(fa),
  });

export const filterMapDefault: PartialHelper<'map' | 'compact', 'filterMap'> =
  <f extends G.Generic1>({
    map,
    compact,
  }: G.Anon<CompactOnly_1<f> & Functor_1<f>>): Filterable_1<f>['filterMap'] =>
  p =>
    compose<G.Type1<f, Maybe<unknown>>, G.Type1<f, unknown>>(compact)(map(p));

export const partitionDefaultFilterMap: PartialHelper<'filterMap', 'partition'> =
  <f extends G.Generic1>({ filterMap }: G.Anon<FilterMapOnly_1<f>>): Filterable_1<f>['partition'] =>
  <a>(p: (_: a) => boolean) =>
  (fa: G.Type1<f, a>) => ({
    no: filterMap<a, a>(maybeBool(x => !p(x)))(fa),
    yes: filterMap(maybeBool(p))(fa),
  });

export const filterDefault: PartialHelper<'filterMap', 'filter'> = <f extends G.Generic1>({
  filterMap,
}: G.Anon<FilterMapOnly_1<f>>): Filterable_1<f>['filter'] =>
  compose<(_: any) => Maybe<unknown>, (fa: G.Type1<f, any>) => G.Type1<f, unknown>>(filterMap)<
    (_: any) => boolean
  >(maybeBool);

export const filterDefaultPartition: PartialHelper<'partition', 'filter'> =
  <f extends G.Generic1>({ partition }: G.Anon<PartitionOnly_1<f>>): Filterable_1<f>['filter'] =>
  <a>(p: (_: a) => boolean) =>
  (fa: G.Type1<f, a>) =>
    partition(p)(fa).yes;

export const filterDefaultPartitionMap: PartialHelper<'partitionMap', 'filter'> =
  <f extends G.Generic1>({
    partitionMap,
  }: G.Anon<PartitionMapOnly_1<f>>): Filterable_1<f>['filter'] =>
  <a>(p: (_: a) => boolean) =>
  (fa: G.Type1<f, a>) =>
    partitionMap(eitherBool(p))(fa).right;

export const cleared: PartialHelper<'filterMap', 'cleared'> = <f extends G.Generic1>({
  filterMap,
}: G.Anon<FilterMapOnly_1<f>>): (<a, b>(fa: G.Type1<f, a>) => G.Type1<f, b>) =>
  /*#__PURE__*/ filterMap(constant(Nothing));

export const compactByFilterMap: PartialHelper<'filterMap', 'compact'> = <f extends G.Generic1>({
  filterMap,
}: G.Anon<FilterMapOnly_1<f>>): Filterable_1<f>['compact'] => /*#__PURE__*/ filterMap(identity);

export const separateByPartitionMap: PartialHelper<'partitionMap', 'separate'> = <
  f extends G.Generic1,
>({
  partitionMap,
}: G.Anon<PartitionMapOnly_1<f>>): Filterable_1<f>['separate'] =>
  /*#__PURE__*/ partitionMap(identity);
