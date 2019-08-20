import { constant } from '../constant';
import { curry, curry2 } from '../curry';
import { Generic1, Generic2, Identified1, Identified2, Type1, Type2 } from '../Generic';
import { thrush } from '../thrush';

export interface Functor1<f extends Generic1> extends Identified1<f> {
  map: Helpers1<f>['map'];
}

export interface Functor2<f extends Generic2> extends Identified2<f> {
  map: Helpers2<f>['map'];
}

export type Functor = Pick<
  Functor1<Generic1> & Functor2<Generic2>,
  keyof Functor1<never> & keyof Functor2<never>
>;

interface Helpers1<f extends Generic1> {
  map: {
    <a, b>(f: (_: a) => b, fa: Type1<f, a>): Type1<f, b>;
    <a, b>(f: (_: a) => b): (fa: Type1<f, a>) => Type1<f, b>;
  };
  mapTo: {
    <a, b>(b: b, fa: Type1<f, a>): Type1<f, b>;
    <b>(b: b): <a>(fa: Type1<f, a>) => Type1<f, b>;
  };
  flap: {
    <a, b>(a: a, ff: Type1<f, (_: a) => b>): Type1<f, b>;
    <a>(a: a): <b>(ff: Type1<f, (_: a) => b>) => Type1<f, b>;
  };
}
interface Helpers2<f extends Generic2> {
  map: {
    <a, b, c>(f: (_: b) => c, fab: Type2<f, a, b>): Type2<f, a, c>;
    <b, c>(f: (_: b) => c): <a>(fab: Type2<f, a, b>) => Type2<f, a, c>;
  };
  mapTo: {
    <a, b, c>(c: c, fab: Type2<f, a, b>): Type2<f, a, c>;
    <c>(c: c): <a, b>(fab: Type2<f, a, b>) => Type2<f, a, c>;
  };
  flap: {
    <a, b, c>(b: b, ff: Type2<f, a, (_: b) => c>): Type2<f, a, c>;
    <b>(b: b): <a, c>(ff: Type2<f, a, (_: b) => c>) => Type2<f, a, c>;
  };
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(functor: Functor1<f>): Helpers1<f>[k];
    <f extends Generic2>(functor: Functor2<f>): Helpers2<f>[k];
  };
};

export const mapTo: Helper['mapTo'] = ({ map }: Functor) => curry2((a, fb) => map(constant(a), fb));

export const flap: Helper['flap'] = ({ map }: Functor) =>
  curry2((a, ff) => map<any, any>(thrush(a), ff));
