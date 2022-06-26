import * as G from '../Generic';
import { compose, identity } from '../helpers';
import { Functor_1, Functor_2, Functor_O } from './Functor';

export interface ApplyOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  apply: Helpers1<f>['apply'];
}
export interface Apply_1<f extends G.Generic1> extends Functor_1<f>, ApplyOnly_1<f> {}

export interface ApplyOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  apply: Helpers2<f>['apply'];
}
export interface Apply_2<f extends G.Generic2> extends Functor_2<f>, ApplyOnly_2<f> {}

export interface ApplyOnly_O extends G.IdentifiedO {
  apply: HelpersO['apply'];
}
export interface Apply_O extends Functor_O, ApplyOnly_O {}

export const makeApply: {
  <f extends G.Generic1>({ apply, map }: G.Anon<Apply_1<f>>): Apply_1<f>;
  <f extends G.Generic2>({ apply, map }: G.Anon<Apply_2<f>>): Apply_2<f>;
  ({ apply, map }: G.Anon<Apply_O>): Apply_O;
} = identity;

interface Helpers1<f extends G.Generic1> {
  apply: <a, b>(ff: G.Type1<f, (_: a) => b>) => (fa: G.Type1<f, a>) => G.Type1<f, b>;
  lift2: <a, b, c>(f: (_: a) => (_: b) => c) => (fa: G.Type1<f, a>) => (fb: G.Type1<f, b>) => G.Type1<f, c>;
  lift3: <a, b, c, d>(f: (_: a) => (_: b) => (_: c) => d) => (fa: G.Type1<f, a>) => (fb: G.Type1<f, b>) => (fc: G.Type1<f, c>) => G.Type1<f, d>;
  lift4: <a, b, c, d, e>(f: (_: a) => (_: b) => (_: c) => (_: d) => e) => (fa: G.Type1<f, a>) => (fb: G.Type1<f, b>) => (fc: G.Type1<f, c>) => (fd: G.Type1<f, d>) => G.Type1<f, e>;
  lift5: <a, b, c, d, e, g>(f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => g) => (fa: G.Type1<f, a>) => (fb: G.Type1<f, b>) => (fc: G.Type1<f, c>) => (fd: G.Type1<f, d>) => (fe: G.Type1<f, e>) => G.Type1<f, g>;
}
interface Helpers2<f extends G.Generic2> {
  apply: <a, b, c>(faf: G.Type2<f, a, (_: b) => c>) => (fab: G.Type2<f, a, b>) => G.Type2<f, a, c>;
  lift2: <b, c, d>(f: (_: b) => (_: c) => d) => <a>(fab: G.Type2<f, a, b>) => (fac: G.Type2<f, a, c>) => G.Type2<f, a, d>;
  lift3: <b, c, d, e>(f: (_: b) => (_: c) => (_: d) => e) => <a>(fab: G.Type2<f, a, b>) => (fac: G.Type2<f, a, c>) => (fad: G.Type2<f, a, d>) => G.Type2<f, a, e>;
  lift4: <b, c, d, e, g>(f: (_: b) => (_: c) => (_: d) => (_: e) => g) => <a>(fab: G.Type2<f, a, b>) => (fac: G.Type2<f, a, c>) => (fad: G.Type2<f, a, d>) => (fae: G.Type2<f, a, e>) => G.Type2<f, a, g>;
  lift5: <b, c, d, e, g, h>(f: (_: b) => (_: c) => (_: d) => (_: e) => (_: g) => h) => <a>(fab: G.Type2<f, a, b>) => (fac: G.Type2<f, a, c>) => (fad: G.Type2<f, a, d>) => (fae: G.Type2<f, a, e>) => (faf: G.Type2<f, a, g>) => G.Type2<f, a, h>;
}
interface HelpersO {
  apply: <T extends Record<keyof T, (_: any) => unknown>>(ff: T) => <U extends { [k in keyof T]: T[k] extends (_: infer a) => unknown ? a : never }>(fa: U) => { [k in keyof T]: T[k] extends (_: any) => infer b ? b : never };
  lift2: <a, b, c>(f: (_: a) => (_: b) => c) => <T extends Record<keyof T, a>>(fa: T) => <U extends Record<keyof T, b>>(fb: U) => { [k in keyof T]: c };
  lift3: <a, b, c, d>(f: (_: a) => (_: b) => (_: c) => d) => <T extends Record<keyof T, a>>(fa: T) => <U extends Record<keyof T, b>>(fb: U) => <V extends Record<keyof T, c>>(fc: V) => { [k in keyof T]: d };
  lift4: <a, b, c, d, e>(f: (_: a) => (_: b) => (_: c) => (_: d) => e) => <T extends Record<keyof T, a>>(fa: T) => <U extends Record<keyof T, b>>(fb: U) => <V extends Record<keyof T, c>>(fc: V) => <W extends Record<keyof T, d>>(fd: W) => { [k in keyof T]: e };
  lift5: <a, b, c, d, e, f>(
    f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => f
  ) => <T extends Record<keyof T, a>>(fa: T) => <U extends Record<keyof T, b>>(fb: U) => <V extends Record<keyof T, c>>(fc: V) => <W extends Record<keyof T, d>>(fd: W) => <X extends Record<keyof T, e>>(fe: X) => { [k in keyof T]: f };
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>({ apply, map }: Apply_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>({ apply, map }: Apply_2<f>): Helpers2<f>[k];
    ({ apply, map }: Apply_O): HelpersO[k];
  };
};

export const lift2: Helper['lift2'] =
  <f extends G.Generic1>({ apply, map }: G.Anon<Apply_1<f>>) =>
  <a, b, c>(f: (_: a) => (_: b) => c) =>
    compose<G.Type1<f, (_: b) => c>, (fa: G.Type1<f, a>) => G.Type1<f, b>>(apply)(map(f));

export const lift3: Helper['lift3'] =
  <f extends G.Generic1>(apply: G.Anon<Apply_1<f>>) =>
  <a, b, c, d>(f: (_: a) => (_: b) => (_: c) => d) =>
  (fa: G.Type1<f, a>) =>
    compose<G.Type1<f, (_: c) => d>, (fa: G.Type1<f, c>) => G.Type1<f, d>>(apply.apply)(lift2(apply as Apply_1<f>)(f)(fa));

export const lift4: Helper['lift4'] =
  <f extends G.Generic1>(apply: G.Anon<Apply_1<f>>) =>
  <a, b, c, d, e>(f: (_: a) => (_: b) => (_: c) => (_: d) => e) =>
  (fa: G.Type1<f, a>) =>
  (fb: G.Type1<f, b>) =>
    compose<G.Type1<f, (_: d) => e>, (fa: G.Type1<f, d>) => G.Type1<f, e>>(apply.apply)(lift3(apply as Apply_1<f>)(f)(fa)(fb));

export const lift5: Helper['lift5'] =
  <f extends G.Generic1>(apply: G.Anon<Apply_1<f>>) =>
  <a, b, c, d, e, g>(f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => g) =>
  (fa: G.Type1<f, a>) =>
  (fb: G.Type1<f, b>) =>
  (fc: G.Type1<f, c>) =>
    compose<G.Type1<f, (_: e) => g>, (fa: G.Type1<f, e>) => G.Type1<f, g>>(apply.apply)(lift4(apply as Apply_1<f>)(f)(fa)(fb)(fc));
