import { Functor_2 } from '../typeclasses/Functor';
import { TConst, TConst0, TConst1 } from './internal';
import { Apply_2 } from '../typeclasses/Apply';
import { Semigroup_0, Semigroup_1, Semigroup } from '../typeclasses/Semigroup';
import { Generic1 } from '../Generic';
import { Monoid_1, Monoid_0, Monoid } from '../typeclasses/Monoid';
import { Applicative_2 } from '../typeclasses/Applicative';

const map = <a, b>(_: (_: a) => b) => <c>(c: c) => c;

export const functorConst = { map } as Functor_2<TConst>;
export const makeApplyConst: {
  <f extends Generic1>(semigroup: Semigroup_1<f>): Apply_2<TConst1<f>>;
  <m>(semigroup: Semigroup_0<m>): Apply_2<TConst0<m>>;
} = (semigroup: Semigroup) =>
  ({
    apply: semigroup.append,
    map,
  } as Apply_2<TConst0<unknown>>);
export const makeApplicativeConst: {
  <f extends Generic1>(monoid: Monoid_1<f>): Applicative_2<TConst1<f>>;
  <m>(monoid: Monoid_0<m>): Applicative_2<TConst0<m>>;
} = (monoid: Monoid) =>
  ({
    apply: monoid.append,
    map,
    pure: _ => monoid.mempty(),
  } as Applicative_2<TConst0<unknown>>);
