import * as A from '../classes/Applicative';
import { Applicative1 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply1 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind1 } from '../classes/Bind';
import { Comonad1 } from '../classes/Comonad';
import * as Ex from '../classes/Extend';
import { Extend1 } from '../classes/Extend';
import * as F from '../classes/Functor';
import { Functor1 } from '../classes/Functor';
import * as M from '../classes/Monad';
import { Monad1 } from '../classes/Monad';
import { Prop1 } from '../Types';

declare const phantom: unique symbol;
type Identity<a> = a & {
	[phantom]: a;
};
export const Identity = <a>(value: a) => value as Identity<a>;

interface PropIdentity extends Prop1 {
	type: Identity<this['a']>;
}

export const map: Functor1<PropIdentity>['map'] = f => x => Identity(f(x));
export const functorIdentity: Functor1<PropIdentity> = { map };
export const mapFlipped = F.mapFlipped(functorIdentity);
export const voidLeft = F.voidLeft(functorIdentity);
export const voidRight = F.voidRight(functorIdentity);
const _void = F.void(functorIdentity);
export { _void as void };
export const flap = F.flap(functorIdentity);

export const apply: Apply1<PropIdentity>['apply'] = f => x => Identity(f(x));
export const applyIdentity: Apply1<PropIdentity> = { apply, map };
export const applyFlipped = Ap.applyFlipped(applyIdentity);
export const applyFirst = Ap.applyFirst(applyIdentity);
export const applySecond = Ap.applySecond(applyIdentity);
export const lift2 = Ap.lift2(applyIdentity);
export const lift3 = Ap.lift3(applyIdentity);
export const lift4 = Ap.lift4(applyIdentity);
export const lift5 = Ap.lift5(applyIdentity);

export const bind: Bind1<PropIdentity>['bind'] = x => f => f(x);
export const bindIdentity: Bind1<PropIdentity> = { apply, bind, map };
export const bindFlipped = B.bindFlipped(bindIdentity);
export const join = B.join(bindIdentity);
export const composeKleisli = B.composeKleisli(bindIdentity);
export const composeKleisliFlipped = B.composeKleisliFlipped(bindIdentity);
export const ifM = B.ifM(bindIdentity);

export const pure: Applicative1<PropIdentity>['pure'] = Identity;
export const applicativeIdentity: Applicative1<PropIdentity> = { apply, map, pure };
export const liftA1 = A.liftA1(applicativeIdentity);
export const when = A.when(applicativeIdentity);
export const unless = A.unless(applicativeIdentity);

export const monadIdentity: Monad1<PropIdentity> = { apply, bind, map, pure };
export const liftM1 = M.liftM1(monadIdentity);
export const ap = M.ap(monadIdentity);
export const whenM = M.whenM(monadIdentity);
export const unlessM = M.unlessM(monadIdentity);

export const extend: Extend1<PropIdentity>['extend'] = f => x => Identity(f(x));
export const extendIdentity: Extend1<PropIdentity> = { extend, map };
export const extendFlipped = Ex.extendFlipped(extendIdentity);
export const composeCoKleisli = Ex.composeCoKleisli(extendIdentity);
export const composeCoKleisliFlipped = Ex.composeCoKleisliFlipped(extendIdentity);
export const duplicate = Ex.duplicate(extendIdentity);

export const extract: Comonad1<PropIdentity>['extract'] = x => x;
export const comonadIdentity: Comonad1<PropIdentity> = { extend, extract, map };
