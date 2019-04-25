import { Prop2, Type } from '../Types';

export interface Semigroupoid<f extends Prop2> {
	compose: <b, c, x, w, v>(
		f: Type<f, v, w, x, b, c>,
	) => <a>(g: Type<f, v, w, x, a, b>) => Type<f, v, w, x, a, c>;
}

export const composeFlipped: <f extends Prop2>(
	S: Semigroupoid<f>,
) => <a, b, x, w, v>(
	f: Type<f, v, w, x, a, b>,
) => <c>(g: Type<f, v, w, x, b, c>) => Type<f, v, w, x, a, c> = ({ compose }) => f => g =>
	compose(g)(f);
