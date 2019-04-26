import { Prop2, Type2 } from '../Types';

export interface Semigroupoid2<f extends Prop2> {
	compose: <b, c>(f: Type2<f, b, c>) => <a>(g: Type2<f, a, b>) => Type2<f, a, c>;
}

export const composeFlipped: {
	<f extends Prop2>(S: Semigroupoid2<f>): <a, b>(
		f: Type2<f, a, b>,
	) => <c>(g: Type2<f, b, c>) => Type2<f, a, c>;
} = ({ compose }) => f => g => compose(g)(f);
