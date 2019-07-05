import { flip, identity } from '../Data/Function';
import { Functor, Functor2 } from '../Data/Functor';
import { Generic1, Generic2, Type } from '../Generic';

export interface Extend<w extends Generic1> extends Functor<w> {
	extend: <a, b>(f: (_: Type<w, a>) => b) => (wa: Type<w, a>) => Type<w, b>;
}

export interface Extend2<w extends Generic2> extends Functor2<w> {
	extend: <a, b, c>(f: (_: Type<w, a, b>) => c) => (wab: Type<w, a, b>) => Type<w, a, c>;
}

interface Helpers<w extends Generic1> {
	extendFlipped: <a>(wa: Type<w, a>) => <b>(f: (_: Type<w, a>) => b) => Type<w, b>;
	composeCoKleisli: <a, b>(
		f: (_: Type<w, a>) => b,
	) => <c>(g: (_: Type<w, b>) => c) => (_: Type<w, a>) => c;
	composeCoKleisliFlipped: <b, c>(
		f: (_: Type<w, b>) => c,
	) => <a>(g: (_: Type<w, a>) => b) => (_: Type<w, a>) => c;
	duplicate: <a>(wa: Type<w, a>) => Type<w, Type<w, a>>;
}
interface Helpers2<w extends Generic2> {
	extendFlipped: <a, b>(wa: Type<w, a, b>) => <c>(f: (_: Type<w, a, b>) => c) => Type<w, a, c>;
	composeCoKleisli: <a, b, c>(
		f: (_: Type<w, a, b>) => c,
	) => <d>(g: (_: Type<w, a, c>) => d) => (_: Type<w, a, b>) => d;
	composeCoKleisliFlipped: <a, c, d>(
		f: (_: Type<w, a, c>) => d,
	) => <b>(g: (_: Type<w, a, b>) => c) => (_: Type<w, a, b>) => d;
	duplicate: <a, b>(wa: Type<w, a, b>) => Type<w, a, Type<w, a, b>>;
}
interface Helper<k extends keyof Helpers<Generic1>> {
	<w extends Generic1>(extend: Extend<w>): Helpers<w>[k];
	<w extends Generic2>(extend: Extend2<w>): Helpers2<w>[k];
}

export const extendFlipped: Helper<'extendFlipped'> = <w extends Generic1>(
	extend: Extend<w>,
): (<a>(wa: Type<w, a>) => <b>(f: (_: Type<w, a>) => b) => Type<w, b>) =>
	/*@__PURE__*/ flip(extend.extend);

export const composeCoKleisli: Helper<'composeCoKleisli'> = <w extends Generic1>(
	extend: Extend<w>,
) => <a, b>(f: (_: Type<w, a>) => b) => <c>(
	g: (_: Type<w, b>) => c,
): ((_: Type<w, a>) => c) => wa => g(extend.extend(f)(wa));

export const composeCoKleisliFlipped: Helper<'composeCoKleisliFlipped'> = <w extends Generic1>(
	extend: Extend<w>,
): (<b, c>(f: (_: Type<w, b>) => c) => <a>(g: (_: Type<w, a>) => b) => (_: Type<w, a>) => c) =>
	/*@__PURE__*/ flip<any, any, any>(composeCoKleisli(extend));

export const duplicate: Helper<'duplicate'> = <w extends Generic1>(
	extend: Extend<w>,
): (<a>(wa: Type<w, a>) => Type<w, Type<w, a>>) => /*@__PURE__*/ extend.extend(identity);
