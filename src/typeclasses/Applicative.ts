import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply1, Apply2 } from './Apply';

export interface Applicative1<f extends Generic1> extends Apply1<f> {
  pure: <a>(a: a) => Type1<f, a>;
}

export interface Applicative2<f extends Generic2> extends Apply2<f> {
  pure: <a, b>(b: b) => Type2<f, a, b>;
}

export type Applicative = {
  [k in keyof Applicative1<never> & keyof Applicative2<never>]: Applicative1<Generic1>[k];
};

export type ApplyPure1<f extends Generic1> = {
  [k in 'Generic1Type' | 'apply' | 'pure']: Applicative1<f>[k];
};
export type ApplyPure2<f extends Generic2> = {
  [k in 'Generic2Type' | 'apply' | 'pure']: Applicative2<f>[k];
};
export type ApplyPure = {
  [k in 'apply' | 'pure']: ApplyPure1<Generic1>[k];
};

export const liftA1: {
  <f extends Generic1>({ apply, pure }: ApplyPure1<f>): Applicative1<f>['map'];
  <f extends Generic2>({ apply, pure }: ApplyPure2<f>): Applicative2<f>['map'];
} = ({ apply, pure }: ApplyPure) => (f: (_: any) => unknown) => apply(pure(f));
