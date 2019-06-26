import { Prop1, Prop2, Type1, Type2 } from '../Types';
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

interface Derived<a> extends Monoid<a> {
	power: (x: a) => (p: number) => a;
	guard: (p: boolean) => (x: a) => a;
}
interface Derived1<f extends Prop1> extends Monoid1<f> {
	power: <a>(fx: Type1<f, a>) => (p: number) => Type1<f, a>;
	guard: (p: boolean) => <a>(fx: Type1<f, a>) => Type1<f, a>;
}

type Derive<k extends keyof Monoid<never>, r extends keyof Derived<never>> = <a>(
	M: Pick<Monoid<a>, k>,
) => Derived<a>[r];
interface DeriveAll<k extends keyof Monoid<never>, r extends keyof Derived<never>> {
	<f extends Prop1>(M: Pick<Monoid1<f>, k>): Derived1<f>[r];
	<a>(M: Pick<Monoid<a>, k>): Derived<a>[r];
}

export const power: DeriveAll<'append' | 'mempty', 'power'> = (({ append, mempty }) => x => {
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
}) as Derive<'append' | 'mempty', 'power'>;

export const guard: DeriveAll<'mempty', 'guard'> = (({ mempty }) => p => x =>
	p ? x : mempty()) as Derive<'mempty', 'guard'>;
