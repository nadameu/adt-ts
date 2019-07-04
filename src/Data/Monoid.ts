import { Generic1, Type } from '../Generic';
import { div, Int, mod } from './Int';
import { Semigroup, Semigroup1 } from './Semigroup';

export interface Monoid<a> extends Semigroup<a> {
	mempty: () => a;
}

export interface Monoid1<f extends Generic1> extends Semigroup1<f> {
	mempty: <a = never>() => Type<f, a>;
}

interface Helpers<m> {
	power: (x: m) => (p: Int) => m;
	guard: (cond: boolean) => (x: m) => m;
}
interface Helpers1<f extends Generic1> {
	power: <a>(x: Type<f, a>) => (p: Int) => Type<f, a>;
	guard: (cond: boolean) => <a>(x: Type<f, a>) => Type<f, a>;
}
interface Helper<k extends keyof Helpers<any>> {
	<f extends Generic1>(monoidA: Monoid1<f>): Helpers1<f>[k];
	<m>(monoidA: Monoid<m>): Helpers<m>[k];
}

export const power: Helper<'power'> = <m>(monoidA: Monoid<m>) => (x: m) => {
	const { append, mempty } = monoidA;
	return function go(p: Int): m {
		if (p <= 0) return mempty();
		if (p === 1) return x;
		const x2 = go(div(p)(2 as Int));
		if (mod(p)(2 as Int) === 0) {
			return append(x2)(x2);
		}
		return append(append(x2)(x2))(x2);
	};
};

export const guard: Helper<'guard'> = <m>(monoidA: Monoid<m>) => (cond: boolean) => (m: m): m =>
	cond ? m : monoidA.mempty();
