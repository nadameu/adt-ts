import { flip, identity, thrush } from '../instances/Fn';
import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Applicative1, Applicative2 } from './Applicative';
import { Apply2 } from './Apply';
import { Foldable1, Foldable2 } from './Foldable';
import { Functor1, Functor2 } from './Functor';

export interface Traversable1<t extends Prop1> extends Functor1<t>, Foldable1<t> {
	traverse: Orig1<t, 'traverse'>;
	sequence: Orig1<t, 'sequence'>;
}

export interface Traversable2<t extends Prop2> extends Functor2<t>, Foldable2<t> {
	traverse: Orig2<t, 'traverse'>;
	sequence: Orig2<t, 'sequence'>;
}

interface Derived10<f extends Prop1> {
	mapAccum: <s, a, b>(
		f: (_: s) => (_: a) => Accum<s, b>,
	) => (s0: s) => (xs: Type1<f, a>) => Accum<s, Type1<f, b>>;
	scanl: <a, b>(f: (_: b) => (_: a) => b) => (seed: b) => (fa: Type1<f, a>) => Type1<f, b>;
	scanr: <a, b>(f: (_: a) => (_: b) => b) => (seed: b) => (fa: Type1<f, a>) => Type1<f, b>;
}
interface Derived11<t extends Prop1, m extends Prop1> {
	traverse: <a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>;
	sequence: <a>(ta: Type1<t, Type1<m, a>>) => Type1<m, Type1<t, a>>;
	for: <a>(ta: Type1<t, a>) => <b>(f: (_: a) => Type1<m, b>) => Type1<m, Type1<t, b>>;
}
interface Derived12<t extends Prop1, m extends Prop2> {
	traverse: <a, b, c>(f: (_: b) => Type2<m, a, c>) => (ta: Type1<t, b>) => Type2<m, a, Type1<t, c>>;
	sequence: <a, b>(ta: Type1<t, Type2<m, a, b>>) => Type2<m, a, Type1<t, b>>;
	for: <b>(ta: Type1<t, b>) => <a, c>(f: (_: b) => Type2<m, a, c>) => Type2<m, a, Type1<t, c>>;
}
interface Derived20<f extends Prop2> {
	mapAccum: <s, b, c>(
		f: (_: s) => (_: b) => Accum<s, c>,
	) => (s0: s) => <a>(xs: Type2<f, a, b>) => Accum<s, Type2<f, a, c>>;
	scanl: <b, c>(f: (_: c) => (_: b) => c) => (seed: c) => <a>(fa: Type2<f, a, b>) => Type2<f, a, c>;
	scanr: <b, c>(f: (_: b) => (_: c) => c) => (seed: c) => <a>(fa: Type2<f, a, b>) => Type2<f, a, c>;
}
interface Derived21<t extends Prop2, m extends Prop1> {
	traverse: <b, c>(f: (_: b) => Type1<m, c>) => <a>(ta: Type2<t, a, b>) => Type1<m, Type2<t, a, c>>;
	sequence: <a, b>(ta: Type2<t, a, Type1<m, b>>) => Type1<m, Type2<t, a, b>>;
	for: <a, b>(ta: Type2<t, a, b>) => <c>(f: (_: b) => Type1<m, c>) => Type1<m, Type2<t, a, c>>;
}
interface Derived22<t extends Prop2, m extends Prop2> {
	traverse: <b, c, d>(
		f: (_: c) => Type2<m, b, d>,
	) => <a>(ta: Type2<t, a, c>) => Type2<m, b, Type2<t, a, d>>;
	sequence: <a, b, c>(ta: Type2<t, a, Type2<m, b, c>>) => Type2<m, b, Type2<t, a, c>>;
	for: <a, c>(
		ta: Type2<t, a, c>,
	) => <b, d>(f: (_: c) => Type2<m, b, d>) => Type2<m, a, Type2<t, b, d>>;
}

interface Orig1<t extends Prop1, r extends keyof Derived11<never, never>> {
	<m extends Prop2>(A: Applicative2<m>): Derived12<t, m>[r];
	<m extends Prop1>(A: Applicative1<m>): Derived11<t, m>[r];
}
interface Orig2<t extends Prop2, r extends keyof Derived21<never, never>> {
	<m extends Prop2>(A: Applicative2<m>): Derived22<t, m>[r];
	<m extends Prop1>(A: Applicative1<m>): Derived21<t, m>[r];
}
type Derive<k extends keyof Traversable1<never>, r extends keyof Derived11<never, never>> = <
	t extends Prop1
