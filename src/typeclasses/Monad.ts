import { Generic1, Generic2 } from '../Generic';
import { thrush } from '../thrush';
import { Applicative1, Applicative2 } from './Applicative';
import { Bind1, Bind2 } from './Bind';
import { compose } from '../Fn/functions';

export interface Monad1<f extends Generic1> extends Applicative1<f>, Bind1<f> {}

export interface Monad2<f extends Generic2> extends Applicative2<f>, Bind2<f> {}

export type Monad = {
  [k in keyof Monad1<never> & keyof Monad2<never>]: Monad1<Generic1>[k];
};

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
}: Pick<Monad, 'bind' | 'pure'>) => (f: (_: any) => unknown) => bind(compose(pure)(f));

export const ap: PartialHelper<'bind' | 'pure'>['ap'] = (bind: Pick<Monad, 'bind' | 'pure'>) => (
  ff: unknown
) => bind.bind(x => liftM1(bind as Monad1<Generic1>)(thrush(x))(ff));
