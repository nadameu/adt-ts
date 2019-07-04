import { flip } from '../Data/Function';
import { Generic2, Type } from '../Generic';

export interface Semigroupoid<a extends Generic2> {
	compose: <c, d>(f: Type<a, c, d>) => <b>(g: Type<a, b, c>) => Type<a, b, d>;
}

export const composeFlipped = <a extends Generic2>(
	semigroupoid: Semigroupoid<a>,
): (<b, c>(f: Type<a, b, c>) => <d>(g: Type<a, c, d>) => Type<a, b, d>) =>
	/*@__PURE__*/ flip(semigroupoid.compose);
