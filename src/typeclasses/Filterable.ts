import { Either, Left, Right } from '../Either/definitions';
import * as G from '../Generic';
import { compose, constant, identity } from '../helpers';
import { Just, Maybe, Nothing } from '../Maybe/definitions';
import { Compactable_1, CompactOnly_1, SeparateOnly_1 } from './Compactable';
import { Functor_1 } from './Functor';

export interface PartitionMapOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  partitionMap: <a, b, c>(
    p: (_: a) => Either<b, c>
  ) => (fa: G.Type1<f, a>) => { left: G.Type1<f, b>; right: G.Type1<f, c> };
}
export interface PartitionOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  partition: <a>(
    p: (_: a) => boolean
  ) => (fa: G.Type1<f, a>) => { no: G.Type1<f, a>; yes: G.Type1<f, a> };
}
export interface FilterMapOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  filterMap: <a, b>(p: (_: a) => Maybe<b>) => (fa: G.Type1<f, a>) => G.Type1<f, b>;
}
export interface FilterOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  filter: <a>(p: (_: a) => boolean) => (fa: G.Type1<f, a>) => G.Type1<f, a>;
}
export interface Filterable_1<f extends G.Generic1>
  extends Compactable_1<f>,
    Functor_1<f>,
    PartitionMapOnly_1<f>,
    PartitionOnly_1<f>,
    FilterMapOnly_1<f>,
    FilterOnly_1<f> {}

export const eitherBool: {
  <a, b extends a>(r: (x: a) => x is b): (_: a) => Either<a, b>;
  <a>(p: (_: a) => boolean): (_: a) => Either<a, a>;
} =
  <a>(p: (_: a) => boolean) =>
  (x: a) =>
    p(x) ? Right(x) : Left(x);

export const maybeBool: {
  <a, b extends a>(r: (x: a) => x is b): (_: a) => Maybe<b>;
  <a>(p: (_: a) => boolean): (_: a) => Maybe<a>;
} =
  <a>(p: (_: a) => boolean) =>
  (x: a) =>
    p(x) ? Just(x) : Nothing;

export const partitionMapDefault =
  <f extends G.Generic1>({
    map,
    separate,
  }: Functor_1<f> & SeparateOnly_1<f>): Filterable_1<f>['partitionMap'] =>
  p =>
  fa =>
    separate(map(p)(fa));

export const partitionDefault =
  <f extends G.Generic1>({ partitionMap }: PartitionMapOnly_1<f>): Filterable_1<f>['partition'] =>
  p =>
  fa => {
    const { left: no, right: yes } = partitionMap(eitherBool(p))(fa);
    return { no, yes };
  };

export const partitionDefaultFilter =
  <f extends G.Generic1>({ filter }: FilterOnly_1<f>): Filterable_1<f>['partition'] =>
  <a>(p: (_: a) => boolean) =>
  fa => ({
    no: filter<a>(x => !p(x))(fa),
    yes: filter(p)(fa),
  });

export const filterMapDefault =
  <f extends G.Generic1>({
    map,
    compact,
  }: CompactOnly_1<f> & Functor_1<f>): Filterable_1<f>['filterMap'] =>
  p =>
    compose<G.Type1<f, Maybe<unknown>>, G.Type1<f, unknown>>(compact)(map(p));

export const partitionDefaultFilterMap =
  <f extends G.Generic1>({ filterMap }: FilterMapOnly_1<f>): Filterable_1<f>['partition'] =>
  <a>(p: (_: a) => boolean) =>
  fa => ({
    no: filterMap<a, a>(maybeBool(x => !p(x)))(fa),
    yes: filterMap(maybeBool(p))(fa),
  });

export const filterDefault = <f extends G.Generic1>({
  filterMap,
}: FilterMapOnly_1<f>): Filterable_1<f>['filter'] =>
  compose<(_: any) => Maybe<unknown>, (fa: G.Type1<f, any>) => G.Type1<f, unknown>>(filterMap)<
    (_: any) => boolean
  >(maybeBool);

export const filterDefaultPartition =
  <f extends G.Generic1>({ partition }: PartitionOnly_1<f>): Filterable_1<f>['filter'] =>
  p =>
  fa =>
    partition(p)(fa).yes;

export const filterDefaultPartitionMap =
  <f extends G.Generic1>({ partitionMap }: PartitionMapOnly_1<f>): Filterable_1<f>['filter'] =>
  p =>
  fa =>
    partitionMap(eitherBool(p))(fa).right;

export const cleared = <f extends G.Generic1>({
  filterMap,
}: FilterMapOnly_1<f>): (<a, b>(fa: G.Type1<f, a>) => G.Type1<f, b>) =>
  /*#__PURE__*/ filterMap(constant(Nothing));

export const compactByFilterMap = <f extends G.Generic1>({
  filterMap,
}: FilterMapOnly_1<f>): Filterable_1<f>['compact'] => /*#__PURE__*/ filterMap(identity);

export const separateByPartitionMap = <f extends G.Generic1>({
  partitionMap,
}: PartitionMapOnly_1<f>): Filterable_1<f>['separate'] => /*#__PURE__*/ partitionMap(identity);
