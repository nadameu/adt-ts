import { flip } from '../Fn/functions';
import {
  Anon,
  GenericFn2,
  GenericFn3,
  IdentifiedFn,
  IdentifiedFn3,
  TypeFn,
  TypeFn3,
} from '../Generic';

export interface Semigroupoid_2<f extends GenericFn2> extends IdentifiedFn<f> {
  compose: Helpers2<f>['compose'];
}

export interface Semigroupoid_3<f extends GenericFn3> extends IdentifiedFn3<f> {
  compose: Helpers3<f>['compose'];
}

interface Helpers2<f extends GenericFn2> {
  compose: <b, c>(f: TypeFn<f, b, c>) => <a>(g: TypeFn<f, a, b>) => TypeFn<f, a, c>;
  composeFlipped: <a, b>(f: TypeFn<f, a, b>) => <c>(g: TypeFn<f, b, c>) => TypeFn<f, a, c>;
}
interface Helpers3<f extends GenericFn3> {
  compose: <a, c, d>(f: TypeFn3<f, a, c, d>) => <b>(g: TypeFn3<f, a, b, c>) => TypeFn3<f, a, b, d>;
  composeFlipped: <a, b, c>(
    f: TypeFn3<f, a, b, c>
  ) => <d>(g: TypeFn3<f, a, c, d>) => TypeFn3<f, a, b, d>;
}
type Helper = {
  [k in keyof Helpers2<never>]: {
    <f extends GenericFn2>(semigroupoid: Semigroupoid_2<f>): Helpers2<f>[k];
    <f extends GenericFn3>(semigroupoid: Semigroupoid_3<f>): Helpers3<f>[k];
  };
};

export const composeFlipped: Helper['composeFlipped'] = <f extends GenericFn2>({
  compose,
}: Anon<Semigroupoid_2<f>>) => flip(compose);
