import * as A from '../classes/Applicative';
import { Applicative1 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply1 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind1 } from '../classes/Bind';
import { Comonad1 } from '../classes/Comonad';
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
type First<a> = a & {
	[phantom]: a;
};
export const First = <a>(value: a) => value as First<a>;

interface PropFirst extends Prop1 {
	type: First<this['a']>;
}

export const eq1: Eq1<PropFirst>['eq1'] = ({ eq }) => eq;
export const notEq1 = E.notEq1<PropFirst>({ eq1 });

export const compare1: Ord1<PropFirst>['compare1'] = ({ compare }) => compare;
export const lte1 = <a>(Oa: Ord<a>) => O.lte<First<a>>({ compare: compare1(Oa) });
export const gt1 = <a>(Oa: Ord<a>) => O.gt<First<a>>({ compare: compare1(Oa) });
export const lt1 = <a>(Oa: Ord<a>) => O.lt<First<a>>({ compare: compare1(Oa) });
export const gte1 = <a>(Oa: Ord<a>) => O.gte<First<a>>({ compare: compare1(Oa) });
export const comparing1 = <b>(Ob: Ord<b>) => O.comparing<First<b>>({ compare: compare1(Ob) });
export const min1 = <a>(Oa: Ord<a>) => O.min<First<a>>({ compare: compare1(Oa) });
export const max1 = <a>(Oa: Ord<a>) => O.max<First<a>>({ compare: compare1(Oa) });
export const clamp1 = <a>(Oa: Ord<a>) => O.clamp<First<a>>({ compare: compare1(Oa) });
export const between1 = <a>(Oa: Ord<a>) => O.between<First<a>>({ compare: compare1(Oa) });

export const map: Functor1<PropFirst>['map'] = f => x => First(f(x));
export const mapFlipped = F.mapFlipped<PropFirst>({ map });
export const voidLeft = F.voidLeft<PropFirst>({ map });
export const voidRight = F.voidRight<PropFirst>({ map });
const _void = F.void<PropFirst>({ map });
export { _void as void };
export const flap = F.flap<PropFirst>({ map });

export const apply: Apply1<PropFirst>['apply'] = f => x => First(f(x));
export const applyFlipped = Ap.applyFlipped<PropFirst>({ apply });
export const applyFirst = Ap.applyFirst<PropFirst>({ apply, map });
export const applySecond = Ap.applySecond<PropFirst>({ apply, map });
export const lift2 = Ap.lift2<PropFirst>({ apply, map });
export const lift3 = Ap.lift3<PropFirst>({ apply, map });
export const lift4 = Ap.lift4<PropFirst>({ apply, map });
export const lift5 = Ap.lift5<PropFirst>({ apply, map });

export const bind: Bind1<PropFirst>['bind'] = x => f => First(f(x));
export const bindFlipped = B.bindFlipped<PropFirst>({ bind });
export const join = B.join<PropFirst>({ bind });
export const composeKleisli = B.composeKleisli<PropFirst>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropFirst>({ bind });
export const ifM = B.ifM<PropFirst>({ bind });

export const pure: Applicative1<PropFirst>['pure'] = First;
export const liftA1 = A.liftA1<PropFirst>({ apply, pure });
export const when = A.when<PropFirst>({ pure });
export const unless = A.unless<PropFirst>({ pure });

export const liftM1 = M.liftM1<PropFirst>({ bind, pure });
export const ap = M.ap<PropFirst>({ bind, pure });
export const whenM = M.whenM<PropFirst>({ bind, pure });
export const unlessM = M.unlessM<PropFirst>({ bind, pure });

export const append: Semigroup1<PropFirst>['append'] = x => _ => x;

export const extend: Extend1<PropFirst>['extend'] = f => x => First(f(x));
export const extendFlipped = Ex.extendFlipped<PropFirst>({ extend });
export const composeCoKleisli = Ex.composeCoKleisli<PropFirst>({ extend });
export const composeCoKleisliFlipped = Ex.composeCoKleisliFlipped<PropFirst>({ extend });
export const duplicate = Ex.duplicate<PropFirst>({ extend });

export const extract: Comonad1<PropFirst>['extract'] = x => x;
