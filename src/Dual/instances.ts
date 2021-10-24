import { Anon, Generic1, Generic2 } from '../Generic';
import {
  Monoid_0,
  Monoid_1,
  Monoid_2,
  Semigroup_0,
  Semigroup_1,
  Semigroup_2,
} from '../typeclasses';

const makeAppend =
  <a>({ append }: Anon<Semigroup_0<a>>) =>
  (x: a) =>
  (y: a): a =>
    append(y)(x);

export const makeSemigroupDual: {
  <f extends Generic1>(semigroup: Semigroup_1<f>): Semigroup_1<f>;
  <f extends Generic2>(semigroup: Semigroup_2<f>): Semigroup_2<f>;
  <a>(semigroup: Semigroup_0<a>): Semigroup_0<a>;
} = <a>({ append }: Anon<Semigroup_0<a>>) =>
  ({
    append: makeAppend({ append }),
  } as Semigroup_0<a> & Semigroup_1<Generic1> & Semigroup_2<Generic2>);

export const makeMonoidDual: {
  <f extends Generic1>(semigroup: Monoid_1<f>): Monoid_1<f>;
  <f extends Generic2>(semigroup: Monoid_2<f>): Monoid_2<f>;
  <a>(semigroup: Monoid_0<a>): Monoid_0<a>;
} = <a>({ append, mempty }: Anon<Monoid_0<a>>) =>
  ({
    append: makeAppend({ append }),
    mempty,
  } as Monoid_0<a> & Monoid_1<Generic1> & Monoid_2<Generic2>);
