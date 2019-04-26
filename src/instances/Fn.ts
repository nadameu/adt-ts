import * as A from '../classes/Applicative';
import { Applicative2 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply2 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind2 } from '../classes/Bind';
import * as F from '../classes/Functor';
import { Functor2 } from '../classes/Functor';
import * as M from '../classes/Monad';
import { Semigroup, Semigroup1, Semigroup2 } from '../classes/Semigroup';
import * as S from '../classes/Semigroupoid';
import { Semigroupoid2 } from '../classes/Semigroupoid';
import { AnyFn1, Prop1, Prop2, Type1 } from '../Types';
import { Monoid1, Monoid2, Monoid } from '../classes/Monoid';
import * as M1 from '../classes/Monoid';

export interface PropFn extends Prop2 {
	type: (_: this['a']) => this['b'];
}
export interface PropFn1<b> extends Prop1 {
	type: (_: this['a']) => b;
}

export const compose: Semigroupoid2<PropFn>['compose'] = f => g => x => f(g(x));
export const composeFlipped = S.composeFlipped<PropFn>({ compose });

export const identity: <a>(_: a) => a = x => x;

export const map: Functor2<PropFn>['map'] = compose;
export const mapFlipped = F.mapFlipped<PropFn>({ map });
export const voidLeft = F.voidLeft<PropFn>({ map });
export const voidRight = F.voidRight<PropFn>({ map });
const _void = F.void<PropFn>({ map });
export { _void as void };
export const flap = F.flap<PropFn>({ map });

export const apply: Apply2<PropFn>['apply'] = ff => fa => x => ff(x)(fa(x));
export const applyFlipped = Ap.applyFlipped<PropFn>({ apply });
export const applyFirst = Ap.applyFirst<PropFn>({ apply, map });
export const applySecond = Ap.applySecond<PropFn>({ apply, map });
export const lift2 = Ap.lift2<PropFn>({ apply, map });
export const lift3 = Ap.lift3<PropFn>({ apply, map });
export const lift4 = Ap.lift4<PropFn>({ apply, map });
export const lift5 = Ap.lift5<PropFn>({ apply, map });

export const bind: Bind2<PropFn>['bind'] = fa => f => x => f(fa(x))(x);
export const bindFlipped = B.bindFlipped<PropFn>({ bind });
export const join = B.join<PropFn>({ bind });
export const composeKleisli = B.composeKleisli<PropFn>({ bind });
export const composeKleisliFlipped = B.composeKleisliFlipped<PropFn>({ bind });
export const ifM = B.ifM<PropFn>({ bind });

export const pure: Applicative2<PropFn>['pure'] = x => _ => x;
export const liftA1 = A.liftA1<PropFn>({ apply, pure });
export const when = A.when<PropFn>({ pure });
export const unless = A.unless<PropFn>({ pure });

export const liftM1 = M.liftM1<PropFn>({ bind, pure });
export const ap = M.ap<PropFn>({ bind, pure });
export const whenM = M.whenM<PropFn>({ bind, pure });
export const unlessM = M.unlessM<PropFn>({ bind, pure });

interface PropDerivedFn<f extends Prop1> extends Prop2 {
	type: (_: this['a']) => Type1<f, this['b']>;
}
export const append1: {
	<f extends Prop1>(S: Semigroup1<f>): Semigroup2<PropDerivedFn<f>>['append'];
	<b>(S: Semigroup<b>): Semigroup1<PropFn1<b>>['append'];
} = (({ append }) => lift2(append)) as AnyFn1;

export const mempty1: {
	<f extends Prop1>(S: Pick<Monoid1<f>, 'mempty'>): Monoid2<PropDerivedFn<f>>['mempty'];
	<b>(S: Pick<Monoid<b>, 'mempty'>): Monoid1<PropFn1<b>>['mempty'];
} = (({ mempty }) => () => () => mempty()) as AnyFn1;
export const power1: {
	<f extends Prop1>(M: Monoid1<f>): <a, b>(
		x: (_: a) => Type1<f, b>,
	) => (p: number) => (_: a) => Type1<f, b>;
	<b>(M: Monoid<b>): <a>(x: (_: a) => b) => (p: number) => (_: a) => b;
} = (M => M1.power({ append: append1(M), mempty: mempty1(M) })) as AnyFn1;
export const guard1: {
	<f extends Prop1>(M: Pick<Monoid1<f>, 'mempty'>): (
		p: boolean,
	) => <a, b>(x: (_: a) => Type1<f, b>) => (_: a) => Type1<f, b>;
	<b>(M: Pick<Monoid<b>, 'mempty'>): (p: boolean) => <a>(x: (_: a) => b) => (_: a) => b;
} = (({ mempty }) => M1.guard({ mempty: mempty1({ mempty }) })) as AnyFn1;
