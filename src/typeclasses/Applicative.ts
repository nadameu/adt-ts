import { autocurry3 } from '../autocurry';
import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply1, Apply2 } from './Apply';

export interface Applicative1<f extends Generic1> extends Apply1<f> {
  pure: <a>(a: a) => Type1<f, a>;
}

export interface Applicative2<f extends Generic2> extends Apply2<f> {
  pure: <a, b>(b: b) => Type2<f, a, b>;
}

export type AnyApplicative = Pick<
  Applicative1<Generic1> & Applicative2<Generic2>,
  keyof Applicative1<Generic1> & keyof Applicative2<Generic2>
>;

type ApplyPure1<f extends Generic1> = {
  [k in 'Generic1Type' | 'apply' | 'pure']: Applicative1<f>[k];
};
type ApplyPure2<f extends Generic2> = {
  [k in 'Generic2Type' | 'apply' | 'pure']: Applicative2<f>[k];
};

export const liftA1: {
  <f extends Generic1, a, b>(
    { apply, pure }: ApplyPure1<f>,
    f: (_: a) => b,
    fa: Type1<f, a>
  ): Type1<f, b>;
  <f extends Generic1, a, b>({ apply, pure }: ApplyPure1<f>, f: (_: a) => b): (
    fa: Type1<f, a>
  ) => Type1<f, b>;
  <f extends Generic1>({ apply, pure }: ApplyPure1<f>): {
    <a, b>(f: (_: a) => b, fa: Type1<f, a>): Type1<f, b>;
    <a, b>(f: (_: a) => b): (fa: Type1<f, a>) => Type1<f, b>;
  };

  <f extends Generic2, a, b, c>(
    { apply, pure }: ApplyPure2<f>,
    f: (_: b) => c,
    fa: Type2<f, a, b>
  ): Type2<f, a, c>;
  <f extends Generic2, a, b, c>({ apply, pure }: ApplyPure2<f>, f: (_: b) => c): (
    fa: Type2<f, a, b>
  ) => Type2<f, a, c>;
  <f extends Generic2>({ apply, pure }: ApplyPure2<f>): {
    <a, b, c>(f: (_: b) => c, fa: Type2<f, a, b>): Type2<f, a, c>;
    <a, b, c>(f: (_: b) => c): (fa: Type2<f, a, b>) => Type2<f, a, c>;
  };
} = autocurry3(
  (
    { apply, pure }: Pick<Applicative1<Generic1> & Applicative2<Generic2>, 'apply' | 'pure'>,
    f,
    fa
  ) => apply(pure(f))(fa)
);
