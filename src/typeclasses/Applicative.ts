import { Anon, Generic1, Generic1Type, Generic2, Generic2Type, Type1, Type2 } from '../Generic';
import { ApplyOnly_1, ApplyOnly_2, Apply_1, Apply_2 } from './Apply';

export interface Applicative_1<f extends Generic1> extends Apply_1<f> {
  pure: <a>(a: a) => Type1<f, a>;
}

export interface Applicative_2<f extends Generic2> extends Apply_2<f> {
  pure: <a, b>(b: b) => Type2<f, a, b>;
}

export interface PureOnly_1<f extends Generic1>
  extends Pick<Applicative_1<f>, Generic1Type | 'pure'> {}

export interface PureOnly_2<f extends Generic2>
  extends Pick<Applicative_2<f>, Generic2Type | 'pure'> {}

export const liftA1: {
  <f extends Generic1>({ apply, pure }: ApplyOnly_1<f> & PureOnly_1<f>): Applicative_1<f>['map'];
  <f extends Generic2>({ apply, pure }: ApplyOnly_2<f> & PureOnly_2<f>): Applicative_2<f>['map'];
} = <f extends Generic1>({ apply, pure }: Anon<ApplyOnly_1<f> & PureOnly_1<f>>) => <a, b>(
  f: (_: a) => b
): ((fa: Type1<f, a>) => Type1<f, b>) => apply(pure(f));
