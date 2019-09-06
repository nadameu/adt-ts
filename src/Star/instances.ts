import { Generic1, Generic2 } from '../Generic';
import { Bind, Bind_1, Bind_2 } from '../typeclasses/Bind';
import { Category_2, Category_3 } from '../typeclasses/Category';
import { Monad_1, Monad_2 } from '../typeclasses/Monad';
import { Semigroupoid_2, Semigroupoid_3 } from '../typeclasses/Semigroupoid';
import { TStar1, TStar2 } from './internal';

const makeCompose: {
  <f extends Generic1>(bind: Bind_1<f>): Semigroupoid_2<TStar1<f>>;
  <f extends Generic2>(bind: Bind_2<f>): Semigroupoid_3<TStar2<f>>;
} = (bind: Bind): any => (f: (_: any) => unknown) => (g: (_: any) => unknown) => (x: unknown) =>
  bind.bind(f)(g(x));

export const makeSemigroupoidStar: {
  <f extends Generic1>(bind: Bind_1<f>): Semigroupoid_2<TStar1<f>>;
  <f extends Generic2>(bind: Bind_2<f>): Semigroupoid_3<TStar2<f>>;
} = (bind: any): any => ({
  compose: makeCompose(bind),
});

export const makeCategoryStar: {
  <f extends Generic1>(monad: Monad_1<f>): Category_2<TStar1<f>>;
  <f extends Generic2>(monad: Monad_2<f>): Category_3<TStar2<f>>;
} = (monad: any): any => ({
  compose: makeCompose(monad),
  identity: monad.pure,
});
