import { Generic1, Generic2, Type } from '../Generic';
import { Monoid, Monoid1 } from './Monoid';
import { makeMonoidEndo, Endo } from './Monoid/Endo';
import { categoryFunc } from '../StackSafe/Function';
import { GenericFn, flip, identity, compose } from './Function';
import { makeMonoidDual, Dual } from './Monoid/Dual';
import { Monad } from '../Control/Monad';
import { Applicative } from '../Control/Applicative';
import { voidLeft, voidRight } from './Functor';
import { applySecond } from '../Control/Apply';
import { Plus } from '../Control/Plus';
import { makeMonoidAdditive, Additive } from './Monoid/Additive';
import { semiringInt, Int, one } from './Int';
import { monoidConj, Conj } from './Monoid/Conj';

export interface Foldable<f extends Generic1> {
	foldr: <a, b>(f: (_: a) => (_: b) => b) => (z: b) => (fa: Type<f, a>) => b;
	foldl: <a, b>(f: (_: b) => (_: a) => b) => (z: b) => (fa: Type<f, a>) => b;
	foldMap: {
		<m extends Generic1>(monoid: Monoid1<m>): <a, b>(
			f: (_: a) => Type<m, b>,
		) => (fa: Type<f, a>) => Type<m, b>;
		<m>(monoid: Monoid<m>): <a>(f: (_: a) => m) => (fa: Type<f, a>) => m;
	};
}

export interface Foldable2<f extends Generic2> {
	foldr: <b, c>(f: (_: b) => (_: c) => c) => (z: c) => <a>(fab: Type<f, a, b>) => c;
	foldl: <b, c>(f: (_: c) => (_: b) => c) => (z: c) => <a>(fab: Type<f, a, b>) => c;
	foldMap: {
		<m extends Generic1>(monoid: Monoid1<m>): <b, c>(
			f: (_: b) => Type<m, c>,
		) => <a>(fab: Type<f, a, b>) => Type<m, c>;
		<m>(monoid: Monoid<m>): <b>(f: (_: b) => m) => <a>(fab: Type<f, a, b>) => m;
	};
}

export const foldrDefault = <f extends Generic1>(foldable: Foldable<f>) => <a, b>(
	f: (_: a) => (_: b) => b,
) => (z: b) => (fa: Type<f, a>): b =>
	foldable.foldMap(makeMonoidEndo(categoryFunc))(f as (_: a) => Endo<GenericFn, b>)(fa)(z);

export const foldlDefault = <f extends Generic1>(foldable: Foldable<f>) => <a, b>(
	f: (_: b) => (_: a) => b,
) => (z: b) => (fa: Type<f, a>): b =>
	foldable.foldMap(makeMonoidDual(makeMonoidEndo(categoryFunc)))(flip(f) as (
		_: a,
	) => Dual<Endo<GenericFn, b>>)(fa)(z);

export const foldMapDefaultR = <f extends Generic1>(foldable: Foldable<f>) => <m>(
	monoid: Monoid<m>,
) => <a>(f: (_: a) => m): ((fa: Type<f, a>) => m) =>
	/*@__PURE__*/ foldable.foldr<a, m>(x => monoid.append(f(x)))(monoid.mempty());

export const foldMapDefaultL = <f extends Generic1>(foldable: Foldable<f>) => <m>(
	monoid: Monoid<m>,
) => <a>(f: (_: a) => m): ((fa: Type<f, a>) => m) =>
	/*@__PURE__*/ foldable.foldl<a, m>(acc => x => monoid.append(acc)(f(x)))(monoid.mempty());

export const fold = <f extends Generic1>(foldable: Foldable<f>) => <m>(
	monoid: Monoid<m>,
): ((fm: Type<f, m>) => m) => /*@__PURE__*/ foldable.foldMap(monoid)(identity);

export const foldM = <f extends Generic1>(foldable: Foldable<f>) => <m extends Generic1>(
	monad: Monad<m>,
) => <a, b>(f: (_: a) => (_: b) => Type<m, a>) => (a0: a): ((fb: Type<f, b>) => Type<m, a>) => {
	const fFlipped = /*@__PURE__*/ flip(f);
	return /*@__PURE__*/ foldable.foldl<b, Type<m, a>>(ma => b => monad.bind(ma)(fFlipped(b)))(
		monad.pure(a0),
	);
};

export const traverse_ = <m extends Generic1>(applicative: Applicative<m>) => <f extends Generic1>(
	foldable: Foldable<f>,
) => <a, b>(f: (_: a) => Type<m, b>): ((fa: Type<f, a>) => Type<m, void>) => {
	const apSnd = /*@__PURE__*/ applySecond(applicative);
	return /*@__PURE__*/ foldable.foldr<a, Type<m, void>>(x => apSnd(f(x)))(
		applicative.pure(undefined),
	);
};

export const for_ = <m extends Generic1>(applicative: Applicative<m>) => <f extends Generic1>(
	foldable: Foldable<f>,
): (<a>(fa: Type<f, a>) => <b>(f: (_: a) => Type<m, b>) => Type<m, void>) =>
	/*@__PURE__*/ flip(traverse_(applicative)(foldable));

export const sequence_ = <m extends Generic1>(applicative: Applicative<m>) => <f extends Generic1>(
	foldable: Foldable<f>,
): (<a>(fma: Type<f, Type<m, a>>) => Type<m, void>) =>
	/*@__PURE__*/ traverse_(applicative)(foldable)(identity);

export const oneOf = <f extends Generic1>(foldable: Foldable<f>) => <g extends Generic1>(
	plus: Plus<g>,
): (<a>(fga: Type<f, Type<g, a>>) => Type<g, a>) =>
	/*@__PURE__*/ foldable.foldr(plus.alt)(plus.empty());

export const oneOfMap = <f extends Generic1>(foldable: Foldable<f>) => <g extends Generic1>(
	plus: Plus<g>,
) => <a, b>(f: (_: a) => Type<g, b>): ((fa: Type<f, a>) => Type<g, b>) =>
	/*@__PURE__*/ foldable.foldr<a, Type<g, b>>(x => plus.alt(f(x)))(plus.empty());

// TODO: intercalate, surroundMap, surround, and, or, all, any, sum, product
// TODO: elem, notElem, indexl, indexr, find, findMap, maximum, maximumBy
// TODO: minimum, minimumBy

export const null$ = <f extends Generic1>(
	foldable: Foldable<f>,
): (<a>(fa: Type<f, a>) => boolean) => foldable.foldMap(monoidConj)(_ => false as Conj);

export const length = <f extends Generic1>(foldable: Foldable<f>): (<a>(fa: Type<f, a>) => Int) =>
	foldable.foldMap(makeMonoidAdditive(semiringInt))(_ => 1 as Additive<Int>);
