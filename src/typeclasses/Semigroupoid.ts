import { GenericFn2, IdentifiedFn, TypeFn, GenericFn3, IdentifiedFn3, TypeFn3 } from '../Generic';

export interface Semigroupoid2<f extends GenericFn2> extends IdentifiedFn<f> {
  compose: Helpers2<f>['compose'];
}

export interface Semigroupoid3<f extends GenericFn3> extends IdentifiedFn3<f> {
  compose: Helpers3<f>['compose'];
}

export type Semigroupoid = {
  [k in keyof Semigroupoid2<never> & keyof Semigroupoid3<never>]: Semigroupoid2<GenericFn2>[k];
};

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
    <f extends GenericFn2>(semigroupoid: Semigroupoid2<f>): Helpers2<f>[k];
    <f extends GenericFn3>(semigroupoid: Semigroupoid3<f>): Helpers3<f>[k];
  };
};

export const composeFlipped: Helper['composeFlipped'] = ({ compose }: Semigroupoid) => (
  f: (_: any) => unknown
) => (g: (_: any) => unknown) => compose(g)(f);
