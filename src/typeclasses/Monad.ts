import * as G from '../Generic';
import { compose, flip, identity } from '../helpers';
import { Applicative_1, Applicative_2, PureOnly_1, PureOnly_2 } from './Applicative';
import { BindOnly_1, BindOnly_2, Bind_1, Bind_2 } from './Bind';

export interface Monad_1<f extends G.Generic1> extends Applicative_1<f>, Bind_1<f> {}
export interface BindPureOnly_1<f extends G.Generic1> extends BindOnly_1<f>, PureOnly_1<f> {}

export interface Monad_2<f extends G.Generic2> extends Applicative_2<f>, Bind_2<f> {}
export interface BindPureOnly_2<f extends G.Generic2> extends BindOnly_2<f>, PureOnly_2<f> {}

export const makeMonadInstance: {
  <f extends G.Generic1>({ apply, bind, map, pure }: G.Anon<Monad_1<f>>): Monad_1<f>;
  <f extends G.Generic2>({ apply, bind, map, pure }: G.Anon<Monad_2<f>>): Monad_2<f>;
} = identity;

interface Helpers1<f extends G.Generic1> {
  liftM1: Monad_1<f>['map'];
  ap: Monad_1<f>['apply'];
}
interface Helpers2<f extends G.Generic2> {
  liftM1: Monad_2<f>['map'];
  ap: Monad_2<f>['apply'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>(monad: Monad_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>(monad: Monad_2<f>): Helpers2<f>[k];
  };
};

type BindPureHelper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>({ bind, pure }: BindPureOnly_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>({ bind, pure }: BindPureOnly_2<f>): Helpers2<f>[k];
  };
};

export const liftM1: BindPureHelper['liftM1'] =
  <f extends G.Generic1>({ bind, pure }: G.Anon<BindPureOnly_1<f>>) =>
  <a, b>(f: (_: a) => b): ((fa: G.Type1<f, a>) => G.Type1<f, b>) =>
    bind(compose(pure)(f));

export const ap: BindPureHelper['ap'] = <f extends G.Generic1>({
  bind,
  pure,
}: G.Anon<BindPureOnly_1<f>>) =>
  flip(<a, b>(fa: G.Type1<f, a>) =>
    bind<(_: a) => b, b>(f => liftM1({ bind, pure } as Monad_1<f>)(f)(fa))
  );
