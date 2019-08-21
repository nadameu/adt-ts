import { Generic1, Generic2 } from '../Generic';
import { Bind, Bind1, Bind2 } from '../typeclasses/Bind';
import { Category2, Category3 } from '../typeclasses/Category';
import { Monad1, Monad2 } from '../typeclasses/Monad';
import { Semigroupoid2, Semigroupoid3 } from '../typeclasses/Semigroupoid';
import { TStar1, TStar2 } from './internal';

const makeCompose: {
  <f extends Generic1>(bind: Bind1<f>): Semigroupoid2<TStar1<f>>;
  <f extends Generic2>(bind: Bind2<f>): Semigroupoid3<TStar2<f>>;
} = (bind: Bind): any => (f: (_: any) => unknown) => (g: (_: any) => unknown) => (x: unknown) =>
  bind.bind(f)(g(x));

export const makeSemigroupoidStar: {
  <f extends Generic1>(bind: Bind1<f>): Semigroupoid2<TStar1<f>>;
  <f extends Generic2>(bind: Bind2<f>): Semigroupoid3<TStar2<f>>;
} = (bind: any): any => ({
  compose: makeCompose(bind),
});

export const makeCategoryStar: {
  <f extends Generic1>(monad: Monad1<f>): Category2<TStar1<f>>;
  <f extends Generic2>(monad: Monad2<f>): Category3<TStar2<f>>;
} = (monad: any): any => ({
  compose: makeCompose(monad),
  identity: monad.pure,
});
