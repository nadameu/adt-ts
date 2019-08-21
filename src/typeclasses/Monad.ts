import { autocurry2 } from '../autocurry';
import { Generic1, Generic2 } from '../Generic';
import { Applicative1, Applicative2 } from './Applicative';
import { Bind1, Bind2 } from './Bind';

export interface Monad1<f extends Generic1> extends Applicative1<f>, Bind1<f> {}

export interface Monad2<f extends Generic2> extends Applicative2<f>, Bind2<f> {}

export type Monad = Pick<
  Monad1<Generic1> & Monad2<Generic2>,
  keyof Monad1<never> & keyof Monad2<never>
>;

interface Helpers1<f extends Generic1> {
  liftM1: Monad1<f>['map'];
  ap: Monad1<f>['apply'];
}
interface Helpers2<f extends Generic2> {
  liftM1: Monad2<f>['map'];
  ap: Monad2<f>['apply'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(monad: Monad1<f>): Helpers1<f>[k];
    <f extends Generic2>(monad: Monad2<f>): Helpers2<f>[k];
  };
};
type PartialHelper<keys extends keyof Monad1<never> & keyof Monad2<never>> = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(_: Pick<Monad1<f>, 'Generic1Type' | keys>): Helpers1<f>[k];
    <f extends Generic2>(_: Pick<Monad2<f>, 'Generic2Type' | keys>): Helpers2<f>[k];
  };
};

export const liftM1: PartialHelper<'bind' | 'pure'>['liftM1'] = ({
  bind,
  pure,
}: Pick<Monad, 'bind' | 'pure'>) => autocurry2((f: Function, fa) => bind(x => pure(f(x)))(fa));

export const ap: PartialHelper<'bind' | 'pure'>['ap'] = ({
  bind,
  pure,
}: Pick<Monad, 'bind' | 'pure'>) => (ff: unknown) =>
  bind(x => bind<(_: unknown) => unknown, unknown>(f => pure(f(x)))(ff));
