import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply1, Apply2 } from './Apply';

export interface Applicative1<f extends Generic1> extends Apply1<f> {
  pure: Helpers1<f>['pure'];
}

export interface Applicative2<f extends Generic2> extends Apply2<f> {
  pure: Helpers2<f>['pure'];
}

export type AnyApplicative = Pick<
  Applicative1<Generic1> & Applicative2<Generic2>,
  keyof Applicative1<Generic1> & keyof Applicative2<Generic2>
>;

interface Helpers1<f extends Generic1> {
  pure: <a>(a: a) => Type1<f, a>;
  liftA1: Applicative1<f>['map'];
}
interface Helpers2<f extends Generic2> {
  pure: <a, b>(b: b) => Type2<f, a, b>;
  liftA1: Applicative2<f>['map'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(applicative: Applicative1<f>): Helpers1<f>[k];
    <f extends Generic2>(applicative: Applicative2<f>): Helpers2<f>[k];
  };
};
type PartialHelper<keys extends keyof Applicative1<never> & keyof Applicative2<never>> = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(_: Pick<Applicative1<f>, 'Generic1Type' | keys>): Helpers1<f>[k];
    <f extends Generic2>(_: Pick<Applicative2<f>, 'Generic2Type' | keys>): Helpers2<f>[k];
  };
};

export const liftA1: PartialHelper<'apply' | 'pure'>['liftA1'] = ({
  apply,
  pure,
}: Pick<AnyApplicative, 'apply' | 'pure'>) => <a, b>(f: (_: a) => b) => apply(pure(f));
