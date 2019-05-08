import { identity } from '../instances/Fn';
import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Apply1, Apply2 } from './Apply';
import { Foldable11, Foldable12 } from './Foldable1';
import { Traversable1, Traversable2 } from './Traversable';

export interface Traversable11<t extends Prop1> extends Traversable1<t>, Foldable11<t> {
	traverse1: Orig1<t, 'traverse1'>;
	sequence1: Orig1<t, 'sequence1'>;
}

export interface Traversable12<t extends Prop2> extends Traversable2<t>, Foldable12<t> {
	traverse1: Orig2<t, 'traverse1'>;
	sequence1: Orig2<t, 'sequence1'>;
}

interface Derived11<t extends Prop1, m extends Prop1> {
	traverse1: <a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>;
	sequence1: <a>(ta: Type1<t, Type1<m, a>>) => Type1<m, Type1<t, a>>;
}
interface Derived12<t extends Prop1, m extends Prop2> {
	traverse1: <a, b, c>(
		f: (_: b) => Type2<m, a, c>,
	) => (ta: Type1<t, b>) => Type2<m, a, Type1<t, c>>;
	sequence1: <a, b>(ta: Type1<t, Type2<m, a, b>>) => Type2<m, a, Type1<t, b>>;
}
interface Derived21<t extends Prop2, m extends Prop1> {
	traverse1: <b, c>(
		f: (_: b) => Type1<m, c>,
	) => <a>(ta: Type2<t, a, b>) => Type1<m, Type2<t, a, c>>;
	sequence1: <a, b>(ta: Type2<t, a, Type1<m, b>>) => Type1<m, Type2<t, a, b>>;
}
interface Derived22<t extends Prop2, m extends Prop2> {
	traverse1: <b, c, d>(
		f: (_: c) => Type2<m, b, d>,
	) => <a>(ta: Type2<t, a, c>) => Type2<m, b, Type2<t, a, d>>;
	sequence1: <a, b, c>(ta: Type2<t, a, Type2<m, b, c>>) => Type2<m, b, Type2<t, a, c>>;
}

interface Orig1<t extends Prop1, r extends keyof Derived11<never, never>> {
	<m extends Prop2>(A: Apply2<m>): Derived12<t, m>[r];
	<m extends Prop1>(A: Apply1<m>): Derived11<t, m>[r];
}
interface Orig2<t extends Prop2, r extends keyof Derived21<never, never>> {
	<m extends Prop2>(A: Apply2<m>): Derived22<t, m>[r];
	<m extends Prop1>(A: Apply1<m>): Derived21<t, m>[r];
}
type Derive<k extends keyof Traversable11<never>, r extends keyof Derived11<never, never>> = <
	t extends Prop1
>(
	T: Pick<Traversable11<t>, k>,
) => <m extends Prop1>(A: Apply1<m>) => Derived11<t, m>[r];
interface DeriveAll<k extends keyof Traversable11<never>, r extends keyof Derived11<never, never>> {
	<t extends Prop2>(T: Pick<Traversable12<t>, k>): {
		<m extends Prop2>(A: Apply2<m>): Derived22<t, m>[r];
		<m extends Prop1>(A: Apply1<m>): Derived21<t, m>[r];
	};
	<t extends Prop1>(T: Pick<Traversable11<t>, k>): {
		<m extends Prop2>(A: Apply2<m>): Derived12<t, m>[r];
		<m extends Prop1>(A: Apply1<m>): Derived11<t, m>[r];
	};
}

export const traverse1Default: DeriveAll<'map' | 'sequence1', 'traverse1'> = (({
	map,
	sequence1,
}) => A => f => ta => sequence1(A)(map(f)(ta))) as Derive<'map' | 'sequence1', 'traverse1'>;

export const sequence1Default: DeriveAll<'traverse1', 'sequence1'> = (({ traverse1 }) => A =>
	traverse1(A)(identity)) as Derive<'traverse1', 'sequence1'>;
