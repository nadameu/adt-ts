import { thrush } from '../Fn/functions';
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
}
interface Helpers2<f extends Generic2> {
  bind: <a, b, c>(f: (_: b) => Type2<f, a, c>) => (fab: Type2<f, a, b>) => Type2<f, a, c>;
  join: <a, b>(fafab: Type2<f, a, Type2<f, a, b>>) => Type2<f, a, b>;
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
} = <f extends Generic1>({ bind, map }: BindMap) => <a, b>(ff: Type1<f, (_: a) => b>) =>
  bind(a => map(thrush(a))(ff));