>(
	T: Pick<Traversable1<t>, k>,
) => <m extends Prop1>(A: Applicative1<m>) => Derived11<t, m>[r];
interface DeriveAll<k extends keyof Traversable1<never>, r extends keyof Derived11<never, never>> {
	<t extends Prop2>(T: Pick<Traversable2<t>, k>): {
		<m extends Prop2>(A: Applicative2<m>): Derived22<t, m>[r];
		<m extends Prop1>(A: Applicative1<m>): Derived21<t, m>[r];
	};
	<t extends Prop1>(T: Pick<Traversable1<t>, k>): {
		<m extends Prop2>(A: Applicative2<m>): Derived12<t, m>[r];
		<m extends Prop1>(A: Applicative1<m>): Derived11<t, m>[r];
	};
}

type DeriveNoApp<k extends keyof Traversable1<never>, r extends keyof Derived10<never>> = <
	f extends Prop1
>(
	T: Pick<Traversable1<f>, k>,
) => Derived10<f>[r];
interface DeriveAllNoApp<k extends keyof Traversable1<never>, r extends keyof Derived10<never>> {
	<f extends Prop2>(T: Pick<Traversable2<f>, k>): Derived20<f>[r];
	<f extends Prop1>(T: Pick<Traversable1<f>, k>): Derived10<f>[r];
}

export const traverseDefault: DeriveAll<'map' | 'sequence', 'traverse'> = (({
	map,
	sequence,
}) => A => f => ta => sequence(A)(map(f)(ta))) as Derive<'map' | 'sequence', 'traverse'>;

export const sequenceDefault: DeriveAll<'traverse', 'sequence'> = (({ traverse }) => A =>
	traverse(A)(identity)) as Derive<'traverse', 'sequence'>;

const _for: DeriveAll<'traverse', 'for'> = (({ traverse }) => A => flip(traverse(A))) as Derive<
	'traverse',
	'for'
>;
export { _for as for };

interface Accum<s, a> {
	accum: s;
	value: a;
}

type StateL<s, a> = (_: s) => Accum<s, a>;

interface PropStateL extends Prop2 {
	type: StateL<this['a'], this['b']>;
}

const mapStateL: Functor2<PropStateL>['map'] = f => k => s => {
	const { accum, value } = k(s);
	return { accum, value: f(value) };
};

const applyStateL: Apply2<PropStateL>['apply'] = f => x => s => {
	const { accum: s1, value: f1 } = f(s);
	const { accum: s2, value: x1 } = x(s1);
	return { accum: s2, value: f1(x1) };
};

const pureStateL: Applicative2<PropStateL>['pure'] = value => accum => ({
	accum,
	value,
});

type StateR<s, a> = (_: s) => Accum<s, a>;

interface PropStateR extends Prop2 {
	type: StateR<this['a'], this['b']>;
}

const mapStateR: Functor2<PropStateR>['map'] = mapStateL;

const applyStateR: Apply2<PropStateR>['apply'] = f => x => s => {
	const { accum: s1, value: x1 } = x(s);
	const { accum: s2, value: f1 } = f(s1);
	return { accum: s2, value: f1(x1) };
};

const pureStateR: Applicative2<PropStateR>['pure'] = pureStateL;

export const scanl: DeriveAllNoApp<'traverse', 'scanl'> = (T => f => b0 => xs =>
	thrush(xs)(
		thrush(b0)(
			mapAccumL(T)(b => a => {
				const b1 = f(b)(a);
				return { accum: b1, value: b1 };
			}),
		),
	).value) as DeriveNoApp<'traverse', 'scanl'>;

export const mapAccumL: DeriveAllNoApp<'traverse', 'mapAccum'> = (({ traverse }) => f => s0 => xs =>
	thrush(xs)(
		traverse<PropStateL>({ apply: applyStateL, map: mapStateL, pure: pureStateL })(flip(f)),
	)(s0)) as DeriveNoApp<'traverse', 'mapAccum'>;

export const scanr: DeriveAllNoApp<'traverse', 'scanr'> = (T => f => b0 => xs =>
	thrush(xs)(
		thrush(b0)(
			mapAccumR(T)(b => a => {
				const b1 = f(a)(b);
				return { accum: b1, value: b1 };
			}),
		),
	).value) as DeriveNoApp<'traverse', 'scanr'>;

export const mapAccumR: DeriveAllNoApp<'traverse', 'mapAccum'> = (({ traverse }) => f => s0 => xs =>
	thrush(xs)(
		traverse<PropStateR>({ apply: applyStateR, map: mapStateR, pure: pureStateR })(flip(f)),
	)(s0)) as DeriveNoApp<'traverse', 'mapAccum'>;
