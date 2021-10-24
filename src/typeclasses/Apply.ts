import { Anon, Generic1, Generic1Type, Generic2, Generic2Type, GenericOType, Type1, Type2 } from '../Generic';
import { compose } from '../helpers/compose';
import { Functor_1, Functor_2, Functor_O } from './Functor';

export interface Apply_1<f extends Generic1> extends Functor_1<f> {
  apply: Helpers1<f>['apply'];
}

export interface Apply_2<f extends Generic2> extends Functor_2<f> {
  apply: Helpers2<f>['apply'];
}

export interface Apply_O extends Functor_O {
  apply: HelpersO['apply'];
}

export interface ApplyOnly_1<f extends Generic1> extends Pick<Apply_1<f>, Generic1Type | 'apply'> {}

export interface ApplyOnly_2<f extends Generic2> extends Pick<Apply_2<f>, Generic2Type | 'apply'> {}

export interface ApplyOnly_O extends Pick<Apply_O, GenericOType | 'apply'> {}

interface Helpers1<f extends Generic1> {
  apply: <a, b>(ff: Type1<f, (_: a) => b>) => (fa: Type1<f, a>) => Type1<f, b>;
  lift2: <a, b, c>(f: (_: a) => (_: b) => c) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => Type1<f, c>;
  lift3: <a, b, c, d>(f: (_: a) => (_: b) => (_: c) => d) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => (fc: Type1<f, c>) => Type1<f, d>;
  lift4: <a, b, c, d, e>(f: (_: a) => (_: b) => (_: c) => (_: d) => e) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => (fc: Type1<f, c>) => (fd: Type1<f, d>) => Type1<f, e>;
  lift5: <a, b, c, d, e, g>(f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => g) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => (fc: Type1<f, c>) => (fd: Type1<f, d>) => (fe: Type1<f, e>) => Type1<f, g>;
}
interface Helpers2<f extends Generic2> {
  apply: <a, b, c>(faf: Type2<f, a, (_: b) => c>) => (fab: Type2<f, a, b>) => Type2<f, a, c>;
  lift2: <b, c, d>(f: (_: b) => (_: c) => d) => <a>(fab: Type2<f, a, b>) => (fac: Type2<f, a, c>) => Type2<f, a, d>;
  lift3: <b, c, d, e>(f: (_: b) => (_: c) => (_: d) => e) => <a>(fab: Type2<f, a, b>) => (fac: Type2<f, a, c>) => (fad: Type2<f, a, d>) => Type2<f, a, e>;
  lift4: <b, c, d, e, g>(f: (_: b) => (_: c) => (_: d) => (_: e) => g) => <a>(fab: Type2<f, a, b>) => (fac: Type2<f, a, c>) => (fad: Type2<f, a, d>) => (fae: Type2<f, a, e>) => Type2<f, a, g>;
  lift5: <b, c, d, e, g, h>(f: (_: b) => (_: c) => (_: d) => (_: e) => (_: g) => h) => <a>(fab: Type2<f, a, b>) => (fac: Type2<f, a, c>) => (fad: Type2<f, a, d>) => (fae: Type2<f, a, e>) => (faf: Type2<f, a, g>) => Type2<f, a, h>;
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
    <f extends Generic1>({ apply, map }: Apply_1<f>): Helpers1<f>[k];
    <f extends Generic2>({ apply, map }: Apply_2<f>): Helpers2<f>[k];
    ({ apply, map }: Apply_O): HelpersO[k];
  };
};

export const lift2: Helper['lift2'] =
  <f extends Generic1>({ apply, map }: Anon<Apply_1<f>>) =>
  <a, b, c>(f: (_: a) => (_: b) => c) =>
    compose<Type1<f, (_: b) => c>, (fa: Type1<f, a>) => Type1<f, b>>(apply)(map(f));

export const lift3: Helper['lift3'] =
  <f extends Generic1>(apply: Anon<Apply_1<f>>) =>
  <a, b, c, d>(f: (_: a) => (_: b) => (_: c) => d) =>
  (fa: Type1<f, a>) =>
    compose<Type1<f, (_: c) => d>, (fa: Type1<f, c>) => Type1<f, d>>(apply.apply)(lift2(apply as Apply_1<f>)(f)(fa));

export const lift4: Helper['lift4'] =
  <f extends Generic1>(apply: Anon<Apply_1<f>>) =>
  <a, b, c, d, e>(f: (_: a) => (_: b) => (_: c) => (_: d) => e) =>
  (fa: Type1<f, a>) =>
  (fb: Type1<f, b>) =>
    compose<Type1<f, (_: d) => e>, (fa: Type1<f, d>) => Type1<f, e>>(apply.apply)(lift3(apply as Apply_1<f>)(f)(fa)(fb));

export const lift5: Helper['lift5'] =
  <f extends Generic1>(apply: Anon<Apply_1<f>>) =>
  <a, b, c, d, e, g>(f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => g) =>
  (fa: Type1<f, a>) =>
  (fb: Type1<f, b>) =>
  (fc: Type1<f, c>) =>
    compose<Type1<f, (_: e) => g>, (fa: Type1<f, e>) => Type1<f, g>>(apply.apply)(lift4(apply as Apply_1<f>)(f)(fa)(fb)(fc));
