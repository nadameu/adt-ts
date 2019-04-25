import { compose, flip } from '../combinators';
import { Prop1, Type } from '../Types';
import { Applicative, unless, when } from './Applicative';
import { Bind, bindFlipped } from './Bind';

export interface Monad<f extends Prop1> extends Applicative<f>, Bind<f> {}

export const liftM1: <f extends Prop1>(M: Pick<Monad<f>, 'bind' | 'pure'>) => Monad<f>['map'] = ({
	bind,
	pure,
}) => f => bindFlipped({ bind })(x => pure(f(x)));

export const ap: <f extends Prop1>(M: Pick<Monad<f>, 'bind' | 'pure'>) => Monad<f>['apply'] = ({
	bind,
	pure,
}) => ff => fa => bind(ff)(f => bind(fa)(x => pure(f(x))));

export const whenM: <f extends Prop1>(
	A: Pick<Monad<f>, 'bind' | 'pure'>,
) => <y, x, w, v>(
	fp: Type<f, v, w, x, y, boolean>,
) => (fa: Type<f, v, w, x, y, void>) => Type<f, v, w, x, y, void> = ({ bind, pure }) => fp => fa =>
	bind(fp)(p => when({ pure })(p)(fa));

export const unlessM: <f extends Prop1>(
	A: Pick<Monad<f>, 'bind' | 'pure'>,
) => <y, x, w, v>(
	fp: Type<f, v, w, x, y, boolean>,
) => (fa: Type<f, v, w, x, y, void>) => Type<f, v, w, x, y, void> = ({ bind, pure }) => fp => fa =>
	bind(fp)(p => unless({ pure })(p)(fa));
