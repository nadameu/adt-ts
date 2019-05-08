import { flip } from '../instances/Fn';
import { Prop2, Type2 } from '../Types';

export interface Semigroupoid2<f extends Prop2> {
	compose: <b, c>(f: Type2<f, b, c>) => <a>(g: Type2<f, a, b>) => Type2<f, a, c>;
}

interface Derived2<f extends Prop2> extends Semigroupoid2<f> {
	composeFlipped: <a, b>(f: Type2<f, a, b>) => <c>(g: Type2<f, b, c>) => Type2<f, a, c>;
}

type Derive<r extends keyof Derived2<never>> = <f extends Prop2>(
	S: Semigroupoid2<f>,
) => Derived2<f>[r];

export const composeFlipped: Derive<'composeFlipped'> = ({ compose }) => flip(compose);
