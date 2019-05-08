import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Applicative1, Applicative2 } from './Applicative';
import { Foldable1, Foldable2 } from './Foldable';
import { Functor1, Functor2 } from './Functor';

export interface Traversable1<t extends Prop1> extends Functor1<t>, Foldable1<t> {
	traverse: {
		<m extends Prop2>(A: Applicative2<m>): <a, b, c>(
			f: (_: b) => Type2<m, a, c>,
		) => (ta: Type1<t, b>) => Type2<m, a, Type1<t, c>>;
		<m extends Prop1>(A: Applicative1<m>): <a, b>(
			f: (_: a) => Type1<m, b>,
		) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>;
	};
	sequence: {
		<m extends Prop2>(A: Applicative2<m>): <a, b>(
			ta: Type1<t, Type2<m, a, b>>,
		) => Type2<m, a, Type1<t, b>>;
		<m extends Prop1>(A: Applicative1<m>): <a>(ta: Type1<t, Type1<m, a>>) => Type1<m, Type1<t, a>>;
	};
}

export interface Traversable2<t extends Prop2> extends Functor2<t>, Foldable2<t> {
	traverse: {
		<m extends Prop2>(A: Applicative2<m>): <b, c, d>(
			f: (_: c) => Type2<m, b, d>,
		) => <a>(ta: Type2<t, a, c>) => Type2<m, b, Type1<t, d>>;
		<m extends Prop1>(A: Applicative1<m>): <b, c>(
			f: (_: b) => Type1<m, c>,
		) => <a>(ta: Type2<t, a, b>) => Type1<m, Type2<t, a, c>>;
	};
	sequence: {
		<m extends Prop2>(A: Applicative2<m>): <a, b, c>(
			ta: Type2<t, a, Type2<m, b, c>>,
		) => Type2<m, b, Type2<t, a, c>>;
		<m extends Prop1>(A: Applicative1<m>): <a, b>(
			ta: Type2<t, a, Type1<m, b>>,
		) => Type1<m, Type2<t, a, b>>;
	};
}

export const traverseDefault: {
	<t extends Prop2>(T: Pick<Traversable2<t>, 'map' | 'sequence'>): Traversable2<t>['traverse'];
	<t extends Prop1>(T: Pick<Traversable1<t>, 'map' | 'sequence'>): Traversable1<t>['traverse'];
} = <t extends Prop1>({ map, sequence }: Pick<Traversable1<t>, 'map' | 'sequence'>) => <
	m extends Prop1
>(
	A: Applicative1<m>,
) => <a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<t, a>): Type1<m, Type1<t, b>> =>
	sequence(A)(map(f)(ta));

export const sequenceDefault: {
	<t extends Prop2>(T: Pick<Traversable2<t>, 'traverse'>): Traversable2<t>['sequence'];
	<t extends Prop1>(T: Pick<Traversable1<t>, 'traverse'>): Traversable1<t>['sequence'];
} = <t extends Prop1>({ traverse }: Pick<Traversable1<t>, 'traverse'>) => <m extends Prop1>(
	A: Applicative1<m>,
): (<a>(ta: Type1<t, Type1<m, a>>) => Type1<m, Type1<t, a>>) =>
	traverse(A)(<a>(x: Type1<m, a>) => x);

const _for: {
	<t extends Prop2>(T: Pick<Traversable2<t>, 'traverse'>): {
		<m extends Prop2>(A: Applicative2<m>): <a, b>(
			ta: Type2<t, a, b>,
		) => <c, d>(f: (_: b) => Type2<m, c, d>) => Type2<m, c, Type2<t, a, d>>;
		<m extends Prop1>(A: Applicative1<m>): <a, b>(
			ta: Type2<t, a, b>,
		) => <c>(f: (_: b) => Type1<m, c>) => Type1<m, Type2<t, a, c>>;
	};
	<t extends Prop1>(T: Pick<Traversable1<t>, 'traverse'>): {
		<m extends Prop2>(A: Applicative2<m>): <a>(
			ta: Type1<t, a>,
		) => <b, c>(f: (_: a) => Type2<m, b, c>) => Type2<m, b, Type1<t, c>>;
		<m extends Prop1>(A: Applicative1<m>): <a>(
			ta: Type1<t, a>,
		) => <b>(f: (_: a) => Type1<m, b>) => Type1<m, Type1<t, b>>;
	};
} = (({ traverse }) => A => ta => f => traverse(A)(f)(ta)) as <t extends Prop1>(
	T: Pick<Traversable1<t>, 'traverse'>,
) => <m extends Prop1>(
	A: Applicative1<m>,
) => <a>(ta: Type1<t, a>) => <b>(f: (_: a) => Type1<m, b>) => Type1<m, Type1<t, b>>;
export { _for as for };
