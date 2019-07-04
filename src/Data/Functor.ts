import { Generic1, Generic2, Type } from '../Generic';
import { applyFlipped, constant, flip } from './Function';

export interface Functor<f extends Generic1> {
	map: <a, b>(f: (_: a) => b) => (fa: Type<f, a>) => Type<f, b>;
}

export interface Functor2<f extends Generic2> {
	map: <b, c>(f: (_: b) => c) => <a>(fa: Type<f, a, b>) => Type<f, a, c>;
}

export const mapFlipped = <f extends Generic1>(
	functor: Functor<f>,
): (<a>(fa: Type<f, a>) => <b>(f: (_: a) => b) => Type<f, b>) => /*@__PURE__*/ flip(functor.map);

export const void$ = <f extends Generic1>(
	functor: Functor<f>,
): (<a>(fa: Type<f, a>) => Type<f, void>) => /*@__PURE__*/ functor.map(_ => undefined);

export const voidRight = <f extends Generic1>(functor: Functor<f>) => <a>(
	a: a,
): (<b>(fb: Type<f, b>) => Type<f, a>) => /*@__PURE__*/ functor.map(constant(a));

export const voidLeft = <f extends Generic1>(
	functor: Functor<f>,
): (<a>(fa: Type<f, a>) => <b>(b: b) => Type<f, b>) => /*@__PURE__*/ flip(voidRight(functor));

export const flap = <f extends Generic1>(functor: Functor<f>) => <a, b>(
	ff: Type<f, (_: a) => b>,
) => (a: a): Type<f, b> => functor.map(applyFlipped(a))(ff);
