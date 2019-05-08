import { constant, flip, identity } from '../instances/Fn';
import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Functor1, Functor2 } from './Functor';

export interface Apply1<f extends Prop1> extends Functor1<f> {
	apply: <a, b>(ff: Type1<f, (_: a) => b>) => (fa: Type1<f, a>) => Type1<f, b>;
}
export interface Apply2<f extends Prop2> extends Functor2<f> {
	apply: <a, b, c>(ff: Type2<f, a, (_: b) => c>) => (fa: Type2<f, a, b>) => Type2<f, a, c>;
}

interface Derived1<f extends Prop1> extends Apply1<f> {
	applyFlipped: <a>(fa: Type1<f, a>) => <b>(ff: Type1<f, (_: a) => b>) => Type1<f, b>;
	applyFirst: <a>(fa: Type1<f, a>) => <b>(fb: Type1<f, b>) => Type1<f, a>;
	applySecond: <a>(fa: Type1<f, a>) => <b>(fb: Type1<f, b>) => Type1<f, b>;
	lift2: <a, b, c>(
		f: (_: a) => (_: b) => c,
	) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => Type1<f, c>;
	lift3: <a, b, c, d>(
		f: (_: a) => (_: b) => (_: c) => d,
	) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => (fc: Type1<f, c>) => Type1<f, d>;
	lift4: <a, b, c, d, e>(
		f: (_: a) => (_: b) => (_: c) => (_: d) => e,
	) => (
		fa: Type1<f, a>,
	) => (fb: Type1<f, b>) => (fc: Type1<f, c>) => (fd: Type1<f, d>) => Type1<f, e>;
	lift5: <a, b, c, d, e, g>(
		f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => g,
	) => (
		fa: Type1<f, a>,
	) => (
		fb: Type1<f, b>,
	) => (fc: Type1<f, c>) => (fd: Type1<f, d>) => (fe: Type1<f, e>) => Type1<f, g>;
}
interface Derived2<f extends Prop2> extends Apply2<f> {
	applyFlipped: <a, b>(fa: Type2<f, a, b>) => <c>(ff: Type2<f, a, (_: b) => c>) => Type2<f, a, c>;
	applyFirst: <a, b>(fa: Type2<f, a, b>) => <c>(fb: Type2<f, a, c>) => Type2<f, a, b>;
	applySecond: <a, b>(fa: Type2<f, a, b>) => <c>(fb: Type2<f, a, c>) => Type2<f, a, c>;
	lift2: <b, c, d>(
		f: (_: b) => (_: c) => d,
	) => <a>(fa: Type2<f, a, b>) => (fb: Type2<f, a, c>) => Type2<f, a, d>;
	lift3: <b, c, d, e>(
		f: (_: b) => (_: c) => (_: d) => e,
	) => <a>(fa: Type2<f, a, b>) => (fb: Type2<f, a, c>) => (fc: Type2<f, a, d>) => Type2<f, a, e>;
	lift4: <b, c, d, e, g>(
		f: (_: b) => (_: c) => (_: d) => (_: e) => g,
	) => <a>(
		fa: Type2<f, a, b>,
	) => (fb: Type2<f, a, c>) => (fc: Type2<f, a, d>) => (fd: Type2<f, a, e>) => Type2<f, a, g>;
	lift5: <b, c, d, e, g, h>(
		f: (_: b) => (_: c) => (_: d) => (_: e) => (_: g) => h,
	) => <a>(
		fa: Type2<f, a, b>,
	) => (
		fb: Type2<f, a, c>,
	) => (fc: Type2<f, a, d>) => (fd: Type2<f, a, e>) => (fe: Type2<f, a, g>) => Type2<f, a, h>;
}

type Derive<k extends keyof Apply1<never>, r extends keyof Derived1<never>> = <f extends Prop1>(
	A: Pick<Apply1<f>, k>,
) => Derived1<f>[r];
interface DeriveAll<k extends keyof Apply1<never>, r extends keyof Derived1<never>> {
	<f extends Prop2>(A: Pick<Apply2<f>, k>): Derived2<f>[r];
	<f extends Prop1>(A: Pick<Apply1<f>, k>): Derived1<f>[r];
}

export const applyFlipped: DeriveAll<'apply', 'applyFlipped'> = (({ apply }) =>
	flip(apply)) as Derive<'apply', 'applyFlipped'>;

export const applyFirst: DeriveAll<'apply' | 'map', 'applyFirst'> = (({ apply, map }) =>
	lift2({ apply, map })(constant)) as Derive<'apply' | 'map', 'applyFirst'>;

export const applySecond: DeriveAll<'apply' | 'map', 'applySecond'> = (({ apply, map }) =>
	lift2({ apply, map })(constant(identity))) as Derive<'apply' | 'map', 'applySecond'>;

export const lift2: DeriveAll<'apply' | 'map', 'lift2'> = (({ apply, map }) => f => fa =>
	apply(map(f)(fa))) as Derive<'apply' | 'map', 'lift2'>;

export const lift3: DeriveAll<'apply' | 'map', 'lift3'> = (({ apply, map }) => f => fa => fb =>
	apply(lift2({ apply, map })(f)(fa)(fb))) as Derive<'apply' | 'map', 'lift3'>;

export const lift4: DeriveAll<'apply' | 'map', 'lift4'> = (({
	apply,
	map,
}) => f => fa => fb => fc => apply(lift3({ apply, map })(f)(fa)(fb)(fc))) as Derive<
	'apply' | 'map',
	'lift4'
>;

export const lift5: DeriveAll<'apply' | 'map', 'lift5'> = (({
	apply,
	map,
}) => f => fa => fb => fc => fd => apply(lift4({ apply, map })(f)(fa)(fb)(fc)(fd))) as Derive<
	'apply' | 'map',
	'lift5'
>;
