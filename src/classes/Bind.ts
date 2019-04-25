import { identity } from '../combinators';
import { Prop1, Type } from '../Types';
import { Apply } from './Apply';

export interface Bind<f extends Prop1> extends Apply<f> {
	bind: <a, y, x, w, v>(
		fa: Type<f, v, w, x, y, a>,
	) => <b>(f: (_: a) => Type<f, v, w, x, y, b>) => Type<f, v, w, x, y, b>;
}

export const bindFlipped: <f extends Prop1>(
	B: Pick<Bind<f>, 'bind'>,
) => <a, b, y, x, w, v>(
	f: (_: a) => Type<f, v, w, x, y, b>,
) => (fa: Type<f, v, w, x, y, a>) => Type<f, v, w, x, y, b> = ({ bind }) => f => fa => bind(fa)(f);

export const join: <f extends Prop1>(
	B: Pick<Bind<f>, 'bind'>,
) => <a, y, x, w, v>(fa: Type<f, v, w, x, y, Type<f, v, w, x, y, a>>) => Type<f, v, w, x, y, a> = ({
	bind,
}) => bindFlipped({ bind })(identity);

export const composeKleisli: <f extends Prop1>(
	B: Pick<Bind<f>, 'bind'>,
) => <a, b, y, x, w, v>(
	f: (_: a) => Type<f, v, w, x, y, b>,
) => <c>(g: (_: b) => Type<f, v, w, x, y, c>) => (_: a) => Type<f, v, w, x, y, c> = ({
	bind,
}) => f => g => x => bind(f(x))(g);

export const composeKleisliFlipped: <f extends Prop1>(
	B: Pick<Bind<f>, 'bind'>,
) => <b, c, y, x, w, v>(
	f: (_: b) => Type<f, v, w, x, y, c>,
) => <a>(g: (_: a) => Type<f, v, w, x, y, b>) => (_: a) => Type<f, v, w, x, y, c> = ({
	bind,
}) => f => g => x => bind(g(x))(f);

export const ifM: <f extends Prop1>(
	B: Pick<Bind<f>, 'bind'>,
) => <y, x, w, v>(
	cond: Type<f, v, w, x, y, boolean>,
) => <a>(
	whenTrue: Type<f, v, w, x, y, a>,
) => (whenFalse: Type<f, v, w, x, y, a>) => Type<f, v, w, x, y, a> = ({
	bind,
}) => cond => whenTrue => whenFalse => bind(cond)(x => (x ? whenTrue : whenFalse));
