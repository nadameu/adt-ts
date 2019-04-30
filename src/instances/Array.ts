import { Alt1 } from '../classes/Alt';
import * as A from '../classes/Applicative';
import { Applicative1 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply1 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind1 } from '../classes/Bind';
import * as E from '../classes/Eq';
import { Eq1 } from '../classes/Eq';
import * as Ex from '../classes/Extend';
import { Extend1 } from '../classes/Extend';
import * as F from '../classes/Functor';
import { Functor1 } from '../classes/Functor';
import * as M from '../classes/Monad';
import * as Z from '../classes/MonadZero';
import * as M1 from '../classes/Monoid';
import { Monoid1 } from '../classes/Monoid';
import * as O from '../classes/Ord';
import { Ord, Ord1 } from '../classes/Ord';
import { Plus1 } from '../classes/Plus';
import { Semigroup1 } from '../classes/Semigroup';
import * as Num from '../instances/Number';
import { Prop1 } from '../Types';
import { Ordering } from './Ordering';

export interface PropArray extends Prop1 {
	type: this['a'][];
}

export const map: Functor1<PropArray>['map'] = f => xs => xs.map(x => f(x));
export const mapFlipped = F.mapFlipped<PropArray>({ map });
export const voidLeft = F.voidLeft<PropArray>({ map });
export const voidRight = F.voidRight<PropArray>({ map });
const _void = F.void<PropArray>({ map });
export { _void as void };
export const flap = F.flap<PropArray>({ map });

export const apply: Apply1<PropArray>['apply'] = fs => xs => {
	const result = [];
	for (const f of fs) {
		for (const x of xs) {
			result.push(f(x));
		}
	}
	return result;
};
export const applyFlipped = Ap.applyFlipped<PropArray>({ apply });
export const applyFirst = Ap.applyFirst<PropArray>({ apply, map });
export const applySecond = Ap.applySecond<PropArray>({ apply, map });
export const lift2 = Ap.lift2<PropArray>({ apply, map });
export const lift3 = Ap.lift3<PropArray>({ apply, map });
export const lift4 = Ap.lift4<PropArray>({ apply, map });
export const lift5 = Ap.lift5<PropArray>({ apply, map });

export const bind: Bind1<PropArray>['bind'] = xs => f =>
	xs.reduce((acc, x) => (Array.prototype.push.apply(acc, f(x)), acc), [] as any[]);
export const bindFlipped = B.bindFlipped<PropArray>({ bind });
export const join = B.join<PropArray>({ bind });
export const composeKleisli = B.composeKleisli<PropArray>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropArray>({ bind });
export const ifM = B.ifM<PropArray>({ bind });

export const pure: Applicative1<PropArray>['pure'] = x => [x];
export const liftA1 = A.liftA1<PropArray>({ apply, pure });
export const when = A.when<PropArray>({ pure });
export const unless = A.unless<PropArray>({ pure });

export const liftM1 = M.liftM1<PropArray>({ bind, pure });
export const ap = M.ap<PropArray>({ bind, pure });
export const whenM = M.whenM<PropArray>({ bind, pure });
export const unlessM = M.unlessM<PropArray>({ bind, pure });

export const eq1: Eq1<PropArray>['eq1'] = ({ eq }) => xs => ys =>
	xs.length !== ys.length ? false : xs.every((x, i) => eq(x)(ys[i]));
export const notEq1 = E.notEq1<PropArray>({ eq1 });

export const compare1: Ord1<PropArray>['compare1'] = ({ compare }) => xs => ys => {
	const minlen = Math.min(xs.length, ys.length);
	for (let i = 0; i < minlen; i++) {
		const result = compare(xs[i])(ys[i]);
		if (result !== Ordering.EQ) return result;
	}
	return Num.compare(xs.length)(ys.length);
};
export const lte1 = <a>(Oa: Ord<a>) => O.lte<a[]>({ compare: compare1(Oa) });
export const gt1 = <a>(Oa: Ord<a>) => O.gt<a[]>({ compare: compare1(Oa) });
export const lt1 = <a>(Oa: Ord<a>) => O.lt<a[]>({ compare: compare1(Oa) });
export const gte1 = <a>(Oa: Ord<a>) => O.gte<a[]>({ compare: compare1(Oa) });
export const comparing1 = <b>(Ob: Ord<b>) => O.comparing<b[]>({ compare: compare1(Ob) });
export const min1 = <a>(Oa: Ord<a>) => O.min<a[]>({ compare: compare1(Oa) });
export const max1 = <a>(Oa: Ord<a>) => O.max<a[]>({ compare: compare1(Oa) });
export const clamp1 = <a>(Oa: Ord<a>) => O.clamp<a[]>({ compare: compare1(Oa) });
export const between1 = <a>(Oa: Ord<a>) => O.between<a[]>({ compare: compare1(Oa) });

export const append: Semigroup1<PropArray>['append'] = xs => ys => xs.concat(ys);

export const mempty: Monoid1<PropArray>['mempty'] = () => [];
export const power = M1.power<PropArray>({ append, mempty });

export const alt: Alt1<PropArray>['alt'] = append;

export const empty: Plus1<PropArray>['empty'] = mempty;

export const guard = Z.guard<PropArray>({ empty, pure });

export const extend: Extend1<PropArray>['extend'] = f => xs => xs.map((_, i) => f(xs.slice(i)));
export const extendFlipped = Ex.extendFlipped<PropArray>({ extend });
export const composeCoKleisli = Ex.composeCoKleisli<PropArray>({ extend });
export const composeCoKleisliFlipped = Ex.composeCoKleisliFlipped<PropArray>({ extend });
export const duplicate = Ex.duplicate<PropArray>({ extend });
