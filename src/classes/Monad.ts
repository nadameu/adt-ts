import { compose, flip } from '../combinators';
import { Type1 } from '../Types';
import { Applicative, unless, when } from './Applicative';
import { Bind } from './Bind';

export interface Monad<f> extends Applicative<f>, Bind<f> {}

export const liftM1: <f>(M: Pick<Monad<f>, 'bind' | 'pure'>) => Monad<f>['map'] = M =>
	compose<any, any>(flip<any, any, any>(M.bind))(compose(M.pure));

export const ap: <f>(M: Pick<Monad<f>, 'bind' | 'pure'>) => Monad<f>['apply'] = M => ff => fa =>
	M.bind(ff)(f => M.bind(fa)(x => M.pure(f(x))));

export const whenM: <f>(
	A: Pick<Monad<f>, 'bind' | 'pure'>,
) => <y, x, w>(
	fa: Type1<f, w, x, y, boolean>,
) => (fa: Type1<f, w, x, y, void>) => Type1<f, w, x, y, void> = M => fp => fa =>
	M.bind(fp)(flip<any, any, any>(when(M))(fa));

export const unlessM: <f>(
	A: Pick<Monad<f>, 'bind' | 'pure'>,
) => <y, x, w>(
	fa: Type1<f, w, x, y, boolean>,
) => (fa: Type1<f, w, x, y, void>) => Type1<f, w, x, y, void> = M => fp => fa =>
	M.bind(fp)(p => unless(M)(p)(fa));
