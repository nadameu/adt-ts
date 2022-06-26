import * as G from '../Generic';
import { flip, identity } from '../helpers';
import { Apply_1, Apply_2 } from './Apply';
import { Functor_1, Functor_2 } from './Functor';

export interface BindOnly_1<f extends G.Generic1> extends G.Identified1<f> {
  bind: Helpers1<f>['bind'];
}
export interface Bind_1<f extends G.Generic1> extends Apply_1<f>, BindOnly_1<f> {}
export interface BindMapOnly_1<f extends G.Generic1> extends Functor_1<f>, BindOnly_1<f> {}

export interface BindOnly_2<f extends G.Generic2> extends G.Identified2<f> {
  bind: Helpers2<f>['bind'];
}
export interface Bind_2<f extends G.Generic2> extends Apply_2<f>, BindOnly_2<f> {}
export interface BindMapOnly_2<f extends G.Generic2> extends Functor_2<f>, BindOnly_2<f> {}

export const makeBind: {
  <f extends G.Generic1>({ apply, bind, map }: G.Anon<Bind_1<f>>): Bind_1<f>;
  <f extends G.Generic2>({ apply, bind, map }: G.Anon<Bind_2<f>>): Bind_2<f>;
} = identity;

interface Helpers1<f extends G.Generic1> {
  bind: <a, b>(f: (_: a) => G.Type1<f, b>) => (fa: G.Type1<f, a>) => G.Type1<f, b>;
  join: <a>(ffa: G.Type1<f, G.Type1<f, a>>) => G.Type1<f, a>;
  composeKleisli: <b, c>(
    f: (_: b) => G.Type1<f, c>
  ) => <a>(g: (_: a) => G.Type1<f, b>) => (_: a) => G.Type1<f, c>;
  composeKleisliFlipped: <a, b>(
    f: (_: a) => G.Type1<f, b>
  ) => <c>(g: (_: b) => G.Type1<f, c>) => (_: a) => G.Type1<f, c>;
}
interface Helpers2<f extends G.Generic2> {
  bind: <a, b, c>(f: (_: b) => G.Type2<f, a, c>) => (fab: G.Type2<f, a, b>) => G.Type2<f, a, c>;
  join: <a, b>(fafab: G.Type2<f, a, G.Type2<f, a, b>>) => G.Type2<f, a, b>;
  composeKleisli: <a, c, d>(
    f: (_: c) => G.Type2<f, a, d>
  ) => <b>(g: (_: b) => G.Type2<f, a, c>) => (_: b) => G.Type2<f, a, d>;
  composeKleisliFlipped: <a, b, c>(
    f: (_: b) => G.Type2<f, a, c>
  ) => <d>(g: (_: c) => G.Type2<f, a, d>) => (_: b) => G.Type2<f, a, d>;
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>({ bind }: BindOnly_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>({ bind }: BindOnly_2<f>): Helpers2<f>[k];
  };
};

export const join: Helper['join'] = <f extends G.Generic1>({
  bind,
}: G.Anon<BindOnly_1<f>, 'bind'>) =>
  /*#__PURE__*/ bind<G.Type1<f, unknown>, G.Type1<f, unknown>>(x => x);

export const applyDefault: {
  <f extends G.Generic1>({ bind, map }: BindMapOnly_1<f>): Bind_1<f>['apply'];
  <f extends G.Generic2>({ bind, map }: BindMapOnly_2<f>): Bind_2<f>['apply'];
} = <f extends G.Generic1>({ bind, map }: G.Anon<BindMapOnly_1<f>>) =>
  flip(<a, b>(fa: G.Type1<f, a>) => bind<(_: a) => b, b>(f => map(f)(fa)));

export const composeKleisli: Helper['composeKleisli'] =
  <f extends G.Generic1>({ bind }: G.Anon<Bind_1<f>, 'bind'>) =>
  <b, c>(f: (_: b) => G.Type1<f, c>) =>
  <a>(g: (_: a) => G.Type1<f, b>) =>
  (a: a): G.Type1<f, c> =>
    bind(f)(g(a));

export const composeKleisliFlipped: Helper['composeKleisliFlipped'] = <f extends G.Generic1>({
  bind,
}: G.Anon<Bind_1<f>, 'bind'>) =>
  flip(
    composeKleisli({ bind } as Bind_1<f>) as <a, b, c>(
      f: (_: b) => G.Type1<f, c>
    ) => (g: (_: a) => G.Type1<f, b>) => (_: a) => G.Type1<f, c>
  );
