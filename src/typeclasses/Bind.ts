import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Apply1, Apply2 } from './Apply';

export interface Bind1<f extends Generic1> extends Apply1<f> {
  bind: Helpers1<f>['bind'];
}

export interface Bind2<f extends Generic2> extends Apply2<f> {
  bind: Helpers2<f>['bind'];
}

type AnyBind<f extends Generic1> = Pick<Bind1<f>, 'apply' | 'bind' | 'map'>;

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

export const join: Helper['join'] = <f extends Generic1>(
  bind: AnyBind<f>
): (<a>(ffa: Type1<f, Type1<f, a>>) => Type1<f, a>) => /*#__PURE__*/ bind.bind(x => x);
