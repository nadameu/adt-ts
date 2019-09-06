import { compose, flip } from '../Fn/functions';
import { Anon, Generic1, Generic2, Type1 } from '../Generic';
import { Applicative_1, Applicative_2 } from './Applicative';
import { Bind_1, Bind_2 } from './Bind';

export interface Monad_1<f extends Generic1> extends Applicative_1<f>, Bind_1<f> {}

export interface Monad_2<f extends Generic2> extends Applicative_2<f>, Bind_2<f> {}

interface Helpers1<f extends Generic1> {
  liftM1: Monad_1<f>['map'];
  ap: Monad_1<f>['apply'];
}
interface Helpers2<f extends Generic2> {
  liftM1: Monad_2<f>['map'];
  ap: Monad_2<f>['apply'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(monad: Monad_1<f>): Helpers1<f>[k];
    <f extends Generic2>(monad: Monad_2<f>): Helpers2<f>[k];
  };
};
export type BindPure_1<f extends Generic1> = Pick<Monad_1<f>, 'Generic1Type' | 'bind' | 'pure'>;
export type BindPure_2<f extends Generic2> = Pick<Monad_2<f>, 'Generic2Type' | 'bind' | 'pure'>;

type BindPureHelper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(_: BindPure_1<f>): Helpers1<f>[k];
    <f extends Generic2>(_: BindPure_2<f>): Helpers2<f>[k];
  };
};

export const liftM1: BindPureHelper['liftM1'] = <f extends Generic1>({
  bind,
  pure,
}: Anon<BindPure_1<f>>) => <a, b>(f: (_: a) => b): ((fa: Type1<f, a>) => Type1<f, b>) =>
  bind(compose(pure)(f));

export const ap: BindPureHelper['ap'] = (<f extends Generic1>(monad: Anon<BindPure_1<f>>) =>
  flip(<a, b>(fa: Type1<f, a>) =>
    monad.bind<(_: a) => b, b>(f => liftM1(monad as BindPure_1<f>)(f)(fa))
  )) as any;
