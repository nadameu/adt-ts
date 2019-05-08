import { compose, composeFlipped, flip, identity, thrush } from '../instances/Fn';
import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Monad1, Monad2 } from './Monad';
import { Monoid, Monoid1 } from './Monoid';

export interface Foldable1<f extends Prop1> {
	foldr: <a, b>(f: (_: a) => (_: b) => b) => (seed: b) => (fa: Type1<f, a>) => b;
	foldl: <a, b>(f: (_: b) => (_: a) => b) => (seed: b) => (fa: Type1<f, a>) => b;
	foldMap: Orig1<f, 'foldMap'>;
}

export interface Foldable2<f extends Prop2> {
	foldr: <b, c>(f: (_: b) => (_: c) => c) => (seed: c) => <a>(fa: Type2<f, a, b>) => c;
	foldl: <b, c>(f: (_: c) => (_: b) => c) => (seed: c) => <a>(fa: Type2<f, a, b>) => c;
	foldMap: Orig2<f, 'foldMap'>;
}

interface Derived10<f extends Prop1, m> extends Pick<Foldable1<f>, 'foldr' | 'foldl'> {
	foldMap: <a>(f: (_: a) => m) => (fa: Type1<f, a>) => m;
	fold: (fa: Type1<f, m>) => m;
}
interface Derived11<f extends Prop1, m extends Prop1>
	extends Pick<Foldable1<f>, 'foldr' | 'foldl'> {
	foldMap: <a, b>(f: (_: a) => Type1<m, b>) => (fa: Type1<f, a>) => Type1<m, b>;
	fold: <a>(fa: Type1<f, Type1<m, a>>) => Type1<m, a>;
	foldM: <a, b>(f: (_: a) => (_: b) => Type1<m, a>) => (a0: a) => (xs: Type1<f, b>) => Type1<m, a>;
}
interface Derived12<f extends Prop1, m extends Prop2>
	extends Pick<Foldable1<f>, 'foldr' | 'foldl'> {
	foldM: <a, b, c>(
		f: (_: b) => (_: c) => Type2<m, a, b>,
	) => (a0: b) => (xs: Type1<f, c>) => Type2<m, a, b>;
}
interface Derived20<f extends Prop2, m> extends Pick<Foldable2<f>, 'foldr' | 'foldl'> {
	foldMap: <b>(f: (_: b) => m) => <a>(fa: Type2<f, a, b>) => m;
	fold: <a>(fa: Type2<f, a, m>) => m;
}
interface Derived21<f extends Prop2, m extends Prop1>
	extends Pick<Foldable2<f>, 'foldr' | 'foldl'> {
	foldMap: <b, c>(f: (_: b) => Type1<m, c>) => <a>(fa: Type2<f, a, b>) => Type1<m, c>;
	fold: <a, b>(fa: Type2<f, a, Type1<m, b>>) => Type1<m, b>;
	foldM: <b, c>(
		f: (_: b) => (_: c) => Type1<m, b>,
	) => (a0: b) => <a>(xs: Type2<f, a, c>) => Type1<m, b>;
}
interface Derived22<f extends Prop2, m extends Prop2>
	extends Pick<Foldable1<f>, 'foldr' | 'foldl'> {
	foldM: <a, c, d>(
		f: (_: c) => (_: d) => Type2<m, a, c>,
	) => (a0: c) => <b>(xs: Type2<f, b, d>) => Type2<m, a, c>;
}

interface Orig1<f extends Prop1, r extends keyof Derived10<never, never>> {
	<m extends Prop1>(M: Monoid1<m>): Derived11<f, m>[r];
	<m>(M: Monoid<m>): Derived10<f, m>[r];
}
interface Orig2<f extends Prop2, r extends keyof Derived20<never, never>> {
	<m extends Prop1>(M: Monoid1<m>): Derived21<f, m>[r];
	<m>(M: Monoid<m>): Derived20<f, m>[r];
}

