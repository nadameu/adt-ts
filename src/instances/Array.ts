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
import { Monad1 } from '../classes/Monad';
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
export const functorArray: Functor1<PropArray> = { map };
export const mapFlipped = F.mapFlipped(functorArray);
export const voidLeft = F.voidLeft(functorArray);
export const voidRight = F.voidRight(functorArray);
const _void = F.void(functorArray);
export { _void as void };
export const flap = F.flap(functorArray);

export const apply: Apply1<PropArray>['apply'] = fs => xs => {
	const result = [];
	for (const f of fs) {
		for (const x of xs) {
			result.push(f(x));
		}
	}
	return result;
};
export const applyArray: Apply1<PropArray> = { apply, map };
export const applyFlipped = Ap.applyFlipped(applyArray);
export const applyFirst = Ap.applyFirst(applyArray);
export const applySecond = Ap.applySecond(applyArray);
export const lift2 = Ap.lift2(applyArray);
export const lift3 = Ap.lift3(applyArray);
export const lift4 = Ap.lift4(applyArray);
export const lift5 = Ap.lift5(applyArray);

export const bind: Bind1<PropArray>['bind'] = xs => f =>
	xs.reduce((acc, x) => (Array.prototype.push.apply(acc, f(x)), acc), [] as any[]);
export const bindArray: Bind1<PropArray> = { apply, bind, map };
export const bindFlipped = B.bindFlipped(bindArray);
export const join = B.join(bindArray);
export const composeKleisli = B.composeKleisli(bindArray);
export const composeKleisliFlipped = B.composeKleisliFlipped(bindArray);
export const ifM = B.ifM(bindArray);

export const pure: Applicative1<PropArray>['pure'] = x => [x];
export const applicativeArray: Applicative1<PropArray> = { apply, map, pure };
export const liftA1 = A.liftA1(applicativeArray);
export const when = A.when(applicativeArray);
export const unless = A.unless(applicativeArray);

export const monadArray: Monad1<PropArray> = { apply, bind, map, pure };
export const liftM1 = M.liftM1(monadArray);
export const ap = M.ap(monadArray);
export const whenM = M.whenM(monadArray);
export const unlessM = M.unlessM(monadArray);

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
export const ordArray: Ord1<PropArray> = { compare1, eq1 };
export const lte1 = <a>(Oa: Ord<a>) => O.lte<a[]>({ eq: eq1(Oa), compare: compare1(Oa) });
export const gt1 = <a>(Oa: Ord<a>) => O.gt<a[]>({ eq: eq1(Oa), compare: compare1(Oa) });
export const lt1 = <a>(Oa: Ord<a>) => O.lt<a[]>({ eq: eq1(Oa), compare: compare1(Oa) });
export const gte1 = <a>(Oa: Ord<a>) => O.gte<a[]>({ eq: eq1(Oa), compare: compare1(Oa) });
export const comparing1 = <b>(Ob: Ord<b>) =>
	O.comparing<b[]>({ eq: eq1(Ob), compare: compare1(Ob) });
export const min1 = <a>(Oa: Ord<a>) => O.min<a[]>({ eq: eq1(Oa), compare: compare1(Oa) });
export const max1 = <a>(Oa: Ord<a>) => O.max<a[]>({ eq: eq1(Oa), compare: compare1(Oa) });
export const clamp1 = <a>(Oa: Ord<a>) => O.clamp<a[]>({ eq: eq1(Oa), compare: compare1(Oa) });
export const between1 = <a>(Oa: Ord<a>) => O.between<a[]>({ eq: eq1(Oa), compare: compare1(Oa) });

export const append: Semigroup1<PropArray>['append'] = xs => ys => xs.concat(ys);

export const mempty: Monoid1<PropArray>['mempty'] = () => [];
export const power = M1.power<PropArray>({ append, mempty });

export const alt: Alt1<PropArray>['alt'] = append;

export const empty: Plus1<PropArray>['empty'] = mempty;

export const guard = Z.guard<PropArray>({ empty, pure });

export const extend: Extend1<PropArray>['extend'] = f => xs => xs.map((_, i) => f(xs.slice(i)));
export const extendArray: Extend1<PropArray> = { map, extend };
export const extendFlipped = Ex.extendFlipped(extendArray);
export const composeCoKleisli = Ex.composeCoKleisli(extendArray);
export const composeCoKleisliFlipped = Ex.composeCoKleisliFlipped(extendArray);
export const duplicate = Ex.duplicate(extendArray);
