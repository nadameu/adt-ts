import * as A from '../classes/Applicative';
import { Applicative2 } from '../classes/Applicative';
import * as Ap from '../classes/Apply';
import { Apply2 } from '../classes/Apply';
import * as B from '../classes/Bind';
import { Bind2 } from '../classes/Bind';
import { Extend1, Extend2 } from '../classes/Extend';
import * as F from '../classes/Functor';
import { Functor2 } from '../classes/Functor';
import { Lazy2 } from '../classes/Lazy';
import * as M from '../classes/Monad';
import { Monad2 } from '../classes/Monad';
import * as M1 from '../classes/Monoid';
import { Monoid, Monoid1, Monoid2 } from '../classes/Monoid';
import { Semigroup, Semigroup1, Semigroup2 } from '../classes/Semigroup';
import * as S from '../classes/Semigroupoid';
import { Semigroupoid2 } from '../classes/Semigroupoid';
import { AnyFn1, AnyFn4, Prop1, Prop2, Type1 } from '../Types';

export interface PropFn extends Prop2 {
	type: (_: this['a']) => this['b'];
}
export interface PropFn1<b> extends Prop1 {
	type: (_: this['a']) => b;
}
export interface PropFn1R<a> extends Prop1 {
	type: (_: a) => this['a'];
}

export const compose: Semigroupoid2<PropFn>['compose'] = f => g => x => f(g(x));
export const composeFlipped = S.composeFlipped<PropFn>({ compose });

export const identity: <a>(_: a) => a = x => x;

export const map: Functor2<PropFn>['map'] = compose;
export const functorFn: Functor2<PropFn> = { map };
export const mapFlipped = F.mapFlipped(functorFn);
export const voidLeft = F.voidLeft(functorFn);
export const voidRight = F.voidRight(functorFn);
export const _void = F.void(functorFn);
export const flap = F.flap(functorFn);

export const apply: Apply2<PropFn>['apply'] = ff => fa => x => ff(x)(fa(x));
export const applyFn: Apply2<PropFn> = { apply, map };
export const applyFlipped = Ap.applyFlipped(applyFn);
export const applyFirst = Ap.applyFirst(applyFn);
export const applySecond = Ap.applySecond(applyFn);
export const lift2 = Ap.lift2(applyFn);
export const lift3 = Ap.lift3(applyFn);
export const lift4 = Ap.lift4(applyFn);
export const lift5 = Ap.lift5(applyFn);

export const bind: Bind2<PropFn>['bind'] = fa => f => x => f(fa(x))(x);
export const bindFn: Bind2<PropFn> = { apply, bind, map };
export const bindFlipped = B.bindFlipped(bindFn);
export const join = B.join(bindFn);
export const composeKleisli = B.composeKleisli(bindFn);
export const composeKleisliFlipped = B.composeKleisliFlipped(bindFn);
export const ifM = B.ifM(bindFn);

export const pure: Applicative2<PropFn>['pure'] = x => _ => x;
export const applicativeFn: Applicative2<PropFn> = { apply, map, pure };
export const liftA1 = A.liftA1(applicativeFn);
export const when = A.when(applicativeFn);
export const unless = A.unless(applicativeFn);
export const constant: <a>(x: a) => <b>(y: b) => a = pure;

export const monadFn: Monad2<PropFn> = { apply, bind, map, pure };
export const liftM1 = M.liftM1(monadFn);
export const ap = M.ap(monadFn);
export const whenM = M.whenM(monadFn);
export const unlessM = M.unlessM(monadFn);

interface PropDerivedFn<f extends Prop1> extends Prop2 {
	type: (_: this['a']) => Type1<f, this['b']>;
}
export const append1: {
	<f extends Prop1>(S: Semigroup1<f>): Semigroup2<PropDerivedFn<f>>['append'];
	<b>(S: Semigroup<b>): Semigroup1<PropFn1<b>>['append'];
} = (({ append }) => lift2(append)) as AnyFn1;

export const mempty1: {
	<f extends Prop1>(S: Monoid1<f>): Monoid2<PropDerivedFn<f>>['mempty'];
	<b>(S: Monoid<b>): Monoid1<PropFn1<b>>['mempty'];
} = (({ mempty }) => () => () => mempty()) as AnyFn1;
export const power1: {
	<f extends Prop1>(M: Monoid1<f>): <a, b>(
		x: (_: a) => Type1<f, b>,
	) => (p: number) => (_: a) => Type1<f, b>;
	<b>(M: Monoid<b>): <a>(x: (_: a) => b) => (p: number) => (_: a) => b;
} = (M => M1.power({ append: append1(M), mempty: mempty1(M) })) as AnyFn1;
export const guard1: {
	<f extends Prop1>(M: Monoid1<f>): (
		p: boolean,
	) => <a, b>(x: (_: a) => Type1<f, b>) => (_: a) => Type1<f, b>;
	<b>(M: Monoid<b>): (p: boolean) => <a>(x: (_: a) => b) => (_: a) => b;
} = (M => M1.guard({ mempty: mempty1(M) })) as AnyFn1;

export const thrush: <a>(x: a) => <b>(f: (_: a) => b) => b = x => f => f(x);

interface PropDerivedFirstFn<f extends Prop1> extends Prop2 {
	type: (_: Type1<f, this['a']>) => this['b'];
}
export const extend1: {
	<f extends Prop1>(S: Semigroup1<f>): Extend2<PropDerivedFirstFn<f>>['extend'];
	<c>(S: Semigroup<c>): Extend1<PropFn1R<c>>['extend'];
} = (({ append }) => f => g => fa => f((w2 => g(append(fa)(w2))) as AnyFn1)) as AnyFn4;

export const defer: Lazy2<PropFn>['defer'] = f => x => f()(x);

export const flip: <a, b, c>(f: (_: a) => (_: b) => c) => (y: b) => (x: a) => c = f => y => x =>
	f(x)(y);
