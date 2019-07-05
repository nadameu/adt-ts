import { Generic2, Type } from '../Generic';
import { identity } from './Function';

export interface Bifunctor<f extends Generic2> {
	bimap: <a, b>(f: (_: a) => b) => <c, d>(g: (_: c) => d) => (fx: Type<f, a, c>) => Type<f, b, d>;
}

export const lmap = <f extends Generic2>(bifunctor: Bifunctor<f>) => <a, b>(
	f: (_: a) => b,
): (<c>(fx: Type<f, a, c>) => Type<f, b, c>) => /*@__PURE__*/ bifunctor.bimap(f)(identity);

export const rmap = <f extends Generic2>(
	bifunctor: Bifunctor<f>,
): (<b, c>(f: (_: b) => c) => <a>(fx: Type<f, a, b>) => Type<f, a, c>) =>
	/*@__PURE__*/ bifunctor.bimap(identity);
