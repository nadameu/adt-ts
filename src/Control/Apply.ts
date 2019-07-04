import { Functor, Functor2 } from '../Data/Functor';
import { Generic1, Generic2, Type } from '../Generic';

export interface Apply<f extends Generic1> extends Functor<f> {
	apply: <a, b>(ff: Type<f, (_: a) => b>) => (fa: Type<f, a>) => Type<f, b>;
}

export interface Apply2<f extends Generic2> extends Functor2<f> {
	apply: <a, b, c>(ff: Type<f, a, (_: b) => c>) => (fa: Type<f, a, b>) => Type<f, a, c>;
}

interface Helpers<f extends Generic1> {
	applyFirst: <a>(fa: Type<f, a>) => <b>(fb: Type<f, b>) => Type<f, a>;
	applySecond: <a>(fa: Type<f, a>) => <b>(fb: Type<f, b>) => Type<f, b>;
	lift2: <a, b, c>(f: (_: a) => (_: b) => c) => (fa: Type<f, a>) => (fb: Type<f, b>) => Type<f, c>;
	lift3: <a, b, c, d>(
		f: (_: a) => (_: b) => (_: c) => d,
	) => (fa: Type<f, a>) => (fb: Type<f, b>) => (fc: Type<f, c>) => Type<f, d>;
	lift4: <a, b, c, d, e>(
		f: (_: a) => (_: b) => (_: c) => (_: d) => e,
	) => (fa: Type<f, a>) => (fb: Type<f, b>) => (fc: Type<f, c>) => (fd: Type<f, d>) => Type<f, e>;
	lift5: <a, b, c, d, e, g>(
		f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => g,
	) => (
		fa: Type<f, a>,
	) => (fb: Type<f, b>) => (fc: Type<f, c>) => (fd: Type<f, d>) => (fe: Type<f, e>) => Type<f, g>;
}
interface Helpers2<f extends Generic2> {
	applyFirst: <a, b>(fa: Type<f, a, b>) => <c>(fb: Type<f, a, c>) => Type<f, a, b>;
	applySecond: <a, b>(fa: Type<f, a, b>) => <c>(fb: Type<f, a, c>) => Type<f, a, c>;
	lift2: <b, c, d>(
		f: (_: b) => (_: c) => d,
	) => <a>(fa: Type<f, a, b>) => (fb: Type<f, a, c>) => Type<f, a, d>;
	lift3: <b, c, d, e>(
		f: (_: b) => (_: c) => (_: d) => e,
	) => <a>(fa: Type<f, a, b>) => (fb: Type<f, a, c>) => (fc: Type<f, a, d>) => Type<f, a, e>;
	lift4: <b, c, d, e, g>(
		f: (_: b) => (_: c) => (_: d) => (_: e) => g,
	) => <a>(
		fa: Type<f, a, b>,
	) => (fb: Type<f, a, c>) => (fc: Type<f, a, d>) => (fd: Type<f, a, e>) => Type<f, a, g>;
	lift5: <b, c, d, e, g, h>(
		f: (_: b) => (_: c) => (_: d) => (_: e) => (_: g) => h,
	) => <a>(
		fa: Type<f, a, b>,
	) => (
		fb: Type<f, a, c>,
	) => (fc: Type<f, a, d>) => (fd: Type<f, a, e>) => (fe: Type<f, a, g>) => Type<f, a, h>;
}
interface Helper<k extends keyof Helpers<Generic1>> {
	<f extends Generic1>(apply: Apply<f>): Helpers<f>[k];
	<f extends Generic2>(apply: Apply2<f>): Helpers2<f>[k];
}

export const applyFirst: Helper<'applyFirst'> = <f extends Generic1>(apply: Apply<f>) => <a>(
	fa: Type<f, a>,
): (<b>(fb: Type<f, b>) => Type<f, a>) =>
	/*@__PURE__*/ apply.apply<any, a>(apply.map<a, (_: any) => a>(a => _ => a)(fa));

export const applySecond: Helper<'applySecond'> = <f extends Generic1>(apply: Apply<f>) => <a>(
	fa: Type<f, a>,
): (<b>(fb: Type<f, b>) => Type<f, b>) =>
	/*@__PURE__*/ apply.apply<any, any>(apply.map<a, <b>(_: b) => b>(_ => b => b)(fa));

export const lift2: Helper<'lift2'> = <f extends Generic1>(apply: Apply<f>) => <a, b, c>(
	f: (_: a) => (_: b) => c,
) => (fa: Type<f, a>): ((fb: Type<f, b>) => Type<f, c>) =>
	/*@__PURE__*/ apply.apply(apply.map(f)(fa));

export const lift3: Helper<'lift3'> = <f extends Generic1>(apply: Apply<f>) => <a, b, c, d>(
	f: (_: a) => (_: b) => (_: c) => d,
) => (fa: Type<f, a>) => (fb: Type<f, b>): ((fc: Type<f, c>) => Type<f, d>) =>
	/*@__PURE__*/ apply.apply(lift2(apply)(f)(fa)(fb));

export const lift4: Helper<'lift4'> = <f extends Generic1>(apply: Apply<f>) => <a, b, c, d, e>(
	f: (_: a) => (_: b) => (_: c) => (_: d) => e,
) => (fa: Type<f, a>) => (fb: Type<f, b>) => (fc: Type<f, c>): ((fd: Type<f, d>) => Type<f, e>) =>
	/*@__PURE__*/ apply.apply(lift3(apply)(f)(fa)(fb)(fc));

export const lift5: Helper<'lift5'> = <g extends Generic1>(apply: Apply<g>) => <a, b, c, d, e, f>(
	f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => f,
) => (fa: Type<g, a>) => (fb: Type<g, b>) => (fc: Type<g, c>) => (
	fd: Type<g, d>,
): ((fe: Type<g, e>) => Type<g, f>) => /*@__PURE__*/ apply.apply(lift4(apply)(f)(fa)(fb)(fc)(fd));
