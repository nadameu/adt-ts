import * as G from '../Generic';
import { compose, flip, identity } from '../helpers';
import {
  Applicative_1,
  Applicative_2,
  Applicative_A,
  PureOnly_1,
  PureOnly_2,
  PureOnly_A,
} from './Applicative';
import { BindOnly_1, BindOnly_2, BindOnly_A, Bind_1, Bind_2, Bind_A } from './Bind';

export interface Monad_1<f extends G.Generic1> extends Applicative_1<f>, Bind_1<f> {}
export interface BindPureOnly_1<f extends G.Generic1> extends BindOnly_1<f>, PureOnly_1<f> {}

export interface Monad_2<f extends G.Generic2> extends Applicative_2<f>, Bind_2<f> {}
export interface BindPureOnly_2<f extends G.Generic2> extends BindOnly_2<f>, PureOnly_2<f> {}

export interface Monad_A extends Applicative_A, Bind_A {}
export interface BindPureOnly_A extends BindOnly_A, PureOnly_A {}

export const makeMonadInstance: {
  <f extends G.Generic1>({ apply, bind, map, pure }: G.Anon<Monad_1<f>>): Monad_1<f>;
  <f extends G.Generic2>({ apply, bind, map, pure }: G.Anon<Monad_2<f>>): Monad_2<f>;
  ({ apply, bind, map, pure }: G.Anon<Monad_A>): Monad_A;
} = identity;

interface Helpers1<f extends G.Generic1> {
  liftM1: Monad_1<f>['map'];
  ap: Monad_1<f>['apply'];
}
interface Helpers2<f extends G.Generic2> {
  liftM1: Monad_2<f>['map'];
  ap: Monad_2<f>['apply'];
}
interface HelpersA {
  liftM1: Monad_A['map'];
  ap: Monad_A['apply'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>(monad: Monad_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>(monad: Monad_2<f>): Helpers2<f>[k];
    (monad: Monad_A): HelpersA[k];
  };
};

type BindPureHelper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>({ bind, pure }: BindPureOnly_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>({ bind, pure }: BindPureOnly_2<f>): Helpers2<f>[k];
    ({ bind, pure }: BindPureOnly_A): HelpersA[k];
  };
};

export const liftM1: BindPureHelper['liftM1'] =
  <f extends G.Generic1>({ bind, pure }: G.Anon<BindPureOnly_1<f>>) =>
  <a, b>(f: (_: a) => b): ((fa: G.Type1<f, a>) => G.Type1<f, b>) =>
    bind(compose(pure)(f));

export const ap: BindPureHelper['ap'] = ({ bind, pure }: G.Anon<BindPureOnly_A>) =>
  flip(<a, b>(fa: ArrayLike<a>) =>
    bind<(_: a) => b, b>(f => liftM1({ bind, pure } as Monad_A)(f)(fa))
  );
