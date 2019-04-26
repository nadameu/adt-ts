import { AnyFn2, AnyFn3, Prop1, Prop2, Type1, Type2 } from '../Types';
import { Semigroup, Semigroup1, Semigroup2 } from './Semigroup';

export interface Monoid<a> extends Semigroup<a> {
	mempty: () => a;
}
export interface Monoid1<f extends Prop1> extends Semigroup1<f> {
	mempty: <a = never>() => Type1<f, a>;
}
export interface Monoid2<f extends Prop2> extends Semigroup2<f> {
	mempty: <a = never, b = never>() => Type2<f, a, b>;
}

export const power: {
	<f extends Prop1>(M: Monoid1<f>): <a>(fx: Type1<f, a>) => (p: number) => Type1<f, a>;
	<a>(M: Monoid<a>): (x: a) => (p: number) => a;
} = (({ append, mempty }) => x => {
	const go: (p: number) => any = p => {
		if (p <= 0) return mempty();
		if (p === 1) return x;
		if (p % 2 === 0) {
			const x2 = go(p / 2);
			return append(x2)(x2);
		}
		const x2 = go((p / 2) | 0);
		return append(append(x2)(x2))(x);
	};
	return go;
}) as AnyFn2;

export const guard: {
	<f extends Prop1>(M: Pick<Monoid1<f>, 'mempty'>): (
		p: boolean,
	) => <a>(fx: Type1<f, a>) => Type1<f, a>;
	<a>(M: Pick<Monoid<a>, 'mempty'>): (p: boolean) => (x: a) => a;
} = (({ mempty }) => p => x => (p ? x : mempty())) as AnyFn3;
