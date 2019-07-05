import { Alt, Alt2 } from '../Control/Alt';
import { Applicative, Applicative2 } from '../Control/Applicative';
import { Apply2, lift2 } from '../Control/Apply';
import { Bind2 } from '../Control/Bind';
import { Extend2 } from '../Control/Extend';
import { Monad2 } from '../Control/Monad';
import { Generic1, Generic2, Type } from '../Generic';
import { Bifunctor } from './Bifunctor';
import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { Foldable2 } from './Foldable';
import { constant, identity } from './Function';
import { Functor2 } from './Functor';
import { Monoid, Monoid1 } from './Monoid';
import { Ord } from './Ord';
import { GT, LT } from './Ordering';
import { Semigroup, Semigroup1, Semigroup2 } from './Semigroup';
import { Show } from './Show';

const EitherSymbol = Symbol();
export type Either<a, b> = Left<a> | Right<b>;
export interface GenericEither extends Generic2 {
	type: Either<this['a'], this['b']>;
}

export interface Left<a> {
	[EitherSymbol]: 'Left';
	leftValue: a;
}
export const Left = <a>(leftValue: a): Left<a> => ({ [EitherSymbol]: 'Left', leftValue });
export const isLeft = <a, b>(fx: Either<a, b>): fx is Left<a> => fx[EitherSymbol] === 'Left';

export interface Right<b> {
	[EitherSymbol]: 'Right';
	rightValue: b;
}
export const Right = <b>(rightValue: b): Right<b> => ({
	[EitherSymbol]: 'Right',
	rightValue,
});
export const isRight = <a, b>(fx: Either<a, b>): fx is Right<b> => fx[EitherSymbol] === 'Right';

export const map = <b, c>(f: (_: b) => c) => <a>(fx: Either<a, b>): Either<a, c> =>
	isLeft(fx) ? fx : Right(f(fx.rightValue));
export const functorEither: Functor2<GenericEither> = { map };

export const bimap = <a, c>(f: (_: a) => c) => <b, d>(g: (_: b) => d) => (
	fx: Either<a, b>,
): Either<c, d> => (isLeft(fx) ? Left(f(fx.leftValue)) : Right(g(fx.rightValue)));
export const bifunctorEither: Bifunctor<GenericEither> = { bimap };

const apply = <a, b, c>(ff: Either<a, (_: b) => c>): ((fa: Either<a, b>) => Either<a, c>) =>
	isLeft(ff) ? constant(ff) : map(ff.rightValue);
export const applyEither: Apply2<GenericEither> = {
	...functorEither,
	apply,
};

export const pure: <b, a = never>(x: b) => Either<a, b> = Right;
export const applicativeEither: Applicative2<GenericEither> = { ...applyEither, pure: Right };

export const alt = <a, b>(fx: Either<a, b>) => (fy: Either<a, b>): Either<a, b> =>
	isLeft(fx) ? fy : fx;
export const altEither: Alt2<GenericEither> = { ...functorEither, alt };

export const bind = <a, b>(fx: Either<a, b>) => <c>(f: (_: b) => Either<a, c>): Either<a, c> =>
	isLeft(fx) ? fx : f(fx.rightValue);
export const bindEither: Bind2<GenericEither> = { ...applyEither, bind };

export const monadEither: Monad2<GenericEither> = { ...applicativeEither, ...bindEither };

export const extend = <a, b, c>(f: (_: Either<a, b>) => c) => (fx: Either<a, b>): Either<a, c> =>
	isLeft(fx) ? fx : Right(f(fx));
export const extendEither: Extend2<GenericEither> = { ...functorEither, extend };

export const makeShowEither = <a, b>(showA: Show<a>, showB: Show<b>): Show<Either<a, b>> => ({
	show: fx =>
		isLeft(fx) ? `(Left ${showA.show(fx.leftValue)})` : `(Right ${showB.show(fx.rightValue)})`,
});
export const makeEqEither = <a, b>(eqA: Eq<a>, eqB: Eq<b>): Eq<Either<a, b>> => ({
	eq: fx => fy =>
		isLeft(fx)
			? isLeft(fy) && eqA.eq(fx.leftValue)(fy.leftValue)
			: isRight(fy) && eqB.eq(fx.rightValue)(fy.rightValue),
});
export const makeOrdEither = <a, b>(ordA: Ord<a>, ordB: Ord<b>): Ord<Either<a, b>> => ({
	...makeEqEither(ordA, ordB),
	compare: fx => fy =>
		isLeft(fx)
			? isLeft(fy)
				? ordA.compare(fx.leftValue)(fy.leftValue)
				: LT
			: isRight(fy)
			? ordB.compare(fx.rightValue)(fy.rightValue)
			: GT,
});
export const makeBoundedEither = <a, b>(
	boundedA: Bounded<a>,
	boundedB: Bounded<b>,
): Bounded<Either<a, b>> => ({
	...makeOrdEither(boundedA, boundedB),
	top: Right(boundedB.top),
	bottom: Left(boundedA.bottom),
});

