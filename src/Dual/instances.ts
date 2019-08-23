import { Generic1, Generic2 } from '../Generic';
import { Monoid, Monoid0, Monoid1, Monoid2 } from '../typeclasses/Monoid';
import { Semigroup, Semigroup0, Semigroup1, Semigroup2 } from '../typeclasses/Semigroup';

const makeAppend = <a>(semigroup: Semigroup) => (x: a) => (y: a): a =>
  (semigroup as Semigroup0<a>).append(y)(x);

export const makeSemigroupDual: {
  <f extends Generic1>(semigroup: Semigroup1<f>): Semigroup1<f>;
  <f extends Generic2>(semigroup: Semigroup2<f>): Semigroup2<f>;
  <a>(semigroup: Semigroup0<a>): Semigroup0<a>;
} = <a>(semigroup: Semigroup): any =>
  ({
    append: makeAppend<a>(semigroup),
  } as Semigroup0<a>);

export const makeMonoidDual: {
  <f extends Generic1>(semigroup: Monoid1<f>): Monoid1<f>;
  <f extends Generic2>(semigroup: Monoid2<f>): Monoid2<f>;
  <a>(semigroup: Monoid0<a>): Monoid0<a>;
} = <a>(monoid: Monoid): any =>
  ({
    append: makeAppend<a>(monoid),
    mempty: (monoid as Monoid0<a>).mempty,
  } as Monoid0<a>);
