import * as Aa from '../classes/Applicative';
import { Applicative } from '../classes/Applicative';
import * as A from '../classes/Apply';
import { Apply } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind } from '../classes/Bind';
import * as E from '../classes/Eq';
import { Eq1 } from '../classes/Eq';
import * as F from '../classes/Functor';
import { Functor1 } from '../classes/Functor';
import * as M from '../classes/Monad';
import { Prop1 } from '../Types';
import { Ord1 } from '../classes/Ord';
import { Ordering } from './Ordering';

interface PropArray extends Prop1 {
	type: this['a'][];
}

export const map: Functor1<PropArray>['map'] = f => xs => xs.map(x => f(x));
export const mapFlipped = F.mapFlipped<PropArray>({ map });
export const voidLeft = F.voidLeft<PropArray>({ map });
export const voidRight = F.voidRight<PropArray>({ map });
const _void = F.void<PropArray>({ map });
export { _void as void };
export const flap = F.flap<PropArray>({ map });

export const apply: Apply<PropArray>['apply'] = fs => xs => {
	const result = [];
	for (const f of fs) {
		for (const x of xs) {
			result.push(f(x));
		}
	}
	return result;
};
export const applyFlipped = A.applyFlipped<PropArray>({ apply });
export const applyFirst = A.applyFirst<PropArray>({ apply, map });
export const applySecond = A.applySecond<PropArray>({ apply, map });
export const lift2 = A.lift2<PropArray>({ apply, map });
export const lift3 = A.lift3<PropArray>({ apply, map });
export const lift4 = A.lift4<PropArray>({ apply, map });
export const lift5 = A.lift5<PropArray>({ apply, map });

export const bind: Bind<PropArray>['bind'] = xs => f =>
	xs.reduce((acc, x) => (Array.prototype.push.apply(acc, f(x)), acc), [] as any[]);
export const bindFlipped = B.bindFlipped<PropArray>({ bind });
export const join = B.join<PropArray>({ bind });
export const composeKleisli = B.composeKleisli<PropArray>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropArray>({ bind });
export const ifM = B.ifM<PropArray>({ bind });

export const pure: Applicative<PropArray>['pure'] = x => [x];
export const liftA1 = Aa.liftA1<PropArray>({ apply, pure });
export const when = Aa.when<PropArray>({ pure });
export const unless = Aa.unless<PropArray>({ pure });

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
		const x = xs[i];
		const y = ys[i];
		const result = compare(x)(y);
		if (result !== Ordering.EQ) return result;
	}
	if (xs.length === ys.length) return Ordering.EQ;
	if (xs.length > ys.length) return Ordering.GT;
	return Ordering.LT;
};
