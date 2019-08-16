import { Generic1, Generic2, Identified1, Identified2, Type1, Type2 } from '../Generic';

export interface Functor1<f extends Generic1> extends Identified1<f> {
  map: Helpers1<f>['map'];
}

export interface Functor2<f extends Generic2> extends Identified2<f> {
  map: Helpers2<f>['map'];
}

export type AnyFunctor = Pick<
  Functor1<Generic1> & Functor2<Generic2>,
  keyof Functor1<Generic1> & keyof Functor2<Generic2>
>;

interface Helpers1<f extends Generic1> {
  map: <a, b>(f: (_: a) => b) => (fa: Type1<f, a>) => Type1<f, b>;
  mapTo: <b>(b: b) => <a>(fa: Type1<f, a>) => Type1<f, b>;
  flap: <a>(a: a) => <b>(ff: Type1<f, (_: a) => b>) => Type1<f, b>;
}
interface Helpers2<f extends Generic2> {
  map: <b, c>(f: (_: b) => c) => <a>(fab: Type2<f, a, b>) => Type2<f, a, c>;
  mapTo: <c>(c: c) => <a, b>(fab: Type2<f, a, b>) => Type2<f, a, c>;
  flap: <b>(b: b) => <a, c>(ff: Type2<f, a, (_: b) => c>) => Type2<f, a, c>;
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(functor: Functor1<f>): Helpers1<f>[k];
    <f extends Generic2>(functor: Functor2<f>): Helpers2<f>[k];
  };
};

export const mapTo: Helper['mapTo'] = (functor: AnyFunctor) => <a>(a: a) => functor.map(_ => a);

export const flap: Helper['flap'] = (functor: AnyFunctor) => <a>(a: a) =>
  functor.map<(_: unknown) => unknown, unknown>(f => f(a));
