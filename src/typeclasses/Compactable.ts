import { Either } from '../Either/definitions';
import { hush, note, swap } from '../Either/functions';
import { Generic1, Identified1, Type1 } from '../Generic';
import { Just, Maybe, Nothing } from '../Maybe/definitions';
import { Functor1 } from './Functor';
import { compose } from '../Fn/functions';

export interface Compactable1<f extends Generic1> extends Identified1<f> {
  compact: <a>(fma: Type1<f, Maybe<a>>) => Type1<f, a>;
  separate: <a, b>(feab: Type1<f, Either<a, b>>) => { left: Type1<f, a>; right: Type1<f, b> };
}

export const compactDefault = <f extends Generic1>({
  map,
  separate,
}: Pick<Functor1<f> & Compactable1<f>, 'Generic1Type' | 'map' | 'separate'>): Compactable1<
  f
>['compact'] => fma => separate(map(note(undefined))(fma)).right;

export const separateDefault = <f extends Generic1>({
  map,
  compact,
}: Pick<Functor1<f> & Compactable1<f>, 'Generic1Type' | 'map' | 'compact'>): Compactable1<
  f
>['separate'] => <a, b>(feab: Type1<f, Either<a, b>>) => ({
  left: compact(map(compose<Either<b, a>, Maybe<a>>(hush)<Either<a, b>>(swap))(feab)),
  right: compact(map(hush)(feab)),
});
