import { Anon, Generic1 } from '../Generic';
import { constant } from '../helpers/constant';
import { identity } from '../helpers/identity';
import {
  Applicative_2,
  Apply_2,
  Functor_2,
  Monoid_0,
  Monoid_1,
  Semigroup_0,
  Semigroup_1,
} from '../typeclasses';
import { TConst, TConst0, TConst1 } from './internal';

const map = constant(identity);

export const functorConst = { map } as Functor_2<TConst>;
export const makeApplyConst: {
  <f extends Generic1>(semigroup: Semigroup_1<f>): Apply_2<TConst1<f>>;
  <m>(semigroup: Semigroup_0<m>): Apply_2<TConst0<m>>;
} = <m>({ append }: Anon<Semigroup_0<m>>) =>
  ({
    apply: append,
    map,
  } as Apply_2<TConst0<unknown>>);
export const makeApplicativeConst: {
  <f extends Generic1>(monoid: Monoid_1<f>): Applicative_2<TConst1<f>>;
  <m>(monoid: Monoid_0<m>): Applicative_2<TConst0<m>>;
} = <m>({ append, mempty }: Anon<Monoid_0<m>>) =>
  ({
    apply: append,
    map,
    pure: _ => mempty(),
  } as Applicative_2<TConst0<unknown>>);
