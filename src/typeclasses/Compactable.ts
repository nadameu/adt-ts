import { Either } from '../Either/definitions';
import * as E from '../Either/functions/helpers';
import * as G from '../Generic';
import { compose } from '../helpers';
import { Maybe } from '../Maybe/definitions';
import { Functor_1, Functor_A } from './Functor';

export interface CompactOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  compact: <a>(fma: G.Type1<f, Maybe<a>>) => G.Type1<f, a>;
}
export interface SeparateOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  separate: <a, b>(feab: G.Type1<f, Either<a, b>>) => { left: G.Type1<f, a>; right: G.Type1<f, b> };
}
export interface Compactable_1<f extends G.Generic1> extends CompactOnly_1<f>, SeparateOnly_1<f> {}

export interface MapCompactOnly_1<f extends G.Generic1> extends Functor_1<f>, CompactOnly_1<f> {}
export interface MapSeparateOnly_1<f extends G.Generic1> extends Functor_1<f>, SeparateOnly_1<f> {}

export interface CompactOnly_A extends G.IdentifiedA {
  compact: <a>(fma: ArrayLike<Maybe<a>>) => a[];
}
export interface SeparateOnly_A extends G.IdentifiedA {
  separate: <a, b>(feab: ArrayLike<Either<a, b>>) => { left: a[]; right: b[] };
}
export interface Compactable_A extends CompactOnly_A, SeparateOnly_A {}

export interface MapCompactOnly_A extends Functor_A, CompactOnly_A {}
export interface MapSeparateOnly_A extends Functor_A, SeparateOnly_A {}

export const compactDefault: {
  <f extends G.Generic1>({ map, separate }: MapSeparateOnly_1<f>): Compactable_1<f>['compact'];
  ({ map, separate }: MapSeparateOnly_A): Compactable_A['compact'];
} =
  <f extends G.Generic1>({
    map,
    separate,
  }: G.Anon<MapSeparateOnly_1<f>>): Compactable_1<f>['compact'] =>
  fma =>
    separate(map(E.note(undefined))(fma)).right;

export const separateDefault: {
  <f extends G.Generic1>({ map, compact }: MapCompactOnly_1<f>): Compactable_1<f>['separate'];
  ({ map, compact }: MapCompactOnly_A): Compactable_A['separate'];
} =
  <f extends G.Generic1>({
    map,
    compact,
  }: G.Anon<MapCompactOnly_1<f>>): Compactable_1<f>['separate'] =>
  <a, b>(feab: G.Type1<f, Either<a, b>>) => ({
    left: compact(map(compose<Either<b, a>, Maybe<a>>(E.hush)<Either<a, b>>(E.swap))(feab)),
    right: compact(map(E.hush)(feab)),
  });
