import * as A from '../classes/Applicative';
import { Applicative } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply2 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind2 } from '../classes/Bind';
import * as E from '../classes/Eq';
import { Eq1 } from '../classes/Eq';
import * as F from '../classes/Functor';
import { Functor2 } from '../classes/Functor';
import * as M from '../classes/Monad';
import { Ord1 } from '../classes/Ord';
import { Prop2 } from '../Types';
import { Ordering } from './Ordering';

export type Either<a, b> = Left<a, b> | Right<b, a>;

export interface Left<a, b = never> {
	isLeft: true;
	leftValue: a;
}
export const Left = <a, b = never>(leftValue: a): Left<a, b> => ({ isLeft: true, leftValue });

export interface Right<b, a = never> {
	isLeft: false;
	rightValue: b;
}
export const Right = <b, a = never>(rightValue: b): Right<b, a> => ({ isLeft: false, rightValue });

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

export const pure: Applicative<PropEither>['pure'] = x => [x];
export const liftA1 = A.liftA1<PropEither>({ apply, pure });
export const when = A.when<PropEither>({ pure });
export const unless = A.unless<PropEither>({ pure });

export const liftM1 = M.liftM1<PropEither>({ bind, pure });
export const ap = M.ap<PropEither>({ bind, pure });
export const whenM = M.whenM<PropEither>({ bind, pure });
export const unlessM = M.unlessM<PropEither>({ bind, pure });

export const eq1: Eq1<PropEither>['eq1'] = ({ eq }) => xs => ys =>
	xs.length !== ys.length ? false : xs.every((x, i) => eq(x)(ys[i]));
export const notEq1 = E.notEq1<PropEither>({ eq1 });

export const compare1: Ord1<PropEither>['compare1'] = ({ compare }) => xs => ys => {
	const minlen = Math.min(xs.length, ys.length);
	for (let i = 0; i < minlen; i++) {
		const x = xs[i];
		const y = ys[i];
		const result = compare(x)(y);
		if (result !== Ordering.EQ) return result;
	}
	if (xs.length === ys.length) return Ordering.EQ;
	if (xs.length > ys.length) return Ordering.GT;
	return Ordering.LT;
};
