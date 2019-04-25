import { constant, thrush } from '../combinators';
import { Prop1, Type } from '../Types';

export interface Functor<f extends Prop1> {
	map: <a, b>(f: (_: a) => b) => <y, x, w, v>(fa: Type<f, v, w, x, y, a>) => Type<f, v, w, x, y, b>;
}

export const mapFlipped: <f extends Prop1>(
	F: Functor<f>,
) => <a, y, x, w, v>(
	fa: Type<f, v, w, x, y, a>,
) => <b>(f: (_: a) => b) => Type<f, v, w, x, y, b> = ({ map }) => fa => f => map(f)(fa);

export const voidLeft: <f extends Prop1>(
	F: Functor<f>,
) => <y, x, w, v>(fa: Type<f, v, w, x, y, any>) => <b>(y: b) => Type<f, v, w, x, y, b> = ({
	map,
}) => fa => y => map(constant(y))(fa);

export const voidRight: <f extends Prop1>(
	F: Functor<f>,
) => <a>(x: a) => <y, x, w, v>(fb: Type<f, v, w, x, y, any>) => Type<f, v, w, x, y, a> = ({
	map,
}) => x => map(constant(x));

const _void: <f extends Prop1>(
	F: Functor<f>,
) => <y, x, w, v>(fa: Type<f, v, w, x, y, any>) => Type<f, v, w, x, y, void> = ({ map }) =>
	map(constant(undefined));
export { _void as void };

export const flap: <f extends Prop1>(
	F: Functor<f>,
) => <a, b, y, x, w, v>(
	ff: Type<f, v, w, x, y, (_: a) => b>,
) => (x: a) => Type<f, v, w, x, y, b> = ({ map }) => ff => x => mapFlipped({ map })(ff)(thrush(x));
