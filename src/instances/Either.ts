import * as A from '../classes/Applicative';
import { Applicative2 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply2 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind2 } from '../classes/Bind';
import * as E from '../classes/Eq';
import { Eq } from '../classes/Eq';
import * as F from '../classes/Functor';
import { Functor2 } from '../classes/Functor';
import * as M from '../classes/Monad';
import * as O from '../classes/Ord';
import { Ord } from '../classes/Ord';
import { Prop2 } from '../Types';
import { Ordering } from './Ordering';
import { Semigroup } from '../classes/Semigroup';

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

interface PropEither extends Prop2 {
	type: Either<this['a'], this['b']>;
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

export const append2: <a>(
	Sa: Semigroup<a>,
) => <b>(Sb: Semigroup<b>) => Semigroup<Either<a, b>>['append'] = ({ append: appendA }) => ({
	append: appendB,
}) => fx => fy =>
	fx.isLeft
		? fy.isLeft
			? Left(appendA(fx.leftValue)(fy.leftValue))
			: fx
		: fy.isLeft
		? fy
		: Right(appendB(fx.rightValue)(fy.rightValue));
