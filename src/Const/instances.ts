import { Functor2 } from '../typeclasses/Functor';
import { TConst, TConst0, TConst1 } from './internal';
import { Apply2 } from '../typeclasses/Apply';
import { Semigroup0, Semigroup1, Semigroup } from '../typeclasses/Semigroup';
import { Generic1 } from '../Generic';
import { Monoid1, Monoid0, Monoid } from '../typeclasses/Monoid';
import { Applicative2 } from '../typeclasses/Applicative';

const map = <a, b>(_: (_: a) => b) => <c>(c: c) => c;

export const functorConst = { map } as Functor2<TConst>;
export const makeApplyConst: {
  <f extends Generic1>(semigroup: Semigroup1<f>): Apply2<TConst1<f>>;
  <m>(semigroup: Semigroup0<m>): Apply2<TConst0<m>>;
} = (semigroup: Semigroup) =>
  ({
    apply: semigroup.append,
    map,
  } as Apply2<TConst0<unknown>>);
export const makeApplicativeConst: {
  <f extends Generic1>(monoid: Monoid1<f>): Applicative2<TConst1<f>>;
  <m>(monoid: Monoid0<m>): Applicative2<TConst0<m>>;
} = (monoid: Monoid) =>
  ({
    apply: monoid.append,
    map,
    pure: _ => monoid.mempty(),
  } as Applicative2<TConst0<unknown>>);