type DeriveM<k extends keyof Foldable1<never>, r extends keyof Derived10<never, never>> = <
	f extends Prop1
>(
	F: Pick<Foldable1<f>, k>,
) => <m>(M: Monoid<m>) => Derived10<f, m>[r];
interface DeriveAllM<k extends keyof Foldable1<never>, r extends keyof Derived10<never, never>> {
	<f extends Prop2>(F: Pick<Foldable2<f>, k>): {
		<m extends Prop1>(M: Monoid1<m>): Derived21<f, m>[r];
		<m>(M: Monoid<m>): Derived20<f, m>[r];
	};
	<f extends Prop1>(F: Pick<Foldable1<f>, k>): {
		<m extends Prop1>(M: Monoid1<m>): Derived11<f, m>[r];
		<m>(M: Monoid<m>): Derived10<f, m>[r];
	};
}

type DeriveMd<k extends keyof Foldable1<never>, r extends keyof Derived12<never, never>> = <
	f extends Prop1
>(
	F: Pick<Foldable1<f>, k>,
) => <m extends Prop1>(M: Monad1<m>) => Derived11<f, m>[r];
interface DeriveAllMd<k extends keyof Foldable1<never>, r extends keyof Derived12<never, never>> {
	<f extends Prop2>(F: Pick<Foldable2<f>, k>): {
		<m extends Prop2>(M: Monad2<m>): Derived22<f, m>[r];
		<m extends Prop1>(M: Monad1<m>): Derived21<f, m>[r];
	};
	<f extends Prop1>(F: Pick<Foldable1<f>, k>): {
		<m extends Prop2>(M: Monad2<m>): Derived12<f, m>[r];
		<m extends Prop1>(M: Monad1<m>): Derived11<f, m>[r];
	};
}

type Derive<k extends keyof Foldable1<never>, r extends keyof Derived10<never, never>> = <
	f extends Prop1
>(
	F: Pick<Foldable1<f>, k>,
) => Derived10<f, never>[r];
interface DeriveAll<k extends keyof Foldable1<never>, r extends keyof Derived10<never, never>> {
	<f extends Prop2>(F: Pick<Foldable2<f>, k>): Derived20<f, never>[r];
	<f extends Prop1>(F: Pick<Foldable1<f>, k>): Derived10<f, never>[r];
}

interface PropEndo extends Prop1 {
	type: (_: this['a']) => this['a'];
}
export const foldrDefault: DeriveAll<'foldMap', 'foldr'> = (({ foldMap }) => f => seed => xs =>
	foldMap<PropEndo>({ append: compose, mempty: () => identity })(f)(xs)(seed)) as Derive<
	'foldMap',
	'foldr'
>;

export const foldlDefault: DeriveAll<'foldMap', 'foldl'> = (({ foldMap }) => f => seed => xs =>
	foldMap<PropEndo>({ append: composeFlipped, mempty: () => identity })(flip(f))(xs)(
		seed,
	)) as Derive<'foldMap', 'foldl'>;

export const foldMapDefaultR: DeriveAllM<'foldr', 'foldMap'> = (({ foldr }) => ({
	append,
	mempty,
}) => f => thrush(mempty())(foldr(x => append(f(x))))) as DeriveM<'foldr', 'foldMap'>;

export const foldMapDefaultL: DeriveAllM<'foldl', 'foldMap'> = (({ foldl }) => ({
	append,
	mempty,
}) => f => thrush(mempty())(foldl(acc => x => append(acc)(f(x))))) as DeriveM<'foldl', 'foldMap'>;

export const fold: DeriveAllM<'foldMap', 'fold'> = (({ foldMap }) =>
	flip(foldMap)(identity)) as DeriveM<'foldMap', 'fold'>;

export const foldM: DeriveAllMd<'foldl', 'foldM'> = (({ foldl }) => ({ bind, pure }) => f => seed =>
	thrush(pure(seed))(foldl(ma => y => bind(ma)(flip(f)(y))))) as DeriveMd<'foldl', 'foldM'>;
