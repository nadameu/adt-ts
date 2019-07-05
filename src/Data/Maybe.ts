import { Alt } from '../Control/Alt';
import { Alternative } from '../Control/Alternative';
import { Applicative } from '../Control/Applicative';
import { Apply, lift2 } from '../Control/Apply';
import { Bind } from '../Control/Bind';
import { Extend } from '../Control/Extend';
import { Monad } from '../Control/Monad';
import { MonadZero } from '../Control/MonadZero';
import { Plus } from '../Control/Plus';
import { Generic1, Generic2, Type } from '../Generic';
import { Bounded } from './Bounded';
import { Eq } from './Eq';
import { identity, flip } from './Function';
import { Functor } from './Functor';
import { Monoid, Monoid1 } from './Monoid';
import { Ord } from './Ord';
import { EQ, GT, LT } from './Ordering';
import { Semigroup, Semigroup1, Semigroup2 } from './Semigroup';
import { Show } from './Show';

const MaybeSymbol = Symbol();
export type Maybe<a> = Nothing | Just<a>;
export interface GenericMaybe extends Generic1 {
	type: Maybe<this['a']>;
}

export interface Nothing {
	[MaybeSymbol]: 'Nothing';
}
export const Nothing: Nothing = { [MaybeSymbol]: 'Nothing' };
export const isNothing = <a>(ma: Maybe<a>): ma is Nothing => ma[MaybeSymbol] === 'Nothing';

export interface Just<a> {
	[MaybeSymbol]: 'Just';
	value: a;
}
export const Just = <a>(value: a): Just<a> => ({ [MaybeSymbol]: 'Just', value });
export const isJust = <a>(ma: Maybe<a>): ma is Just<a> => ma[MaybeSymbol] === 'Just';
export const fromJust = <a>(ma: Just<a>): a => ma.value;

export const maybe = <b>(b: b) => <a>(f: (_: a) => b) => (ma: Maybe<a>): b =>
	isNothing(ma) ? b : f(fromJust(ma));

const bindFlipped: <a, b>(
	f: (_: a) => Maybe<b>,
) => (ma: Maybe<a>) => Maybe<b> = /*@__PURE__*/ maybe(Nothing as Maybe<any>);

export const map = <a, b>(f: (_: a) => b): ((fa: Maybe<a>) => Maybe<b>) =>
	/*@__PURE__*/ bindFlipped(x => Just(f(x)));
export const functorMaybe: Functor<GenericMaybe> = { map };

export const apply = <a, b>(mf: Maybe<(_: a) => b>) => (ma: Maybe<a>): Maybe<b> =>
	bind(mf)(f => map(f)(ma));
export const applyMaybe: Apply<GenericMaybe> = { ...functorMaybe, apply };

export const pure: <a>(x: a) => Maybe<a> = Just;
export const applicativeMaybe: Applicative<GenericMaybe> = { ...applyMaybe, pure };

export const alt = <a>(mx: Maybe<a>) => (my: Maybe<a>): Maybe<a> => (isJust(mx) ? mx : my);
export const altMaybe: Alt<GenericMaybe> = { ...functorMaybe, alt };

export const empty = <a = never>(): Maybe<a> => Nothing;
export const plusMaybe: Plus<GenericMaybe> = { ...altMaybe, empty };

export const alternativeMaybe: Alternative<GenericMaybe> = { ...applicativeMaybe, ...plusMaybe };

export const bind: <a>(ma: Maybe<a>) => <b>(f: (_: a) => Maybe<b>) => Maybe<b> = /*@__PURE__*/ flip<
	any,
	any,
	any
>(bindFlipped);
export const bindMaybe: Bind<GenericMaybe> = { ...applyMaybe, bind };

export const monadMaybe: Monad<GenericMaybe> = { ...applicativeMaybe, ...bindMaybe };

export const monadZeroMaybe: MonadZero<GenericMaybe> = { ...monadMaybe, ...plusMaybe };

export const extend = <a, b>(f: (_: Maybe<a>) => b) => (ma: Maybe<a>): Maybe<b> =>
	map(_ => f(ma))(ma);
export const extendMaybe: Extend<GenericMaybe> = { ...functorMaybe, extend };

interface HigherKindedMaybe<f extends Generic1> extends Generic1 {
	type: Maybe<Type<f, this['a']>>;
}
interface HigherKindedMaybe2<f extends Generic2> extends Generic2 {
	type: Maybe<Type<f, this['a'], this['b']>>;
}

export const makeSemigroupMaybe: {
	<m extends Generic1>(semigroup: Semigroup1<m>): Semigroup1<HigherKindedMaybe<m>>;
	<m extends Generic2>(semigroup: Semigroup2<m>): Semigroup2<HigherKindedMaybe2<m>>;
	<m>(semigroup: Semigroup<m>): Semigroup<Maybe<m>>;
} = <m>(semigroup: Semigroup<m>): Semigroup<Maybe<m>> => ({
	append: lift2(applyMaybe)(semigroup.append),
});

export const makeMonoidMaybe: {
	<m extends Generic1>(semigroup: Semigroup1<m>): Monoid1<HigherKindedMaybe<m>>;
	<m>(semigroup: Semigroup<m>): Monoid<Maybe<m>>;
} = <m>(semigroup: Semigroup<m>): Monoid<Maybe<m>> => ({
	...makeSemigroupMaybe(semigroup),
	mempty: () => Nothing,
});

export const makeEqMaybe = <a>(eqA: Eq<a>): Eq<Maybe<a>> => ({
	eq: mx => my =>
		isNothing(mx) ? isNothing(my) : isJust(my) && eqA.eq(fromJust(mx))(fromJust(my)),
});
export const makeOrdMaybe = <a>(ordA: Ord<a>): Ord<Maybe<a>> => ({
	...makeEqMaybe(ordA),
	compare: mx => my =>
		isJust(mx)
			? isJust(my)
				? ordA.compare(fromJust(mx))(fromJust(my))
				: GT
			: isJust(my)
			? LT
			: EQ,
});
export const makeBoundedMaybe = <a>(bounded: Bounded<a>): Bounded<Maybe<a>> => ({
	...makeOrdMaybe(bounded),
	top: Just(bounded.top),
	bottom: Nothing,
});
export const makeShowMaybe = <a>(show: Show<a>): Show<Maybe<a>> => ({
	show: ma => (isJust(ma) ? `(Just ${show.show(fromJust(ma))})` : `Nothing`),
});

export const maybeL = <b>(b: () => b) => <a>(f: (_: a) => b) => (ma: Maybe<a>): b =>
	isNothing(ma) ? b() : f(fromJust(ma));

export const fromMaybe = <a>(a: a): ((ma: Maybe<a>) => a) => /*@__PURE__*/ maybe(a)(identity);

export const fromMaybeL = <a>(a: () => a): ((ma: Maybe<a>) => a) =>
	/*@__PURE__*/ maybeL(a)(identity);

export const optional = <f extends Generic1>(alternative: Alternative<f>) => <a>(
	fa: Type<f, a>,
): Type<f, Maybe<a>> => alternative.alt(alternative.map(Just)(fa))(alternative.pure(Nothing));
