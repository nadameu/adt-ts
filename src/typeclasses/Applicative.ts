import { Anon, Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply_1, Apply_2 } from './Apply';

export interface Applicative_1<f extends Generic1> extends Apply_1<f> {
  pure: <a>(a: a) => Type1<f, a>;
}

export interface Applicative_2<f extends Generic2> extends Apply_2<f> {
  pure: <a, b>(b: b) => Type2<f, a, b>;
}

export type ApplyPure_1<f extends Generic1> = Pick<
  Applicative_1<f>,
  'Generic1Type' | 'pure' | 'apply'
>;
export type ApplyPure_2<f extends Generic2> = Pick<
  Applicative_2<f>,
  'Generic2Type' | 'pure' | 'apply'
>;

export const liftA1: {
  <f extends Generic1>({ apply, pure }: ApplyPure_1<f>): Applicative_1<f>['map'];
  <f extends Generic2>({ apply, pure }: ApplyPure_2<f>): Applicative_2<f>['map'];
} = <f extends Generic1>({ apply, pure }: Anon<ApplyPure_1<f>>) => <a, b>(
  f: (_: a) => b
): ((fa: Type1<f, a>) => Type1<f, b>) => apply(pure(f));
