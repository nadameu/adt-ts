import { GenericFn2, IdentifiedFn, TypeFn, GenericFn3, IdentifiedFn3, TypeFn3 } from '../Generic';

export interface Semigroupoid2<f extends GenericFn2> extends IdentifiedFn<f> {
  compose: Helpers2<f>['compose'];
}

export interface Semigroupoid3<f extends GenericFn3> extends IdentifiedFn3<f> {
  compose: Helpers3<f>['compose'];
}

export type AnySemigroupoid = Pick<
  Semigroupoid2<GenericFn2> & Semigroupoid3<GenericFn3>,
  keyof Semigroupoid2<never> & keyof Semigroupoid3<never>
>;

interface Helpers2<f extends GenericFn2> {
  compose: <b, c>(f: TypeFn<f, b, c>) => <a>(g: TypeFn<f, a, b>) => TypeFn<f, a, c>;
}
interface Helpers3<f extends GenericFn3> {
  compose: <a, c, d>(f: TypeFn3<f, a, c, d>) => <b>(g: TypeFn3<f, a, b, c>) => TypeFn3<f, a, b, d>;
}
type Helper = {
  [k in keyof Helpers2<never>]: {
    <f extends GenericFn2>(semigroupoid: Semigroupoid2<f>): Helpers2<f>[k];
    <f extends GenericFn3>(semigroupoid: Semigroupoid3<f>): Helpers3<f>[k];
  };
};

export const composeFlipped: Helper['compose'] = (semigroupoid: AnySemigroupoid) => (
  f: (_: any) => unknown
) => (g: (_: any) => unknown): ((_: any) => unknown) => semigroupoid.compose(g)(f);
