import { Prop1, Prop2, Type1, Type2 } from '../Types';

export interface Functor1<f extends Prop1> {
	map: <a, b>(f: (_: a) => b) => (fa: Type1<f, a>) => Type1<f, b>;
}
export interface Functor2<f extends Prop2> {
	map: <b, c>(f: (_: b) => c) => <a>(fa: Type2<f, a, b>) => Type2<f, a, c>;
}

interface Derived1<f extends Prop1> extends Functor1<f> {
	mapFlipped: <a>(fa: Type1<f, a>) => <b>(f: (_: a) => b) => Type1<f, b>;
	voidLeft: <a>(fa: Type1<f, a>) => <b>(y: b) => Type1<f, b>;
	voidRight: <b>(x: b) => <a>(fb: Type1<f, a>) => Type1<f, b>;
	void: <a>(fa: Type1<f, a>) => Type1<f, void>;
	flap: <a, b>(ff: Type1<f, (_: a) => b>) => (x: a) => Type1<f, b>;
}
interface Derived2<f extends Prop2> extends Functor2<f> {
	mapFlipped: <a, b>(fa: Type2<f, a, b>) => <c>(f: (_: b) => c) => Type2<f, a, c>;
	voidLeft: <a, b>(fa: Type2<f, a, b>) => <c>(y: c) => Type2<f, a, c>;
	voidRight: <c>(x: c) => <a, b>(fb: Type2<f, a, b>) => Type2<f, a, c>;
	void: <a, b>(fa: Type2<f, a, b>) => Type2<f, a, void>;
	flap: <a, b, c>(ff: Type2<f, a, (_: b) => c>) => (x: b) => Type2<f, a, c>;
}

type Derive<r extends keyof Derived1<never>> = <f extends Prop1>(F: Functor1<f>) => Derived1<f>[r];
interface DeriveAll<r extends keyof Derived1<never>> {
	<f extends Prop2>(F: Functor2<f>): Derived2<f>[r];
	<f extends Prop1>(F: Functor1<f>): Derived1<f>[r];
}

export const mapFlipped: DeriveAll<'mapFlipped'> = (({ map }) => fa => f => map(f)(fa)) as Derive<
	'mapFlipped'
>;

export const voidLeft: DeriveAll<'voidLeft'> = (F => fa => y => voidRight(F)(y)(fa)) as Derive<
	'voidLeft'
>;

export const voidRight: DeriveAll<'voidRight'> = (({ map }) => x => map(_ => x)) as Derive<
	'voidRight'
>;

const _void: DeriveAll<'void'> = (({ map }) => map(_ => undefined)) as Derive<'void'>;
export { _void as void };

export const flap: DeriveAll<'flap'> = (({ map }) => ff => x =>
	map<Function, any>(f => f(x))(ff)) as Derive<'flap'>;
