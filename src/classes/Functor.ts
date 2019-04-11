import { compose, constant, flip, thrush } from '../combinators';
import { Type1 } from '../Types';

export interface Functor<f> {
	map: <a, b>(f: (_: a) => b) => <y, x, w>(fa: Type1<f, w, x, y, a>) => Type1<f, w, x, y, b>;
}

export const map: <f>(F: Functor<f>) => Functor<f>['map'] = F => F.map;

export const mapFlipped: <f>(
	F: Functor<f>,
) => <a, y, x, w>(fa: Type1<f, w, x, y, a>) => <b>(f: (_: a) => b) => Type1<f, w, x, y, b> = F =>
	flip<any, any, any>(F.map);

export const voidLeft: <f>(
	F: Functor<f>,
) => <y, x, w>(fa: Type1<f, w, x, y, any>) => <b>(y: b) => Type1<f, w, x, y, b> = F =>
	flip<any, any, any>(voidRight(F));

export const voidRight: <f>(
	F: Functor<f>,
) => <a>(x: a) => <y, x, w>(fb: Type1<f, w, x, y, any>) => Type1<f, w, x, y, a> = F =>
	compose<any, any, any>(F.map)(constant);

const _void: <f>(
	F: Functor<f>,
) => <y, x, w>(fa: Type1<f, w, x, y, any>) => Type1<f, w, x, y, void> = F =>
	F.map(constant(undefined));
export { _void as void };

export const flap: <f>(
	F: Functor<f>,
) => <a, b, y, x, w>(ff: Type1<f, w, x, y, (_: a) => b>) => (x: a) => Type1<f, w, x, y, b> = F =>
	compose<any, any, any>(F.map)(thrush);
