import { Prop2, Type2 } from '../Types';
import { identity } from '../instances/Fn';

export interface Bifunctor2<f extends Prop2> {
	bimap: <a, c>(f: (_: a) => c) => <b, d>(g: (_: b) => d) => (fx: Type2<f, a, b>) => Type2<f, c, d>;
}

export const lmap: <f extends Prop2>(
	B: Bifunctor2<f>,
) => <a, c>(f: (_: a) => c) => <b>(fx: Type2<f, a, b>) => Type2<f, c, b> = ({ bimap }) => f =>
	bimap(f)(identity);

export const rmap: <f extends Prop2>(
	B: Bifunctor2<f>,
) => <b, c>(g: (_: b) => c) => <a>(fx: Type2<f, a, b>) => Type2<f, a, c> = ({ bimap }) =>
	bimap(identity);
