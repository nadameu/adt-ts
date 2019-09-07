import { Either } from '../Either/definitions';
import { hush, note, swap } from '../Either/functions/helpers';
import { compose } from '../Fn/functions';
import { Generic1, Identified1, Type1 } from '../Generic';
import { Maybe } from '../Maybe/definitions';
import { Functor_1 } from './Functor';

export interface Compactable_1<f extends Generic1> extends Identified1<f> {
  compact: <a>(fma: Type1<f, Maybe<a>>) => Type1<f, a>;
  separate: <a, b>(feab: Type1<f, Either<a, b>>) => { left: Type1<f, a>; right: Type1<f, b> };
}

export type CompactMap_1<f extends Generic1> = Pick<
  Compactable_1<f> & Functor_1<f>,
  'Generic1Type' | 'map' | 'compact'
>;
export type SeparateMap_1<f extends Generic1> = Pick<
  Compactable_1<f> & Functor_1<f>,
  'Generic1Type' | 'map' | 'separate'
>;

export const compactDefault = <f extends Generic1>({
  map,
  separate,
}: SeparateMap_1<f>): Compactable_1<f>['compact'] => fma =>
  separate(map(note(undefined))(fma)).right;

export const separateDefault = <f extends Generic1>({
  map,
  compact,
}: CompactMap_1<f>): Compactable_1<f>['separate'] => <a, b>(feab: Type1<f, Either<a, b>>) => ({
  left: compact(map(compose<Either<b, a>, Maybe<a>>(hush)<Either<a, b>>(swap))(feab)),
  right: compact(map(hush)(feab)),
});
