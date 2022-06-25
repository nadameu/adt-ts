import * as G from '../Generic';
import { flip } from '../helpers';

export interface Semigroupoid_2<f extends G.GenericFn2> extends G.IdentifiedFn<f> {
  compose: Helpers2<f>['compose'];
}

export interface Semigroupoid_3<f extends G.GenericFn3> extends G.IdentifiedFn3<f> {
  compose: Helpers3<f>['compose'];
}

interface Helpers2<f extends G.GenericFn2> {
  compose: <b, c>(f: G.TypeFn<f, b, c>) => <a>(g: G.TypeFn<f, a, b>) => G.TypeFn<f, a, c>;
  composeFlipped: <a, b>(f: G.TypeFn<f, a, b>) => <c>(g: G.TypeFn<f, b, c>) => G.TypeFn<f, a, c>;
}
interface Helpers3<f extends G.GenericFn3> {
  compose: <a, c, d>(
    f: G.TypeFn3<f, a, c, d>
  ) => <b>(g: G.TypeFn3<f, a, b, c>) => G.TypeFn3<f, a, b, d>;
  composeFlipped: <a, b, c>(
    f: G.TypeFn3<f, a, b, c>
  ) => <d>(g: G.TypeFn3<f, a, c, d>) => G.TypeFn3<f, a, b, d>;
}
type Helper = {
  [k in keyof Helpers2<never>]: {
    <f extends G.GenericFn2>(semigroupoid: Semigroupoid_2<f>): Helpers2<f>[k];
    <f extends G.GenericFn3>(semigroupoid: Semigroupoid_3<f>): Helpers3<f>[k];
  };
};

export const composeFlipped: Helper['composeFlipped'] = <f extends G.GenericFn2>({
  compose,
}: G.Anon<Semigroupoid_2<f>>) => flip(compose);
