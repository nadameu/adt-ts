import { Either, Left, Right } from '../Either/definitions';
import { compose, constant } from '../Fn/functions';
import { Generic1, Type1 } from '../Generic';
import { Just, Maybe, Nothing } from '../Maybe/definitions';
import { Compactable_1, CompactMap_1, SeparateMap_1 } from './Compactable';
import { Functor_1 } from './Functor';

export interface Filterable_1<f extends Generic1> extends Compactable_1<f>, Functor_1<f> {
  partitionMap: <a, b, c>(
    p: (_: a) => Either<b, c>
  ) => (fa: Type1<f, a>) => { left: Type1<f, b>; right: Type1<f, c> };
  partition: <a>(
    p: (_: a) => boolean
  ) => (fa: Type1<f, a>) => { no: Type1<f, a>; yes: Type1<f, a> };
  filterMap: <a, b>(p: (_: a) => Maybe<b>) => (fa: Type1<f, a>) => Type1<f, b>;
  filter: <a>(p: (_: a) => boolean) => (fa: Type1<f, a>) => Type1<f, a>;
}

export const eitherBool: {
  <a, b extends a>(r: (x: a) => x is b): (_: a) => Either<a, b>;
  <a>(p: (_: a) => boolean): (_: a) => Either<a, a>;
} = <a>(p: (_: a) => boolean) => (x: a) => (p(x) ? Right(x) : Left(x));

export const maybeBool: {
  <a, b extends a>(r: (x: a) => x is b): (_: a) => Maybe<b>;
  <a>(p: (_: a) => boolean): (_: a) => Maybe<a>;
} = <a>(p: (_: a) => boolean) => (x: a) => (p(x) ? Just(x) : Nothing);

export const partitionMapDefault = <f extends Generic1>({
  map,
  separate,
}: SeparateMap_1<f>): Filterable_1<f>['partitionMap'] => p => fa => separate(map(p)(fa));

export const partitionDefault = <f extends Generic1>({
  partitionMap,
}: Pick<Filterable_1<f>, 'Generic1Type' | 'partitionMap'>): Filterable_1<
  f
>['partition'] => p => fa => {
  const { left: no, right: yes } = partitionMap(eitherBool(p))(fa);
  return { no, yes };
};

export const partitionDefaultFilter = <f extends Generic1>({
  filter,
}: Pick<Filterable_1<f>, 'Generic1Type' | 'filter'>): Filterable_1<f>['partition'] => <a>(
  p: (_: a) => boolean
) => fa => {
  return { no: filter<a>(x => !p(x))(fa), yes: filter(p)(fa) };
};

export const filterMapDefault = <f extends Generic1>({
  map,
  compact,
}: CompactMap_1<f>): Filterable_1<f>['filterMap'] => p =>
  compose<Type1<f, Maybe<unknown>>, Type1<f, unknown>>(compact)(map(p));

export const partitionDefaultFilterMap = <f extends Generic1>({
  filterMap,
}: Pick<Filterable_1<f>, 'Generic1Type' | 'filterMap'>): Filterable_1<f>['partition'] => <a>(
  p: (_: a) => boolean
) => fa => ({
  no: filterMap<a, a>(maybeBool(x => !p(x)))(fa),
  yes: filterMap(maybeBool(p))(fa),
});

export const filterDefault = <f extends Generic1>({
  filterMap,
}: Pick<Filterable_1<f>, 'Generic1Type' | 'filterMap'>): Filterable_1<f>['filter'] =>
  compose<(_: any) => Maybe<unknown>, (fa: Type1<f, any>) => Type1<f, unknown>>(filterMap)<
    (_: any) => boolean
  >(maybeBool);

export const filterDefaultPartition = <f extends Generic1>({
  partition,
}: Pick<Filterable_1<f>, 'Generic1Type' | 'partition'>): Filterable_1<f>['filter'] => p => fa =>
  partition(p)(fa).yes;

export const filterDefaultPartitionMap = <f extends Generic1>({
  partitionMap,
}: Pick<Filterable_1<f>, 'Generic1Type' | 'partitionMap'>): Filterable_1<f>['filter'] => p => fa =>
  partitionMap(eitherBool(p))(fa).right;

export const cleared = <f extends Generic1>(
  filterable: Filterable_1<f>
): (<a, b>(fa: Type1<f, a>) => Type1<f, b>) => filterable.filterMap(constant(Nothing));
