import * as G from '../Generic';
import { identity } from '../helpers';
import { ApplyOnly_1, ApplyOnly_2, ApplyOnly_A, Apply_1, Apply_2, Apply_A } from './Apply';

export interface PureOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  pure: <a>(a: a) => G.Type1<f, a>;
}
export interface Applicative_1<f extends G.Generic1> extends Apply_1<f>, PureOnly_1<f> {}

export interface PureOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  pure: <a, b>(b: b) => G.Type2<f, a, b>;
}
export interface Applicative_2<f extends G.Generic2> extends Apply_2<f>, PureOnly_2<f> {}

export interface PureOnly_A extends G.IdentifiedA {
  pure: <a>(a: a) => a[];
}
export interface Applicative_A extends Apply_A, PureOnly_A {}

export const makeApplicativeInstance: {
  <f extends G.Generic1>({ apply, map, pure }: G.Anon<Applicative_1<f>>): Applicative_1<f>;
  <f extends G.Generic2>({ apply, map, pure }: G.Anon<Applicative_2<f>>): Applicative_2<f>;
  ({ apply, map, pure }: G.Anon<Applicative_A>): Applicative_A;
} = identity;

export interface ApplyPureOnly_1<f extends G.Generic1> extends ApplyOnly_1<f>, PureOnly_1<f> {}
export interface ApplyPureOnly_2<f extends G.Generic2> extends ApplyOnly_2<f>, PureOnly_2<f> {}
export interface ApplyPureOnly_A extends ApplyOnly_A, PureOnly_A {}

export const liftA1: {
  <f extends G.Generic1>({ apply, pure }: ApplyPureOnly_1<f>): Applicative_1<f>['map'];
  <f extends G.Generic2>({ apply, pure }: ApplyPureOnly_2<f>): Applicative_2<f>['map'];
  ({ apply, pure }: ApplyPureOnly_A): Applicative_A['map'];
} =
  <f extends G.Generic1>({ apply, pure }: G.Anon<ApplyPureOnly_1<f>>) =>
  <a, b>(f: (_: a) => b): ((fa: G.Type1<f, a>) => G.Type1<f, b>) =>
    apply(pure(f));
