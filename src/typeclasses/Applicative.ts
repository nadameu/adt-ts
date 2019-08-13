import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply1, Apply2 } from './Apply';
import { Monad1 } from './Monad';

export interface Applicative1<f extends Generic1> extends Apply1<f> {
  pure: Helpers1<f>['pure'];
}

export interface Applicative2<f extends Generic2> extends Apply2<f> {
  pure: Helpers2<f>['pure'];
}

type AnyApplicative<f extends Generic1> = Pick<Applicative1<f>, 'apply' | 'map' | 'pure'>;
type AnyPartialApplicative<f extends Generic1, k extends 'apply' | 'map' | 'pure'> = Pick<
  Applicative1<f>,
  k
>;

interface Helpers1<f extends Generic1> {
  pure: <a>(a: a) => Type1<f, a>;
  liftA1: Applicative1<f>['map'];
}
interface Helpers2<f extends Generic2> {
  pure: <b, a = never>(b: b) => Type2<f, a, b>;
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

export const liftA1: PartialHelper<'apply' | 'pure'>['liftA1'] = <f extends Generic1>({
  apply,
  pure,
}: Pick<Applicative1<f>, 'apply' | 'pure'>) => <a, b>(
  f: (_: a) => b
): ((fa: Type1<f, a>) => Type1<f, b>) => /*#__PURE__*/ apply(pure(f));
