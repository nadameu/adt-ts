import { flip } from '../Fn/functions';
import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply1, Apply2 } from './Apply';

export interface Bind1<f extends Generic1> extends Apply1<f> {
  bind: Helpers1<f>['bind'];
}

export interface Bind2<f extends Generic2> extends Apply2<f> {
  bind: Helpers2<f>['bind'];
}

export type Bind = {
  [k in keyof Bind1<never> & keyof Bind2<never>]: Bind1<Generic1>[k];
};

interface Helpers1<f extends Generic1> {
  bind: <a, b>(f: (_: a) => Type1<f, b>) => (fa: Type1<f, a>) => Type1<f, b>;
  join: <a>(ffa: Type1<f, Type1<f, a>>) => Type1<f, a>;
  composeK: <b, c>(
    f: (_: b) => Type1<f, c>
  ) => <a>(g: (_: a) => Type1<f, b>) => (_: a) => Type1<f, c>;
  pipeK: <a, b>(f: (_: a) => Type1<f, b>) => <c>(g: (_: b) => Type1<f, c>) => (_: a) => Type1<f, c>;
  wrapBind: <a>(fa: Type1<f, a>) => WrappedBind1<f, a>;
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
  wrapBind: <a, b>(fab: Type2<f, a, b>) => WrappedBind2<f, a, b>;
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(bind: Bind1<f>): Helpers1<f>[k];
    <f extends Generic2>(bind: Bind2<f>): Helpers2<f>[k];
  };
};

export type BindMap1<f extends Generic1> = {
  [k in 'Generic1Type' | 'bind' | 'map']: Bind1<f>[k];
};
export type BindMap2<f extends Generic2> = {
  [k in 'Generic2Type' | 'bind' | 'map']: Bind2<f>[k];
};
export type BindMap = {
  [k in 'bind' | 'map']: BindMap1<Generic1>[k];
};

export const join: Helper['join'] = ({ bind }: Bind) => bind(x => x);

export const applyDefault: {
  <f extends Generic1>({ bind, map }: BindMap1<f>): Bind1<f>['apply'];
  <f extends Generic2>({ bind, map }: BindMap2<f>): Bind2<f>['apply'];
} = (<f extends Generic1>({ bind, map }: BindMap1<f>) =>
  flip(<a, b>(fa: Type1<f, a>) => bind<(_: a) => b, b>(f => map(f)(fa)))) as any;

export const composeK: Helper['composeK'] = (<f extends Generic1>({ bind }: Bind1<f>) => <b, c>(
  f: (_: b) => Type1<f, c>
) => <a>(g: (_: a) => Type1<f, b>) => (a: a): Type1<f, c> => bind(f)(g(a))) as any;

export const pipeK: Helper['pipeK'] = (<f extends Generic1>({ bind }: Bind1<f>) => <a, b>(
  f: (_: a) => Type1<f, b>
) => <c>(g: (_: b) => Type1<f, c>) => (a: a): Type1<f, c> => bind(g)(f(a))) as any;

export interface WrappedBind1<t extends Generic1, a> {
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
export interface WrappedBind2<t extends Generic2, a, b> {
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
export const wrapBind: Helper['wrapBind'] = (<f extends Generic1>({ bind }: Bind1<f>) => <a>(
  fa: Type1<f, a>
): WrappedBind1<f, a> => ({
  pipeK: (...fs: Array<(_: any) => Type1<f, any>>) => {
    const len = fs.length;
    let result = fa;
    for (let i = 0; i < len; i++) {
      result = bind(fs[i])(result);
    }
    return result;
  },
})) as any;
