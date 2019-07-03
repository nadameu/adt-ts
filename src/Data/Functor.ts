import { Generic1, Type } from '../Generic';

export interface Functor<f extends Generic1> {
	map: <a, b>(f: (_: a) => b) => (fa: Type<f, a>) => Type<f, b>;
}

export const mapFlipped = <f extends Generic1>(functor: Functor<f>) => <a>(fa: Type<f, a>) => <b>(
	f: (_: a) => b,
): Type<f, b> => functor.map(f)(fa);

export const void_ = <f extends Generic1>(
	functor: Functor<f>,
): (<a>(fa: Type<f, a>) => Type<f, void>) => /*@__PURE__*/ functor.map(_ => undefined);

export const voidRight = <f extends Generic1>(functor: Functor<f>) => <a>(
	a: a,
): (<b>(fb: Type<f, b>) => Type<f, a>) => /*@__PURE__*/ functor.map(_ => a);

export const voidLeft = <f extends Generic1>(functor: Functor<f>) => <a>(fa: Type<f, a>) => <b>(
	b: b,
): Type<f, b> => functor.map(_ => b)(fa);

export const flap = <f extends Generic1>(functor: Functor<f>) => <a, b>(
	ff: Type<f, (_: a) => b>,
) => (a: a): Type<f, b> => functor.map<(_: a) => b, b>(f => f(a))(ff);
