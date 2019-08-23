import { Generic1, Generic2, Type1, Type2 } from '../Generic';
import { Functor1, Functor2 } from './Functor';
import { compose } from '../Fn/functions';

export interface Apply1<f extends Generic1> extends Functor1<f> {
  apply: Helpers1<f>['apply'];
}

export interface Apply2<f extends Generic2> extends Functor2<f> {
  apply: Helpers2<f>['apply'];
}

export type Apply = {
  [k in keyof Apply1<never> & keyof Apply2<never>]: Apply1<Generic1>[k];
};

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
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(apply: Apply1<f>): Helpers1<f>[k];
    <f extends Generic2>(apply: Apply2<f>): Helpers2<f>[k];
  };
};

export const lift2: Helper['lift2'] = ({ apply, map }: Apply) => <a, b, c>(f: (_: a) => (_: b) => c) => compose(apply)(map(f));

export const lift3: Helper['lift3'] = <f extends Generic1>(apply: Apply) => <a, b, c, d>(f: (_: a) => (_: b) => (_: c) => d) => (fa: Type1<f, a>) => compose(apply.apply)(lift2(apply as Apply1<f>)(f)(fa));

export const lift4: Helper['lift4'] = <f extends Generic1>(apply: Apply) => <a, b, c, d, e>(f: (_: a) => (_: b) => (_: c) => (_: d) => e) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => compose(apply.apply)(lift3(apply as Apply1<f>)(f)(fa)(fb));

export const lift5: Helper['lift5'] = <f extends Generic1>(apply: Apply) => <a, b, c, d, e>(f: (_: a) => (_: b) => (_: c) => (_: d) => e) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => (fc: Type1<f, c>) => compose(apply.apply)(lift4(apply as Apply1<f>)(f)(fa)(fb)(fc));
