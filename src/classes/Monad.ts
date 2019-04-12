import { Type1 } from '../Types';
import { Applicative, unless, when } from './Applicative';
import { Bind } from './Bind';

export interface Monad<f> extends Applicative<f>, Bind<f> {}

export const liftM1: <f>(M: Pick<Monad<f>, 'bind' | 'pure'>) => Monad<f>['map'] = M => f => fa =>
	M.bind(fa)(x => M.pure(f(x)));

export const ap: <f>(M: Pick<Monad<f>, 'bind' | 'pure'>) => Monad<f>['apply'] = M => ff => fa =>
	M.bind(ff)(f => liftM1(M)(f)(fa));

export const whenM: <f>(
	A: Monad<f>,
) => <y, x, w>(
	fa: Type1<f, w, x, y, boolean>,
) => (fa: Type1<f, w, x, y, void>) => Type1<f, w, x, y, void> = M => fp => fa =>
	M.bind(fp)(p => when(M)(p)(fa));

export const unlessM: <f>(
	A: Monad<f>,
) => <y, x, w>(
	fa: Type1<f, w, x, y, boolean>,
) => (fa: Type1<f, w, x, y, void>) => Type1<f, w, x, y, void> = M => fp => fa =>
	M.bind(fp)(p => unless(M)(p)(fa));
