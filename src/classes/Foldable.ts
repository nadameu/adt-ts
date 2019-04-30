import { compose, composeFlipped, flip, identity } from '../instances/Fn';
import { Prop1, Prop2, Type1, Type2, AnyFn2 } from '../Types';
import { Monoid, Monoid1, Monoid2 } from './Monoid';
import { Monad2, Monad1 } from './Monad';

export interface Foldable1<f extends Prop1> {
	foldr: <a, b>(f: (_: a) => (_: b) => b) => (seed: b) => (fa: Type1<f, a>) => b;
	foldl: <a, b>(f: (_: b) => (_: a) => b) => (seed: b) => (fa: Type1<f, a>) => b;
	foldMap: {
		<m extends Prop2>(M: Monoid2<m>): <a, b, c>(
			f: (_: a) => Type2<m, b, c>,
		) => (fa: Type1<f, a>) => Type2<m, b, c>;
		<m extends Prop1>(M: Monoid1<m>): <a, b>(
			f: (_: a) => Type1<m, b>,
		) => (fa: Type1<f, a>) => Type1<m, b>;
		<m>(M: Monoid<m>): <a>(f: (_: a) => m) => (fa: Type1<f, a>) => m;
	};
}

export interface Foldable2<f extends Prop2> {
	foldr: <b, c>(f: (_: b) => (_: c) => c) => (seed: c) => <a>(fa: Type2<f, a, b>) => c;
	foldl: <b, c>(f: (_: c) => (_: b) => c) => (seed: c) => <a>(fa: Type2<f, a, b>) => c;
	foldMap: {
		<m extends Prop2>(M: Monoid2<m>): <b, c, d>(
			f: (_: b) => Type2<m, c, d>,
		) => <a>(fa: Type2<f, a, b>) => Type2<m, c, d>;
		<m extends Prop1>(M: Monoid1<m>): <b, c>(
			f: (_: b) => Type1<m, c>,
		) => <a>(fa: Type2<f, a, b>) => Type1<m, c>;
		<m>(M: Monoid<m>): <b>(f: (_: b) => m) => <a>(fa: Type2<f, a, b>) => m;
	};
}

interface PropEndo extends Prop1 {
	type: (_: this['a']) => this['a'];
}
export const foldrDefault: {
	<f extends Prop2>(F: Pick<Foldable2<f>, 'foldMap'>): Foldable2<f>['foldr'];
	<f extends Prop1>(F: Pick<Foldable1<f>, 'foldMap'>): Foldable1<f>['foldr'];
} = <f extends Prop1>({ foldMap }: Pick<Foldable1<f>, 'foldMap'>) => <a, b>(
	f: (_: a) => (_: b) => b,
) => (seed: b) => (xs: Type1<f, a>) =>
	foldMap<PropEndo>({ append: compose, mempty: () => identity })(f)(xs)(seed);

export const foldlDefault: {
	<f extends Prop2>(F: Pick<Foldable2<f>, 'foldMap'>): Foldable2<f>['foldl'];
	<f extends Prop1>(F: Pick<Foldable1<f>, 'foldMap'>): Foldable1<f>['foldl'];
} = <f extends Prop1>({ foldMap }: Pick<Foldable1<f>, 'foldMap'>) => <a, b>(
	f: (_: b) => (_: a) => b,
) => (seed: b) => (xs: Type1<f, a>) =>
	foldMap<PropEndo>({ append: composeFlipped, mempty: () => identity })(flip(f))(xs)(seed);

export const foldMapDefaultR: {
	<f extends Prop2>(F: Pick<Foldable2<f>, 'foldr'>): Foldable2<f>['foldMap'];
	<f extends Prop1>(F: Pick<Foldable1<f>, 'foldr'>): Foldable1<f>['foldMap'];
} = <f extends Prop1>({ foldr }: Pick<Foldable1<f>, 'foldr'>) => <m>({
	append,
	mempty,
}: Monoid<m>) => <a>(f: (_: a) => m) => (fa: Type1<f, a>): m =>
	foldr<a, m>(x => acc => append(f(x))(acc))(mempty())(fa);

export const foldMapDefaultL: {
	<f extends Prop2>(F: Pick<Foldable2<f>, 'foldl'>): Foldable2<f>['foldMap'];
	<f extends Prop1>(F: Pick<Foldable1<f>, 'foldl'>): Foldable1<f>['foldMap'];
} = <f extends Prop1>({ foldl }: Pick<Foldable1<f>, 'foldl'>) => <m>({
	append,
	mempty,
}: Monoid<m>) => <a>(f: (_: a) => m) => (fa: Type1<f, a>): m =>
	foldl<a, m>(acc => x => append(acc)(f(x)))(mempty())(fa);

export const fold: {
	<f extends Prop2>(F: Pick<Foldable2<f>, 'foldMap'>): {
		<m extends Prop2>(M: Monoid2<m>): <a, b, c>(fa: Type2<f, a, Type2<m, b, c>>) => Type2<m, b, c>;
		<m extends Prop1>(M: Monoid1<m>): <a, b>(fa: Type2<f, a, Type1<m, b>>) => Type1<m, b>;
		<b>(M: Monoid<b>): <a>(fa: Type2<f, a, b>) => b;
	};
	<f extends Prop1>(F: Pick<Foldable1<f>, 'foldMap'>): {
		<m extends Prop2>(M: Monoid2<m>): <a, b>(fa: Type1<f, Type2<m, a, b>>) => Type2<m, a, b>;
		<m extends Prop1>(M: Monoid1<m>): <a>(fa: Type1<f, Type1<m, a>>) => Type1<m, a>;
		<a>(M: Monoid<a>): (fa: Type1<f, a>) => a;
	};
} = (({ foldMap }) => M => foldMap(M)(identity)) as AnyFn2;

export const foldM: {
	<f extends Prop2>(F: Pick<Foldable2<f>, 'foldl'>): {
		<m extends Prop2>(M: Pick<Monad2<m>, 'bind' | 'pure'>): <a, b, d>(
			f: (_: b) => (_: d) => Type2<m, a, b>,
		) => (a0: b) => <c>(xs: Type2<f, c, d>) => Type2<m, a, b>;
		<m extends Prop1>(M: Pick<Monad1<m>, 'bind' | 'pure'>): <a, c>(
			f: (_: a) => (_: c) => Type1<m, a>,
		) => (a0: a) => <b>(xs: Type2<f, b, c>) => Type1<m, a>;
	};
	<f extends Prop1>(F: Pick<Foldable1<f>, 'foldl'>): {
		<m extends Prop2>(M: Pick<Monad2<m>, 'bind' | 'pure'>): <a, b, c>(
			f: (_: b) => (_: c) => Type2<m, a, b>,
		) => (a0: b) => (xs: Type1<f, c>) => Type2<m, a, b>;
		<m extends Prop1>(M: Pick<Monad1<m>, 'bind' | 'pure'>): <a, b>(
			f: (_: a) => (_: b) => Type1<m, a>,
		) => (a0: a) => (xs: Type1<f, b>) => Type1<m, a>;
	};
} = <f extends Prop1>({ foldl }: Pick<Foldable1<f>, 'foldl'>) => <m extends Prop1>({
	bind,
	pure,
}: Pick<Monad1<m>, 'bind' | 'pure'>) => <a, b>(f: (_: a) => (_: b) => Type1<m, a>) => (
	a0: a,
): ((xs: Type1<f, b>) => Type1<m, a>) =>
	foldl<b, Type1<m, a>>(ma => b => bind(ma)(flip(f)(b)))(pure(a0));
