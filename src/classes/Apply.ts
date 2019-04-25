import { B1, B2, constant, flip, identity, apply } from '../combinators';
import { Prop1, Type } from '../Types';
import { Functor } from './Functor';

export interface Apply<f extends Prop1> extends Functor<f> {
	apply: <a, b, y, x, w, v>(
		ff: Type<f, v, w, x, y, (_: a) => b>,
	) => (fa: Type<f, v, w, x, y, a>) => Type<f, v, w, x, y, b>;
}

export const applyFlipped: <f extends Prop1>(
	A: Pick<Apply<f>, 'apply'>,
) => <a, y, x, w, v>(
	fa: Type<f, v, w, x, y, a>,
) => <b>(ff: Type<f, v, w, x, y, (_: a) => b>) => Type<f, v, w, x, y, b> = ({
	apply,
}) => fa => ff => apply(ff)(fa);

export const applyFirst: <f extends Prop1>(
	A: Apply<f>,
) => <a, y, x, w, v>(
	fa: Type<f, v, w, x, y, a>,
) => (fb: Type<f, v, w, x, y, any>) => Type<f, v, w, x, y, a> = ({ apply, map }) =>
	lift2({ apply, map })(constant);

export const applySecond: <f extends Prop1>(
	A: Apply<f>,
) => <y, x, w, v>(
	fa: Type<f, v, w, x, y, any>,
) => <a>(fb: Type<f, v, w, x, y, a>) => Type<f, v, w, x, y, a> = ({ apply, map }) =>
	lift2({ apply, map })(constant(identity));

export const lift2: <f extends Prop1>(
	A: Apply<f>,
) => <a, b, c>(
	f: (_: a) => (_: b) => c,
) => <y, x, w, v>(
	fa: Type<f, v, w, x, y, a>,
) => (fb: Type<f, v, w, x, y, b>) => Type<f, v, w, x, y, c> = ({ apply, map }) => f => fa =>
	apply(map(f)(fa));

export const lift3: <f extends Prop1>(
	A: Apply<f>,
) => <a, b, c, d>(
	f: (_: a) => (_: b) => (_: c) => d,
) => <y, x, w, v>(
	fa: Type<f, v, w, x, y, a>,
) => (fb: Type<f, v, w, x, y, b>) => (fc: Type<f, v, w, x, y, c>) => Type<f, v, w, x, y, d> = ({
	apply,
	map,
}) => f => fa => fb => apply(lift2({ apply, map })(f)(fa)(fb));

export const lift4: <f extends Prop1>(
	A: Apply<f>,
) => <a, b, c, d, e>(
	f: (_: a) => (_: b) => (_: c) => (_: d) => e,
) => <y, x, w, v>(
	fa: Type<f, v, w, x, y, a>,
) => (
	fb: Type<f, v, w, x, y, b>,
) => (fc: Type<f, v, w, x, y, c>) => (fd: Type<f, v, w, x, y, d>) => Type<f, v, w, x, y, e> = ({
	apply,
	map,
}) => f => fa => fb => fc => apply(lift3({ apply, map })(f)(fa)(fb)(fc));

export const lift5: <f extends Prop1>(
	A: Apply<f>,
) => <a, b, c, d, e, g>(
	f: (_: a) => (_: b) => (_: c) => (_: d) => (_: e) => g,
) => <y, x, w, v>(
	fa: Type<f, v, w, x, y, a>,
) => (
	fb: Type<f, v, w, x, y, b>,
) => (
	fc: Type<f, v, w, x, y, c>,
) => (fd: Type<f, v, w, x, y, d>) => (fe: Type<f, v, w, x, y, e>) => Type<f, v, w, x, y, g> = ({
	apply,
	map,
}) => f => fa => fb => fc => fd => apply(lift4({ apply, map })(f)(fa)(fb)(fc)(fd));
