import * as A from '../classes/Applicative';
import { Applicative1 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply1 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind1 } from '../classes/Bind';
import * as E from '../classes/Eq';
import { Eq1 } from '../classes/Eq';
import * as F from '../classes/Functor';
import { Functor1 } from '../classes/Functor';
import * as M from '../classes/Monad';
import { Monoid1 } from '../classes/Monoid';
import * as O from '../classes/Ord';
import { Ord, Ord1 } from '../classes/Ord';
import { Semigroup, Semigroup1 } from '../classes/Semigroup';
import { AnyFn3, Prop1, Type1 } from '../Types';
import { identity } from './Fn';
import { Ordering } from './Ordering';

export type Maybe<a> = Just<a> | Nothing;

export interface Just<a> {
	isNothing: false;
	value: a;
}
export const Just: <a>(value: a) => Just<a> = value => ({
	isNothing: false,
	value,
});

export interface Nothing {
	isNothing: true;
}
export const Nothing: Nothing = { isNothing: true };

export interface PropMaybe extends Prop1 {
	type: Maybe<this['a']>;
}

export const bind: Bind1<PropMaybe>['bind'] = mx => f => (mx.isNothing ? mx : f(mx.value));
export const pure: Applicative1<PropMaybe>['pure'] = Just;

export const map: Functor1<PropMaybe>['map'] = M.liftM1({ bind, pure });
export const mapFlipped = F.mapFlipped<PropMaybe>({ map });
export const voidLeft = F.voidLeft<PropMaybe>({ map });
export const voidRight = F.voidRight<PropMaybe>({ map });
const _void = F.void<PropMaybe>({ map });
export { _void as void };
export const flap = F.flap<PropMaybe>({ map });

export const apply: Apply1<PropMaybe>['apply'] = M.ap({ bind, pure });
export const applyFlipped = Ap.applyFlipped<PropMaybe>({ apply });
export const applyFirst = Ap.applyFirst<PropMaybe>({ apply, map });
export const applySecond = Ap.applySecond<PropMaybe>({ apply, map });
export const lift2 = Ap.lift2<PropMaybe>({ apply, map });
export const lift3 = Ap.lift3<PropMaybe>({ apply, map });
export const lift4 = Ap.lift4<PropMaybe>({ apply, map });
export const lift5 = Ap.lift5<PropMaybe>({ apply, map });

export const bindFlipped = B.bindFlipped<PropMaybe>({ bind });
export const join = B.join<PropMaybe>({ bind });
export const composeKleisli = B.composeKleisli<PropMaybe>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropMaybe>({ bind });
export const ifM = B.ifM<PropMaybe>({ bind });

export const liftA1 = A.liftA1<PropMaybe>({ apply, pure });
export const when = A.when<PropMaybe>({ pure });
export const unless = A.unless<PropMaybe>({ pure });

export const liftM1 = M.liftM1<PropMaybe>({ bind, pure });
export const ap = M.ap<PropMaybe>({ bind, pure });
export const whenM = M.whenM<PropMaybe>({ bind, pure });
export const unlessM = M.unlessM<PropMaybe>({ bind, pure });

export const eq1: Eq1<PropMaybe>['eq1'] = ({ eq }) => mx => my =>
	mx.isNothing ? my.isNothing : my.isNothing ? false : eq(mx.value)(my.value);
export const notEq1 = E.notEq1<PropMaybe>({ eq1 });

export const compare1: Ord1<PropMaybe>['compare1'] = ({ compare }) => mx => my =>
	mx.isNothing && my.isNothing
		? Ordering.EQ
		: mx.isNothing
		? Ordering.LT
		: my.isNothing
		? Ordering.GT
		: compare(mx.value)(my.value);
export const lte1 = <a>(Oa: Ord<a>) => O.lte<Maybe<a>>({ compare: compare1(Oa) });
export const gt1 = <a>(Oa: Ord<a>) => O.gt<Maybe<a>>({ compare: compare1(Oa) });
export const lt1 = <a>(Oa: Ord<a>) => O.lt<Maybe<a>>({ compare: compare1(Oa) });
export const gte1 = <a>(Oa: Ord<a>) => O.gte<Maybe<a>>({ compare: compare1(Oa) });
export const comparing1 = <b>(Ob: Ord<b>) => O.comparing<Maybe<b>>({ compare: compare1(Ob) });
export const min1 = <a>(Oa: Ord<a>) => O.min<Maybe<a>>({ compare: compare1(Oa) });
export const max1 = <a>(Oa: Ord<a>) => O.max<Maybe<a>>({ compare: compare1(Oa) });
export const clamp1 = <a>(Oa: Ord<a>) => O.clamp<Maybe<a>>({ compare: compare1(Oa) });
export const between1 = <a>(Oa: Ord<a>) => O.between<Maybe<a>>({ compare: compare1(Oa) });

interface PropDerivedMaybe<f extends Prop1> extends Prop1 {
	type: Maybe<Type1<f, this['a']>>;
}

export const append1: {
	<f extends Prop1>(S: Semigroup1<f>): Semigroup1<PropDerivedMaybe<f>>['append'];
	<a>(S: Semigroup<a>): Semigroup<Maybe<a>>['append'];
} = (({ append }) => mx => my =>
	mx.isNothing ? my : my.isNothing ? mx : Just(append(mx.value)(my.value))) as AnyFn3;

export const mempty: Monoid1<PropMaybe>['mempty'] = () => Nothing;

export const maybe: <b>(x: b) => <a>(f: (_: a) => b) => (mx: Maybe<a>) => b = x => f => mx =>
	mx.isNothing ? x : f(mx.value);

export const maybeL: <b>(
	lazy: () => b,
) => <a>(f: (_: a) => b) => (mx: Maybe<a>) => b = lazy => f => mx =>
	mx.isNothing ? lazy() : f(mx.value);

export const fromMaybe: <a>(x: a) => (mx: Maybe<a>) => a = x => maybe(x)(identity);

export const fromMaybeL: <a>(lazy: () => a) => (mx: Maybe<a>) => a = lazy => maybeL(lazy)(identity);

export const isJust = <a>(mx: Maybe<a>): mx is Just<a> => !mx.isNothing;

export const isNothing = <a>(mx: Maybe<a>): mx is Nothing => !mx.isNothing;
