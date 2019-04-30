import { Alt1, Alt2 } from '../classes/Alt';
import * as A from '../classes/Applicative';
import { Applicative2 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply2 } from '../classes/Apply';
import * as Bi from '../classes/Bifunctor';
import { Bifunctor2 } from '../classes/Bifunctor';
import * as B from '../classes/Bind';
import { Bind2 } from '../classes/Bind';
import * as E from '../classes/Eq';
import { Eq } from '../classes/Eq';
import * as Ex from '../classes/Extend';
import { Extend2 } from '../classes/Extend';
import * as F from '../classes/Functor';
import { Functor2 } from '../classes/Functor';
import * as M from '../classes/Monad';
import * as M1 from '../classes/Monoid';
import { Monoid, Monoid1, Monoid2 } from '../classes/Monoid';
import * as O from '../classes/Ord';
import { Ord } from '../classes/Ord';
import { Semigroup, Semigroup1, Semigroup2 } from '../classes/Semigroup';
import { AnyFn1, Prop1, Prop2, Type1 } from '../Types';
import { constant } from './Fn';
import { Just, Maybe, maybe, maybeL, Nothing } from './Maybe';
import { Ordering } from './Ordering';

export type Either<a, b> = Left<a> | Right<b>;

export interface Left<a> {
	isLeft: true;
	leftValue: a;
}
export const Left = <a>(leftValue: a): Left<a> => ({ isLeft: true, leftValue });

export interface Right<b> {
	isLeft: false;
	rightValue: b;
}
export const Right = <b>(rightValue: b): Right<b> => ({ isLeft: false, rightValue });

export interface PropEither extends Prop2 {
	type: Either<this['a'], this['b']>;
}
export interface PropEither1<b> extends Prop1 {
	type: Either<this['a'], b>;
}

export const map: Functor2<PropEither>['map'] = f => fa =>
	fa.isLeft ? fa : Right(f(fa.rightValue));
export const mapFlipped = F.mapFlipped<PropEither>({ map });
export const voidLeft = F.voidLeft<PropEither>({ map });
export const voidRight = F.voidRight<PropEither>({ map });
const _void = F.void<PropEither>({ map });
export { _void as void };
export const flap = F.flap<PropEither>({ map });

export const apply: Apply2<PropEither>['apply'] = ff => fa =>
	ff.isLeft ? ff : fa.isLeft ? fa : Right(ff.rightValue(fa.rightValue));
export const applyFlipped = Ap.applyFlipped<PropEither>({ apply });
export const applyFirst = Ap.applyFirst<PropEither>({ apply, map });
export const applySecond = Ap.applySecond<PropEither>({ apply, map });
export const lift2 = Ap.lift2<PropEither>({ apply, map });
export const lift3 = Ap.lift3<PropEither>({ apply, map });
export const lift4 = Ap.lift4<PropEither>({ apply, map });
export const lift5 = Ap.lift5<PropEither>({ apply, map });

export const bind: Bind2<PropEither>['bind'] = fa => f => (fa.isLeft ? fa : f(fa.rightValue));
export const bindFlipped = B.bindFlipped<PropEither>({ bind });
export const join = B.join<PropEither>({ bind });
export const composeKleisli = B.composeKleisli<PropEither>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropEither>({ bind });
export const ifM = B.ifM<PropEither>({ bind });

export const pure: Applicative2<PropEither>['pure'] = Right;
export const liftA1 = A.liftA1<PropEither>({ apply, pure });
export const when = A.when<PropEither>({ pure });
export const unless = A.unless<PropEither>({ pure });

export const liftM1 = M.liftM1<PropEither>({ bind, pure });
export const ap = M.ap<PropEither>({ bind, pure });
export const whenM = M.whenM<PropEither>({ bind, pure });
export const unlessM = M.unlessM<PropEither>({ bind, pure });

export const eq2: <a>(Ea: Eq<a>) => <b>(Eb: Eq<b>) => Eq<Either<a, b>>['eq'] = ({ eq: eqA }) => ({
	eq: eqB,
}) => fx => fy =>
	fx.isLeft
		? fy.isLeft && eqA(fx.leftValue)(fy.leftValue)
		: !fy.isLeft && eqB(fx.rightValue)(fy.rightValue);
export const notEq2 = <a>(Ea: Eq<a>) => <b>(Eb: Eq<b>) => E.notEq({ eq: eq2(Ea)(Eb) });

export const compare2: <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) => Ord<Either<a, b>>['compare'] = ({
	compare: cA,
}) => ({ compare: cB }) => fx => fy =>
	fx.isLeft
		? fy.isLeft
			? cA(fx.leftValue)(fy.leftValue)
			: Ordering.LT
		: fy.isLeft
		? Ordering.GT
		: cB(fx.rightValue)(fy.rightValue);

export const lte2 = <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) =>
	O.lte<Either<a, b>>({ compare: compare2(Oa)(Ob) });
export const gt2 = <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) =>
	O.gt<Either<a, b>>({ compare: compare2(Oa)(Ob) });