export const foldr = <b, c>(f: (_: b) => (_: c) => c) => (z: c) => <a>(fx: Either<a, b>): c =>
	isLeft(fx) ? z : f(fx.rightValue)(z);
export const foldl = <b, c>(f: (_: c) => (_: b) => c) => (z: c) => <a>(fx: Either<a, b>): c =>
	isLeft(fx) ? z : f(z)(fx.rightValue);
export const foldMap: {
	<f extends Generic1>(monoid: Monoid1<f>): <b, c>(
		f: (_: b) => Type<f, c>,
	) => <a>(fx: Either<a, b>) => Type<f, c>;
	<m>(monoid: Monoid<m>): <b>(f: (_: b) => m) => <a>(fx: Either<a, b>) => m;
} = <m>(monoid: Monoid<m>) => <b>(f: (_: b) => m) => <a>(fx: Either<a, b>): m =>
	isLeft(fx) ? monoid.mempty() : f(fx.rightValue);
export const foldableEither: Foldable2<GenericEither> = {
	foldr,
	foldl,
	foldMap,
};

export const bifoldr = <a, c>(f: (_: a) => (_: c) => c) => <b>(g: (_: b) => (_: c) => c) => (
	z: c,
) => (fx: Either<a, b>): c => (isLeft(fx) ? f(fx.leftValue)(z) : g(fx.rightValue)(z));
export const bifoldl = <a, c>(f: (_: c) => (_: a) => c) => <b>(g: (_: c) => (_: b) => c) => (
	z: c,
) => (fx: Either<a, b>): c => (isLeft(fx) ? f(z)(fx.leftValue) : g(z)(fx.rightValue));
export const bifoldMap: {
	<f extends Generic1>(_: Monoid1<f>): <a, c>(
		f: (_: a) => Type<f, c>,
	) => <b>(g: (_: b) => Type<f, c>) => (fx: Either<a, b>) => Type<f, c>;
	<m>(_: Monoid<m>): <a>(f: (_: a) => m) => <b>(g: (_: b) => m) => (fx: Either<a, b>) => m;
} = <m>(_: Monoid<m>) => <a>(f: (_: a) => m) => <b>(g: (_: b) => m) => (fx: Either<a, b>): m =>
	isLeft(fx) ? f(fx.leftValue) : g(fx.rightValue);
// TODO: Bifoldable

export const traverse: {
	<f extends Generic1>(applicative: Applicative<f>): <b, c>(
		f: (_: b) => Type<f, c>,
	) => <a>(fx: Either<a, b>) => Type<f, Either<a, c>>;
	<f extends Generic2>(applicative: Applicative2<f>): <a, c, d>(
		f: (_: c) => Type<f, a, d>,
	) => <b>(fx: Either<b, c>) => Type<f, a, Either<b, d>>;
} = <f extends Generic1>(applicative: Applicative<f>) => <b, c>(f: (_: b) => Type<f, c>) => <a>(
	fx: Either<a, b>,
): Type<f, Either<a, c>> =>
	isLeft(fx) ? applicative.pure(fx) : applicative.map(Right)(f(fx.rightValue));
export const sequence: {
	<f extends Generic1>(applicative: Applicative<f>): <a, b>(
		fx: Either<a, Type<f, b>>,
	) => Type<f, Either<a, b>>;
	<f extends Generic2>(applicative: Applicative2<f>): <a, b, c>(
		fx: Either<a, Type<f, b, c>>,
	) => Type<f, b, Either<a, c>>;
} = <f extends Generic1>(
	applicative: Applicative<f>,
): (<a, b>(fx: Either<a, Type<f, b>>) => Type<f, Either<a, b>>) => traverse(applicative)(identity);
// TODO: Traversable

// TODO: Bitraversable

interface GenericLeft<b> extends Generic1 {
	type: Either<this['a'], b>;
}
interface GenericBoth<f extends Generic1> extends Generic2 {
	type: Either<this['a'], Type<f, this['b']>>;
}
export const makeSemigroupEither: {
	<f extends Generic1>(semigroup: Semigroup1<f>): Semigroup2<GenericBoth<f>>;
	<m>(semigroup: Semigroup<m>): Semigroup1<GenericLeft<m>>;
} = <m>(semigroup: Semigroup<m>): Semigroup1<GenericLeft<m>> => ({
	append: lift2(applyEither)(semigroup.append),
});

export const either = <a, c>(f: (_: a) => c) => <b>(g: (_: b) => c) => (fx: Either<a, b>): c =>
	isLeft(fx) ? f(fx.leftValue) : g(fx.rightValue);

export const choose = <m extends Generic1>(alt: Alt<m>) => <a>(ma: Type<m, a>) => <b>(
	mb: Type<m, b>,
): Type<m, Either<a, b>> => alt.alt(alt.map(Left)(ma))(alt.map(Right)(mb));

export const fromLeft = <a>(fx: Left<a>): a => fx.leftValue;

export const fromRight = <b>(fx: Right<b>): b => fx.rightValue;

// TODO: note, note', hush
