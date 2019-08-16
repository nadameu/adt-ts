import { GenericFn, IdentifiedFn, TypeFn } from '../Generic';

export interface Semigroupoid2<a extends GenericFn> extends IdentifiedFn<a> {
  compose: <c, d>(f: TypeFn<a, c, d>) => <b>(g: TypeFn<a, b, c>) => TypeFn<a, b, d>;
}

export const composeFlipped = <a extends GenericFn>(semigroupoid: Semigroupoid2<a>) => <b, c>(
  f: TypeFn<a, b, c>
) => <d>(g: TypeFn<a, c, d>): TypeFn<a, b, d> => semigroupoid.compose(g)(f);
