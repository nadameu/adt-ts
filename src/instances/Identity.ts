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
export const mapFlipped = F.mapFlipped<PropIdentity>({ map });
export const voidLeft = F.voidLeft<PropIdentity>({ map });
export const voidRight = F.voidRight<PropIdentity>({ map });
const _void = F.void<PropIdentity>({ map });
export { _void as void };
export const flap = F.flap<PropIdentity>({ map });

export const apply: Apply1<PropIdentity>['apply'] = f => x => Identity(f(x));
export const applyFlipped = Ap.applyFlipped<PropIdentity>({ apply });
export const applyFirst = Ap.applyFirst<PropIdentity>({ apply, map });
export const applySecond = Ap.applySecond<PropIdentity>({ apply, map });
export const lift2 = Ap.lift2<PropIdentity>({ apply, map });
export const lift3 = Ap.lift3<PropIdentity>({ apply, map });
export const lift4 = Ap.lift4<PropIdentity>({ apply, map });
export const lift5 = Ap.lift5<PropIdentity>({ apply, map });

export const bind: Bind1<PropIdentity>['bind'] = x => f => f(x);
export const bindFlipped = B.bindFlipped<PropIdentity>({ bind });
export const join = B.join<PropIdentity>({ bind });
export const composeKleisli = B.composeKleisli<PropIdentity>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropIdentity>({ bind });
export const ifM = B.ifM<PropIdentity>({ bind });

export const pure: Applicative1<PropIdentity>['pure'] = Identity;
export const liftA1 = A.liftA1<PropIdentity>({ apply, pure });
export const when = A.when<PropIdentity>({ pure });
export const unless = A.unless<PropIdentity>({ pure });

export const liftM1 = M.liftM1<PropIdentity>({ bind, pure });
export const ap = M.ap<PropIdentity>({ bind, pure });
export const whenM = M.whenM<PropIdentity>({ bind, pure });
export const unlessM = M.unlessM<PropIdentity>({ bind, pure });

export const extend: Extend1<PropIdentity>['extend'] = f => x => Identity(f(x));
export const extendFlipped = Ex.extendFlipped<PropIdentity>({ extend });
export const composeCoKleisli = Ex.composeCoKleisli<PropIdentity>({ extend });
export const composeCoKleisliFlipped = Ex.composeCoKleisliFlipped<PropIdentity>({ extend });
export const duplicate = Ex.duplicate<PropIdentity>({ extend });

export const extract: Comonad1<PropIdentity>['extract'] = x => x;
