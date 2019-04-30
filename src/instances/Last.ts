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
import * as O from '../classes/Ord';
import { Ord, Ord1 } from '../classes/Ord';
import { Semigroup1 } from '../classes/Semigroup';
import { Prop1 } from '../Types';

declare const phantom: unique symbol;
type Last<a> = a & {
	[phantom]: a;
};
export const Last = <a>(value: a) => value as Last<a>;

interface PropLast extends Prop1 {
	type: Last<this['a']>;
}

export const eq1: Eq1<PropLast>['eq1'] = ({ eq }) => eq;
export const notEq1 = E.notEq1<PropLast>({ eq1 });

export const compare1: Ord1<PropLast>['compare1'] = ({ compare }) => compare;
export const lte1 = <a>(Oa: Ord<a>) => O.lte<Last<a>>({ compare: compare1(Oa) });
export const gt1 = <a>(Oa: Ord<a>) => O.gt<Last<a>>({ compare: compare1(Oa) });
export const lt1 = <a>(Oa: Ord<a>) => O.lt<Last<a>>({ compare: compare1(Oa) });
export const gte1 = <a>(Oa: Ord<a>) => O.gte<Last<a>>({ compare: compare1(Oa) });
export const comparing1 = <b>(Ob: Ord<b>) => O.comparing<Last<b>>({ compare: compare1(Ob) });
export const min1 = <a>(Oa: Ord<a>) => O.min<Last<a>>({ compare: compare1(Oa) });
export const max1 = <a>(Oa: Ord<a>) => O.max<Last<a>>({ compare: compare1(Oa) });
export const clamp1 = <a>(Oa: Ord<a>) => O.clamp<Last<a>>({ compare: compare1(Oa) });
export const between1 = <a>(Oa: Ord<a>) => O.between<Last<a>>({ compare: compare1(Oa) });

export const map: Functor1<PropLast>['map'] = f => x => Last(f(x));
export const mapFlipped = F.mapFlipped<PropLast>({ map });
export const voidLeft = F.voidLeft<PropLast>({ map });
export const voidRight = F.voidRight<PropLast>({ map });
const _void = F.void<PropLast>({ map });
export { _void as void };
export const flap = F.flap<PropLast>({ map });

export const apply: Apply1<PropLast>['apply'] = f => x => Last(f(x));
export const applyFlipped = Ap.applyFlipped<PropLast>({ apply });
export const applyFirst = Ap.applyFirst<PropLast>({ apply, map });
export const applySecond = Ap.applySecond<PropLast>({ apply, map });
export const lift2 = Ap.lift2<PropLast>({ apply, map });
export const lift3 = Ap.lift3<PropLast>({ apply, map });
export const lift4 = Ap.lift4<PropLast>({ apply, map });
export const lift5 = Ap.lift5<PropLast>({ apply, map });

export const bind: Bind1<PropLast>['bind'] = x => f => Last(f(x));
export const bindFlipped = B.bindFlipped<PropLast>({ bind });
export const join = B.join<PropLast>({ bind });
export const composeKleisli = B.composeKleisli<PropLast>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropLast>({ bind });
export const ifM = B.ifM<PropLast>({ bind });

export const pure: Applicative1<PropLast>['pure'] = Last;
export const liftA1 = A.liftA1<PropLast>({ apply, pure });
export const when = A.when<PropLast>({ pure });
export const unless = A.unless<PropLast>({ pure });

export const liftM1 = M.liftM1<PropLast>({ bind, pure });
export const ap = M.ap<PropLast>({ bind, pure });
export const whenM = M.whenM<PropLast>({ bind, pure });
export const unlessM = M.unlessM<PropLast>({ bind, pure });

export const append: Semigroup1<PropLast>['append'] = _ => y => y;

export const extend: Extend1<PropLast>['extend'] = f => x => Last(f(x));
export const extendFlipped = Ex.extendFlipped<PropLast>({ extend });
export const composeCoKleisli = Ex.composeCoKleisli<PropLast>({ extend });
export const composeCoKleisliFlipped = Ex.composeCoKleisliFlipped<PropLast>({ extend });
export const duplicate = Ex.duplicate<PropLast>({ extend });
