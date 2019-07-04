import { Generic1, Type } from '../Generic';
import { Applicative, unless, when } from './Applicative';
import { Bind } from './Bind';

export interface Monad<m extends Generic1> extends Applicative<m>, Bind<m> {}

export const liftM1 = <m extends Generic1>({ bind, pure }: Monad<m>) => <a, b>(f: (_: a) => b) => (
	ma: Type<m, a>,
): Type<m, b> => bind(ma)(x => pure(f(x)));

export const ap = <m extends Generic1>({ bind, pure }: Monad<m>) => <a, b>(
	ff: Type<m, (_: a) => b>,
) => (fa: Type<m, a>): Type<m, b> => bind(ff)(f => bind(fa)(a => pure(f(a))));

export const whenM = <m extends Generic1>(monad: Monad<m>) => (cond: Type<m, boolean>) => (
	m: Type<m, void>,
): Type<m, void> => monad.bind(cond)(c => when(monad)(c)(m));

export const unlessM = <m extends Generic1>(monad: Monad<m>) => (cond: Type<m, boolean>) => (
	m: Type<m, void>,
): Type<m, void> => monad.bind(cond)(c => unless(monad)(c)(m));
