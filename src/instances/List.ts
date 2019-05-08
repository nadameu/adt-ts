import * as A from '../classes/Applicative';
import { Applicative1 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply1 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind1 } from '../classes/Bind';
import * as E from '../classes/Eq';
import { Eq1 } from '../classes/Eq';
import * as Fo from '../classes/Foldable';
import { Foldable1 } from '../classes/Foldable';
import * as F from '../classes/Functor';
import { Functor1 } from '../classes/Functor';
import * as M from '../classes/Monad';
import * as M1 from '../classes/Monoid';
import { Monoid1 } from '../classes/Monoid';
import * as O from '../classes/Ord';
import { Ord, Ord1 } from '../classes/Ord';
import { Semigroup1 } from '../classes/Semigroup';
import * as T from '../classes/Traversable';
import { Traversable1 } from '../classes/Traversable';
import { Prop1, Type1 } from '../Types';
import { flip, thrush } from './Fn';
import { Ordering } from './Ordering';

export type List<a> = Cons<a> | Nil;

export interface Cons<a> {
	isNil: false;
	head: a;
	tail: List<a>;
}
export const Cons = <a>(head: a) => (tail: List<a>): List<a> => ({ isNil: false, head, tail });

export interface Nil {
	isNil: true;
}
export const Nil: List<never> = { isNil: true };

export interface PropList extends Prop1 {
	type: List<this['a']>;
}

export const eq1: Eq1<PropList>['eq1'] = ({ eq }) => xs => ys => {
	let acc = true;
	let x = xs;
	let y = ys;
	while (acc && !x.isNil && !y.isNil) {
		acc = acc && eq(x.head)(y.head);
		x = x.tail;
		y = y.tail;
	}
	return acc;
};
export const notEq1 = E.notEq1<PropList>({ eq1 });

export const compare1: Ord1<PropList>['compare1'] = ({ compare }) => xs => ys => {
	let x = xs;
	let y = ys;
	while (!x.isNil && !y.isNil) {
		const result = compare(x.head)(y.head);
		if (result !== Ordering.EQ) return result;
		x = x.tail;
		y = y.tail;
	}
	if (x.isNil && y.isNil) return Ordering.EQ;
	if (x.isNil) return Ordering.LT;
	return Ordering.GT;
};
export const lte1 = <a>(Oa: Ord<a>) => O.lte<List<a>>({ compare: compare1(Oa) });
export const gt1 = <a>(Oa: Ord<a>) => O.gt<List<a>>({ compare: compare1(Oa) });
export const lt1 = <a>(Oa: Ord<a>) => O.lt<List<a>>({ compare: compare1(Oa) });
export const gte1 = <a>(Oa: Ord<a>) => O.gte<List<a>>({ compare: compare1(Oa) });
export const comparing1 = <b>(Ob: Ord<b>) => O.comparing<List<b>>({ compare: compare1(Ob) });
export const min1 = <a>(Oa: Ord<a>) => O.min<List<a>>({ compare: compare1(Oa) });
export const max1 = <a>(Oa: Ord<a>) => O.max<List<a>>({ compare: compare1(Oa) });
export const clamp1 = <a>(Oa: Ord<a>) => O.clamp<List<a>>({ compare: compare1(Oa) });
export const between1 = <a>(Oa: Ord<a>) => O.between<List<a>>({ compare: compare1(Oa) });

export const append: Semigroup1<PropList>['append'] = xs => ys => foldr(Cons)(ys)(xs);

export const mempty: Monoid1<PropList>['mempty'] = () => Nil;
export const power = M1.power<PropList>({ append, mempty });
export const guard = M1.guard<PropList>({ mempty });

export const map: Functor1<PropList>['map'] = f => foldr<any, List<any>>(x => Cons(f(x)))(Nil);
export const mapFlipped = F.mapFlipped<PropList>({ map });
export const voidLeft = F.voidLeft<PropList>({ map });
export const voidRight = F.voidRight<PropList>({ map });
const _void = F.void<PropList>({ map });
export { _void as void };
export { _for as for };
export const flap = F.flap<PropList>({ map });

export const apply: Apply1<PropList>['apply'] = fs => xs => bind(fs)(f => map(f)(xs));
export const applyFlipped = Ap.applyFlipped<PropList>({ apply });
export const applyFirst = Ap.applyFirst<PropList>({ apply, map });
export const applySecond = Ap.applySecond<PropList>({ apply, map });
export const lift2 = Ap.lift2<PropList>({ apply, map });
export const lift3 = Ap.lift3<PropList>({ apply, map });
export const lift4 = Ap.lift4<PropList>({ apply, map });
export const lift5 = Ap.lift5<PropList>({ apply, map });

export const bind: Bind1<PropList>['bind'] = xs => f =>
	foldr<any, List<any>>(x => append(f(x)))(Nil)(xs);
export const bindFlipped = B.bindFlipped<PropList>({ bind });
export const join = B.join<PropList>({ bind });
export const composeKleisli = B.composeKleisli<PropList>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropList>({ bind });
export const ifM = B.ifM<PropList>({ bind });

export const pure: Applicative1<PropList>['pure'] = x => Cons(x)(Nil);
export const liftA1 = A.liftA1<PropList>({ apply, pure });
export const when = A.when<PropList>({ pure });
export const unless = A.unless<PropList>({ pure });

export const liftM1 = M.liftM1<PropList>({ bind, pure });
export const ap = M.ap<PropList>({ bind, pure });
export const whenM = M.whenM<PropList>({ bind, pure });
export const unlessM = M.unlessM<PropList>({ bind, pure });

export const foldr: Foldable1<PropList>['foldr'] = f => b => xs =>
	foldl(flip(f))(b)(foldl<any, List<any>>(flip(Cons))(Nil)(xs));
export const foldl: Foldable1<PropList>['foldl'] = f => b => xs => {
	let current = xs;
	let acc = b;
	while (!current.isNil) {
		acc = f(acc)(current.head);
		current = current.tail;
	}
	return acc;
};
export const foldMap = Fo.foldMapDefaultR<PropList>({ foldr });
export const fold = Fo.fold<PropList>({ foldMap });
export const foldM = Fo.foldM<PropList>({ foldl });

export const traverse: Traversable1<PropList>['traverse'] = <m extends Prop1>(
	A: Applicative1<m>,
) => <a, b>(f: (_: a) => Type1<m, b>): ((xs: List<a>) => Type1<m, List<b>>) => {
	const a = Ap.lift2(A)(Cons);
	return thrush(A.pure(Nil))(foldr(x => a(f(x))));
};
export const sequence = T.sequenceDefault<PropList>({ traverse });
const _for = T.for<PropList>({ traverse });
