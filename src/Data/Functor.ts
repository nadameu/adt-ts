import { Generic1, Generic2, Type } from '../Generic';
import { applyFlipped, constant, flip } from './Function';

export interface Functor<f extends Generic1> {
	map: <a, b>(f: (_: a) => b) => (fa: Type<f, a>) => Type<f, b>;
}

export interface Functor2<f extends Generic2> {
	map: <b, c>(f: (_: b) => c) => <a>(fa: Type<f, a, b>) => Type<f, a, c>;
}

interface Helpers1<f extends Generic1> {
	mapFlipped: <a>(fa: Type<f, a>) => <b>(f: (_: a) => b) => Type<f, b>;
	void: <a>(fa: Type<f, a>) => Type<f, void>;
	voidRight: <a>(a: a) => <b>(fb: Type<f, b>) => Type<f, a>;
	voidLeft: <a>(fa: Type<f, a>) => <b>(b: b) => Type<f, b>;
	flap: <a, b>(ff: Type<f, (_: a) => b>) => (a: a) => Type<f, b>;
}
interface Helpers2<f extends Generic2> {
	mapFlipped: <a, b>(fa: Type<f, a, b>) => <c>(f: (_: b) => c) => Type<f, a, c>;
	void: <a, b>(fa: Type<f, a, b>) => Type<f, a, void>;
	voidRight: <b>(b: b) => <a, c>(fb: Type<f, a, c>) => Type<f, a, b>;
	voidLeft: <a, b>(fa: Type<f, a, b>) => <c>(c: c) => Type<f, a, c>;
	flap: <a, b, c>(ff: Type<f, a, (_: b) => c>) => (b: b) => Type<f, a, c>;
}
interface Helper<k extends keyof Helpers1<Generic1>> {
	<f extends Generic2>(functor: Functor2<f>): Helpers2<f>[k];
	<f extends Generic1>(functor: Functor<f>): Helpers1<f>[k];
}

export const mapFlipped: Helper<'mapFlipped'> = <f extends Generic1>(
	functor: Functor<f>,
): (<a>(fa: Type<f, a>) => <b>(f: (_: a) => b) => Type<f, b>) => /*@__PURE__*/ flip(functor.map);

export const void$: Helper<'void'> = <f extends Generic1>(
	functor: Functor<f>,
): (<a>(fa: Type<f, a>) => Type<f, void>) => /*@__PURE__*/ functor.map(_ => undefined);

export const voidRight: Helper<'voidRight'> = <f extends Generic1>(functor: Functor<f>) => <a>(
	a: a,
): (<b>(fb: Type<f, b>) => Type<f, a>) => /*@__PURE__*/ functor.map(constant(a));

export const voidLeft: Helper<'voidLeft'> = <f extends Generic1>(
	functor: Functor<f>,
): (<a>(fa: Type<f, a>) => <b>(b: b) => Type<f, b>) => /*@__PURE__*/ flip(voidRight(functor));

export const flap: Helper<'flap'> = <f extends Generic1>(functor: Functor<f>) => <a, b>(
	ff: Type<f, (_: a) => b>,
) => (a: a): Type<f, b> => functor.map(applyFlipped(a))(ff);
