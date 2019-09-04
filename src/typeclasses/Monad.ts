import { Generic1, Generic2, Type1 } from '../Generic';
import { Applicative1, Applicative2 } from './Applicative';
import { Bind1, Bind2 } from './Bind';

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

export const liftM1: PartialHelper<'bind' | 'pure'>['liftM1'] = (<f extends Generic1>({
  bind,
  pure,
}: Monad1<f>) => <a, b>(f: (_: a) => b): ((fa: Type1<f, a>) => Type1<f, b>) =>
  bind(x => pure(f(x)))) as any;

export const ap: PartialHelper<'bind' | 'pure'>['ap'] = (<f extends Generic1>({
  bind,
  pure,
}: Monad1<f>) => <a, b>(ff: Type1<f, (_: a) => b>) => (fa: Type1<f, a>): Type1<f, b> =>
  bind<(_: a) => b, b>(f => liftM1<f>({ bind, pure } as Monad1<f>)(f)(fa))(ff)) as any;
