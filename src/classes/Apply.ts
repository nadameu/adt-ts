import { B1, B2, constant, flip, identity, apply } from '../combinators';
import {
	Prop1,
	Prop2,
	Type1,
	Type2,
	Type5,
	Prop5,
	AnyFn3,
	AnyFn1,
	AnyFn2,
	AnyFn4,
	AnyFn5,
	AnyFn6,
} from '../Types';
import { Functor1, Functor2 } from './Functor';

export interface Apply1<f extends Prop1> extends Functor1<f> {
	apply: <a, b>(ff: Type1<f, (_: a) => b>) => (fa: Type1<f, a>) => Type1<f, b>;
}
export interface Apply2<f extends Prop2> extends Functor2<f> {
	apply: <a, b, c>(ff: Type2<f, a, (_: b) => c>) => (fa: Type2<f, a, b>) => Type2<f, a, c>;
}

export const applyFlipped: {
	<f extends Prop2>(A: Pick<Apply2<f>, 'apply'>): <a, b>(
		fa: Type2<f, a, b>,
	) => <c>(ff: Type2<f, a, (_: b) => c>) => Type2<f, a, c>;
	<f extends Prop1>(A: Pick<Apply1<f>, 'apply'>): <a>(
		fa: Type1<f, a>,
	) => <b>(ff: Type1<f, (_: a) => b>) => Type1<f, b>;
} = (({ apply }) => fa => ff => apply(ff)(fa)) as AnyFn3;

export const applyFirst: {
	<f extends Prop2>(A: Apply2<f>): <a, b>(
		fa: Type2<f, a, b>,
	) => <c>(fb: Type2<f, a, c>) => Type2<f, a, b>;
	<f extends Prop1>(A: Apply1<f>): <a>(fa: Type1<f, a>) => <b>(fb: Type1<f, b>) => Type1<f, a>;
} = (({ apply, map }) => lift2({ apply, map })(constant)) as AnyFn1;

export const applySecond: {
	<f extends Prop2>(A: Apply2<f>): <a, b>(
		fa: Type2<f, a, b>,
	) => <c>(fb: Type2<f, a, c>) => Type2<f, a, c>;
	<f extends Prop1>(A: Apply1<f>): <a>(fa: Type1<f, a>) => <b>(fb: Type1<f, b>) => Type1<f, b>;
} = (({ apply, map }) => lift2({ apply, map })(constant(identity))) as AnyFn1;

export const lift2: {
	<f extends Prop2>(A: Apply2<f>): <b, c, d>(
		f: (_: b) => (_: c) => d,
	) => <a>(fa: Type2<f, a, b>) => (fb: Type2<f, a, c>) => Type2<f, a, d>;
	<f extends Prop1>(A: Apply1<f>): <a, b, c>(
		f: (_: a) => (_: b) => c,
	) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => Type1<f, c>;
} = (({ apply, map }) => f => fa => apply(map(f)(fa))) as AnyFn3;

export const lift3: {
	<f extends Prop2>(A: Apply2<f>): <b, c, d, e>(
		f: (_: b) => (_: c) => (_: d) => e,
	) => <a>(fa: Type2<f, a, b>) => (fb: Type2<f, a, c>) => (fc: Type2<f, a, d>) => Type2<f, a, e>;
	<f extends Prop1>(A: Apply1<f>): <a, b, c, d>(
		f: (_: a) => (_: b) => (_: c) => d,
	) => (fa: Type1<f, a>) => (fb: Type1<f, b>) => (fc: Type1<f, c>) => Type1<f, d>;
} = (({ apply, map }) => f => fa => fb => apply(lift2({ apply, map })(f)(fa)(fb))) as AnyFn4;

export const lift4: {
	<g extends Prop2>(A: Apply2<g>): <b, c, d, e, f>(
		f: (_: b) => (_: c) => (_: d) => (_: e) => f,
	) => <a>(
		fa: Type2<g, a, b>,
	) => (fb: Type2<g, a, c>) => (fc: Type2<g, a, d>) => (fd: Type2<g, a, e>) => Type2<g, a, f>;
	<f extends Prop1>(A: Apply1<f>): <a, b, c, d, e>(
		f: (_: a) => (_: b) => (_: c) => (_: d) => e,
	) => (
		fa: Type1<f, a>,
	) => (fb: Type1<f, b>) => (fc: Type1<f, c>) => (fd: Type1<f, d>) => Type1<f, e>;
} = (({ apply, map }) => f => fa => fb => fc =>
	apply(lift3({ apply, map })(f)(fa)(fb)(fc))) as AnyFn5;

export const lift5: {
	<h extends Prop2>(A: Apply2<h>): <b, c, d, e, f, g>(
		f: (_: b) => (_: c) => (_: d) => (_: e) => (_: f) => g,
	) => <a>(
		fa: Type2<h, a, b>,
	) => (
		fb: Type2<h, a, c>,
	) => (fc: Type2<h, a, d>) => (fd: Type2<h, a, e>) => (fe: Type2<h, a, f>) => Type2<h, a, g>;
	<g extends Prop1>(A: Apply1<g>): <a, b, c, d, e, f>(
		f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => f,
	) => (
		fa: Type1<g, a>,
	) => (
		fb: Type1<g, b>,
	) => (fc: Type1<g, c>) => (fd: Type1<g, d>) => (fe: Type1<g, e>) => Type1<g, f>;
} = (({ apply, map }) => f => fa => fb => fc => fd =>
	apply(lift4({ apply, map })(f)(fa)(fb)(fc)(fd))) as AnyFn6;
