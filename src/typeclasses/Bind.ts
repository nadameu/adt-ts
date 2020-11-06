import { Anon, Generic1, Generic1Type, Generic2, Generic2Type, Type1, Type2 } from '../Generic';
import { flip } from '../helpers/flip';
import { Apply_1, Apply_2 } from './Apply';
import { Functor_1, Functor_2 } from './Functor';

export interface Bind_1<f extends Generic1> extends Apply_1<f> {
  bind: Helpers1<f>['bind'];
}

export interface Bind_2<f extends Generic2> extends Apply_2<f> {
  bind: Helpers2<f>['bind'];
}

export interface BindOnly_1<f extends Generic1> extends Pick<Bind_1<f>, Generic1Type | 'bind'> {}

export interface BindOnly_2<f extends Generic2> extends Pick<Bind_2<f>, Generic2Type | 'bind'> {}

interface Helpers1<f extends Generic1> {
  bind: <a, b>(f: (_: a) => Type1<f, b>) => (fa: Type1<f, a>) => Type1<f, b>;
  join: <a>(ffa: Type1<f, Type1<f, a>>) => Type1<f, a>;
  composeKleisli: <b, c>(
    f: (_: b) => Type1<f, c>
  ) => <a>(g: (_: a) => Type1<f, b>) => (_: a) => Type1<f, c>;
  composeKleisliFlipped: <a, b>(
    f: (_: a) => Type1<f, b>
  ) => <c>(g: (_: b) => Type1<f, c>) => (_: a) => Type1<f, c>;
}
interface Helpers2<f extends Generic2> {
  bind: <a, b, c>(f: (_: b) => Type2<f, a, c>) => (fab: Type2<f, a, b>) => Type2<f, a, c>;
  join: <a, b>(fafab: Type2<f, a, Type2<f, a, b>>) => Type2<f, a, b>;
  composeKleisli: <a, c, d>(
    f: (_: c) => Type2<f, a, d>
  ) => <b>(g: (_: b) => Type2<f, a, c>) => (_: b) => Type2<f, a, d>;
  composeKleisliFlipped: <a, b, c>(
    f: (_: b) => Type2<f, a, c>
  ) => <d>(g: (_: c) => Type2<f, a, d>) => (_: b) => Type2<f, a, d>;
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>({ bind }: BindOnly_1<f>): Helpers1<f>[k];
    <f extends Generic2>({ bind }: BindOnly_2<f>): Helpers2<f>[k];
  };
};

export const join: Helper['join'] = <f extends Generic1>({ bind }: Anon<BindOnly_1<f>, 'bind'>) =>
  /*#__PURE__*/ bind<Type1<f, unknown>, Type1<f, unknown>>(x => x);

export const applyDefault: {
  <f extends Generic1>({ bind, map }: Functor_1<f> & BindOnly_1<f>): Bind_1<f>['apply'];
  <f extends Generic2>({ bind, map }: Functor_2<f> & BindOnly_2<f>): Bind_2<f>['apply'];
} = <f extends Generic1>({ bind, map }: Anon<Functor_1<f> & BindOnly_1<f>>) =>
  flip(<a, b>(fa: Type1<f, a>) => bind<(_: a) => b, b>(f => map(f)(fa)));

export const composeKleisli: Helper['composeKleisli'] = <f extends Generic1>({
  bind,
}: Anon<Bind_1<f>, 'bind'>) => <b, c>(f: (_: b) => Type1<f, c>) => <a>(
  g: (_: a) => Type1<f, b>
) => (a: a): Type1<f, c> => bind(f)(g(a));

export const composeKleisliFlipped: Helper['composeKleisliFlipped'] = <f extends Generic1>({
  bind,
}: Anon<Bind_1<f>, 'bind'>) =>
  flip(
    composeKleisli({ bind } as Bind_1<f>) as <a, b, c>(
      f: (_: b) => Type1<f, c>
    ) => (g: (_: a) => Type1<f, b>) => (_: a) => Type1<f, c>
  );