export const lt2 = <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) =>
	O.lt<Either<a, b>>({ compare: compare2(Oa)(Ob) });
export const gte2 = <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) =>
	O.gte<Either<a, b>>({ compare: compare2(Oa)(Ob) });
export const comparing2 = <b>(Ob: Ord<b>) => <c>(Oc: Ord<c>) =>
	O.comparing<Either<b, c>>({ compare: compare2(Ob)(Oc) });
export const min2 = <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) =>
	O.min<Either<a, b>>({ compare: compare2(Oa)(Ob) });
export const max2 = <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) =>
	O.max<Either<a, b>>({ compare: compare2(Oa)(Ob) });
export const clamp2 = <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) =>
	O.clamp<Either<a, b>>({ compare: compare2(Oa)(Ob) });
export const between2 = <a>(Oa: Ord<a>) => <b>(Ob: Ord<b>) =>
	O.between<Either<a, b>>({ compare: compare2(Oa)(Ob) });

interface PropDerivedEither<f extends Prop1> extends Prop2 {
	type: Either<this['a'], Type1<f, this['b']>>;
}
export const append1: {
	<f extends Prop1>(S: Semigroup1<f>): Semigroup2<PropDerivedEither<f>>['append'];
	<b>(S: Semigroup<b>): Semigroup1<PropEither1<b>>['append'];
} = (({ append }) => lift2(append)) as AnyFn1;

export const mempty1: {
	<f extends Prop1>(S: Pick<Monoid1<f>, 'mempty'>): Monoid2<PropDerivedEither<f>>['mempty'];
	<b>(S: Pick<Monoid<b>, 'mempty'>): Monoid1<PropEither1<b>>['mempty'];
} = (({ mempty }) => () => Right(mempty())) as AnyFn1;
export const power1: {
	<f extends Prop1>(M: Monoid1<f>): <a, b>(
		x: Either<a, Type1<f, b>>,
	) => (p: number) => Either<a, Type1<f, b>>;
	<b>(M: Monoid<b>): <a>(x: Either<a, b>) => (p: number) => Either<a, b>;
} = (M => M1.power({ append: append1(M), mempty: mempty1(M) })) as AnyFn1;
export const guard1: {
	<f extends Prop1>(M: Pick<Monoid1<f>, 'mempty'>): (
		p: boolean,
	) => <a, b>(x: Either<a, Type1<f, b>>) => Either<a, Type1<f, b>>;
	<b>(M: Pick<Monoid<b>, 'mempty'>): (p: boolean) => <a>(x: Either<a, b>) => Either<a, b>;
} = (({ mempty }) => M1.guard({ mempty: mempty1({ mempty }) })) as AnyFn1;

export const alt: Alt2<PropEither>['alt'] = ex => ey => (ex.isLeft ? ey : ex);

export const extend: Extend2<PropEither>['extend'] = f => ex => (ex.isLeft ? ex : Right(f(ex)));
export const extendFlipped = Ex.extendFlipped<PropEither>({ extend });
export const composeCoKleisli = Ex.composeCoKleisli<PropEither>({ extend });
export const composeCoKleisliFlipped = Ex.composeCoKleisliFlipped<PropEither>({ extend });
export const duplicate = Ex.duplicate<PropEither>({ extend });

export const bimap: Bifunctor2<PropEither>['bimap'] = f => g => fx =>
	fx.isLeft ? Left(f(fx.leftValue)) : Right(g(fx.rightValue));
export const lmap = Bi.lmap<PropEither>({ bimap });
export const rmap = map;

export const either: <a, c>(
	f: (_: a) => c,
) => <b>(g: (_: b) => c) => (fx: Either<a, b>) => c = f => g => fx =>
	fx.isLeft ? f(fx.leftValue) : g(fx.rightValue);

export const choose1: <m extends Prop1>(
	A: Alt1<m>,
) => <a>(ma: Type1<m, a>) => <b>(mb: Type1<m, b>) => Type1<m, Either<a, b>> = ({
	alt,
	map,
}) => a => b => alt(map(Left)(a))(map(Right)(b));

export const isLeft = <a, b>(fx: Either<a, b>): fx is Left<a> => fx.isLeft;

export const isRight = <a, b>(fx: Either<a, b>): fx is Right<b> => !fx.isLeft;

export const fromLeft: <a>(fx: Left<a>) => a = fx => fx.leftValue;

export const fromRight: <b>(fx: Right<b>) => b = fx => fx.rightValue;

export const note: <a>(x: a) => <b>(my: Maybe<b>) => Either<a, b> = x =>
	maybe<Either<any, any>>(Left(x))(Right);

export const noteL: <a>(x: () => a) => <b>(my: Maybe<b>) => Either<a, b> = f =>
	maybeL<Either<any, any>>(() => Left(f()))(Right);

export const hush: <a, b>(fx: Either<a, b>) => Maybe<b> = either(constant(Nothing as Maybe<any>))(
	Just,
);
