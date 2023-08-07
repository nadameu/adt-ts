import { Anon, Generic1, Generic2, GenericFn2, GenericFn3, Type1 } from '../Generic';
import {
  Bind_1,
  Bind_2,
  Category_2,
  Category_3,
  Monad_1,
  Monad_2,
  Semigroupoid_2,
  Semigroupoid_3,
} from '../typeclasses';
import { TStar1, TStar2 } from './internal';

const makeCompose: {
  <f extends Generic1>(bind: Bind_1<f>): Semigroupoid_2<TStar1<f>>['compose'];
  <f extends Generic2>(bind: Bind_2<f>): Semigroupoid_3<TStar2<f>>['compose'];
} =
  <f extends Generic1>({ bind }: Anon<Bind_1<f>>) =>
  <b, c>(f: (_: b) => Type1<f, c>) =>
  <a>(g: (_: a) => Type1<f, b>) =>
  (a: a): Type1<f, c> =>
    bind(f)(g(a));

export const makeSemigroupoidStar: {
  <f extends Generic1>(bind: Bind_1<f>): Semigroupoid_2<TStar1<f>>;
  <f extends Generic2>(bind: Bind_2<f>): Semigroupoid_3<TStar2<f>>;
} = <f extends Generic1>(bind: Anon<Bind_1<f>>) =>
  ({
    compose: makeCompose(bind as Bind_1<f>),
  }) as Semigroupoid_2<GenericFn2> & Semigroupoid_3<GenericFn3>;

export const makeCategoryStar: {
  <f extends Generic1>(monad: Monad_1<f>): Category_2<TStar1<f>>;
  <f extends Generic2>(monad: Monad_2<f>): Category_3<TStar2<f>>;
} = <f extends Generic1>(monad: Anon<Monad_1<f>>) =>
  ({
    compose: makeCompose(monad as Monad_1<f>),
    identity: monad.pure,
  }) as Category_2<GenericFn2> & Category_3<GenericFn3>;
