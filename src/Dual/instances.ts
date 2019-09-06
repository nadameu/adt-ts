import { Generic1, Generic2 } from '../Generic';
import { Monoid, Monoid_0, Monoid_1, Monoid_2 } from '../typeclasses/Monoid';
import { Semigroup, Semigroup_0, Semigroup_1, Semigroup_2 } from '../typeclasses/Semigroup';

const makeAppend = <a>(semigroup: Semigroup) => (x: a) => (y: a): a =>
  (semigroup as Semigroup_0<a>).append(y)(x);

export const makeSemigroupDual: {
  <f extends Generic1>(semigroup: Semigroup_1<f>): Semigroup_1<f>;
  <f extends Generic2>(semigroup: Semigroup_2<f>): Semigroup_2<f>;
  <a>(semigroup: Semigroup_0<a>): Semigroup_0<a>;
} = <a>(semigroup: Semigroup): any =>
  ({
    append: makeAppend<a>(semigroup),
  } as Semigroup_0<a>);

export const makeMonoidDual: {
  <f extends Generic1>(semigroup: Monoid_1<f>): Monoid_1<f>;
  <f extends Generic2>(semigroup: Monoid_2<f>): Monoid_2<f>;
  <a>(semigroup: Monoid_0<a>): Monoid_0<a>;
} = <a>(monoid: Monoid): any =>
  ({
    append: makeAppend<a>(monoid),
    mempty: (monoid as Monoid_0<a>).mempty,
  } as Monoid_0<a>);
