import { flip } from '../Fn/functions';
import { Anon, Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply_1, Apply_2 } from './Apply';
import { Functor_1, Functor_2 } from './Functor';

export interface Bind_1<f extends Generic1> extends Apply_1<f> {
  bind: Helpers1<f>['bind'];
}

export interface Bind_2<f extends Generic2> extends Apply_2<f> {
  bind: Helpers2<f>['bind'];
}

export interface BindOnly_1<f extends Generic1> extends Pick<Bind_1<f>, 'Generic1Type' | 'bind'> {}

export interface BindOnly_2<f extends Generic2> extends Pick<Bind_2<f>, 'Generic2Type' | 'bind'> {}

interface Helpers1<f extends Generic1> {
  bind: <a, b>(f: (_: a) => Type1<f, b>) => (fa: Type1<f, a>) => Type1<f, b>;
  join: <a>(ffa: Type1<f, Type1<f, a>>) => Type1<f, a>;
  composeK: <b, c>(
    f: (_: b) => Type1<f, c>
  ) => <a>(g: (_: a) => Type1<f, b>) => (_: a) => Type1<f, c>;
  pipeK: <a, b>(f: (_: a) => Type1<f, b>) => <c>(g: (_: b) => Type1<f, c>) => (_: a) => Type1<f, c>;
  wrapBind: <a>(fa: Type1<f, a>) => WrappedBind_1<f, a>;
}
interface Helpers2<f extends Generic2> {
  bind: <a, b, c>(f: (_: b) => Type2<f, a, c>) => (fab: Type2<f, a, b>) => Type2<f, a, c>;
  join: <a, b>(fafab: Type2<f, a, Type2<f, a, b>>) => Type2<f, a, b>;
  composeK: <a, c, d>(
    f: (_: c) => Type2<f, a, d>
  ) => <b>(g: (_: b) => Type2<f, a, c>) => (_: b) => Type2<f, a, d>;
  pipeK: <a, b, c>(
    f: (_: a) => Type2<f, b, c>
  ) => <d>(g: (_: c) => Type2<f, b, d>) => (_: a) => Type2<f, b, d>;
  wrapBind: <a, b>(fab: Type2<f, a, b>) => WrappedBind_2<f, a, b>;
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

export const composeK: Helper['composeK'] = <f extends Generic1>({
  bind,
}: Anon<Bind_1<f>, 'bind'>) => <b, c>(f: (_: b) => Type1<f, c>) => <a>(
  g: (_: a) => Type1<f, b>
) => (a: a): Type1<f, c> => bind(f)(g(a));

export const pipeK: Helper['pipeK'] = <f extends Generic1>({
  bind,
}: Anon<BindOnly_1<f>, 'bind'>) => <a, b>(f: (_: a) => Type1<f, b>) => <c>(
  g: (_: b) => Type1<f, c>
) => (a: a): Type1<f, c> => bind(g)(f(a));

export interface WrappedBind_1<t extends Generic1, a> {
  pipeK(): Type1<t, a>;
  pipeK<b>(f0: (_: a) => Type1<t, b>): Type1<t, b>;
  pipeK<b, c>(f0: (_: a) => Type1<t, b>, f1: (_: b) => Type1<t, c>): Type1<t, c>;
  pipeK<b, c, d>(
    f0: (_: a) => Type1<t, b>,
    f1: (_: b) => Type1<t, c>,
    f2: (_: c) => Type1<t, d>
  ): Type1<t, d>;
  pipeK<b, c, d, e>(
    f0: (_: a) => Type1<t, b>,
    f1: (_: b) => Type1<t, c>,
    f2: (_: c) => Type1<t, d>,
    f3: (_: d) => Type1<t, e>
  ): Type1<t, e>;
  pipeK<b, c, d, e, f>(
    f0: (_: a) => Type1<t, b>,
    f1: (_: b) => Type1<t, c>,
    f2: (_: c) => Type1<t, d>,
    f3: (_: d) => Type1<t, e>,
    f4: (_: e) => Type1<t, f>
  ): Type1<t, f>;
  pipeK(...fs: Array<(_: any) => Type1<t, any>>): Type1<t, any>;
}
export interface WrappedBind_2<t extends Generic2, a, b> {
  pipeK(): Type2<t, a, b>;
  pipeK<c>(f0: (_: b) => Type2<t, a, c>): Type2<t, a, c>;
  pipeK<c, d>(f0: (_: b) => Type2<t, a, c>, f1: (_: c) => Type2<t, a, d>): Type2<t, a, d>;
  pipeK<c, d, e>(
    f0: (_: b) => Type2<t, a, c>,
    f1: (_: c) => Type2<t, a, d>,
    f2: (_: d) => Type2<t, a, e>
  ): Type2<t, a, e>;
  pipeK<c, d, e, f>(
    f0: (_: b) => Type2<t, a, c>,
    f1: (_: c) => Type2<t, a, d>,
    f2: (_: d) => Type2<t, a, e>,
    f3: (_: e) => Type2<t, a, f>
  ): Type2<t, a, f>;
  pipeK<c, d, e, f, g>(
    f0: (_: b) => Type2<t, a, c>,
    f1: (_: c) => Type2<t, a, d>,
    f2: (_: d) => Type2<t, a, e>,
    f3: (_: e) => Type2<t, a, f>,
    f4: (_: f) => Type2<t, a, g>
  ): Type2<t, a, g>;
  pipeK(...fs: Array<(_: any) => Type2<t, a, any>>): Type2<t, a, any>;
}
export const wrapBind: Helper['wrapBind'] = <f extends Generic1>({ bind }: Anon<BindOnly_1<f>>) => <
  a
>(
  fa: Type1<f, a>
): WrappedBind_1<f, a> => ({
  pipeK: (...fs: Array<(_: any) => Type1<f, any>>) => {
    const len = fs.length;
    let result = fa;
    for (let i = 0; i < len; i++) {
      result = bind(fs[i])(result);
    }
    return result;
  },
});
