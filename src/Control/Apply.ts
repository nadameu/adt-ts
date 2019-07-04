import { Functor } from '../Data/Functor';
import { Generic1, Type } from '../Generic';

export interface Apply<f extends Generic1> extends Functor<f> {
	apply: <a, b>(ff: Type<f, (_: a) => b>) => (fa: Type<f, a>) => Type<f, b>;
}

export const applyFirst = <f extends Generic1>(apply: Apply<f>) => <a>(
	fa: Type<f, a>,
): (<b>(fb: Type<f, b>) => Type<f, a>) =>
	/*@__PURE__*/ apply.apply<any, a>(apply.map<a, (_: any) => a>(a => _ => a)(fa));

export const applySecond = <f extends Generic1>(apply: Apply<f>) => <a>(
	fa: Type<f, a>,
): (<b>(fb: Type<f, b>) => Type<f, b>) =>
	/*@__PURE__*/ apply.apply<any, any>(apply.map<a, <b>(_: b) => b>(_ => b => b)(fa));

export const lift2 = <f extends Generic1>(apply: Apply<f>) => <a, b, c>(
	f: (_: a) => (_: b) => c,
) => (fa: Type<f, a>): ((fb: Type<f, b>) => Type<f, c>) =>
	/*@__PURE__*/ apply.apply(apply.map(f)(fa));

export const lift3 = <f extends Generic1>(apply: Apply<f>) => <a, b, c, d>(
	f: (_: a) => (_: b) => (_: c) => d,
) => (fa: Type<f, a>) => (fb: Type<f, b>): ((fc: Type<f, c>) => Type<f, d>) =>
	/*@__PURE__*/ apply.apply(lift2(apply)(f)(fa)(fb));

export const lift4 = <f extends Generic1>(apply: Apply<f>) => <a, b, c, d, e>(
	f: (_: a) => (_: b) => (_: c) => (_: d) => e,
) => (fa: Type<f, a>) => (fb: Type<f, b>) => (fc: Type<f, c>): ((fd: Type<f, d>) => Type<f, e>) =>
	/*@__PURE__*/ apply.apply(lift3(apply)(f)(fa)(fb)(fc));

export const lift5 = <g extends Generic1>(apply: Apply<g>) => <a, b, c, d, e, f>(
	f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => f,
) => (fa: Type<g, a>) => (fb: Type<g, b>) => (fc: Type<g, c>) => (
	fd: Type<g, d>,
): ((fe: Type<g, e>) => Type<g, f>) => /*@__PURE__*/ apply.apply(lift4(apply)(f)(fa)(fb)(fc)(fd));
