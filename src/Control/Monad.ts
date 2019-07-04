import { Generic1, Generic2, Type } from '../Generic';
import { Applicative, Applicative2, unless, when } from './Applicative';
import { Bind, Bind2 } from './Bind';

export interface Monad<m extends Generic1> extends Applicative<m>, Bind<m> {}

export interface Monad2<m extends Generic2> extends Applicative2<m>, Bind2<m> {}

interface Helpers<m extends Generic1> {
	liftM1: <a, b>(f: (_: a) => b) => (ma: Type<m, a>) => Type<m, b>;
	ap: <a, b>(ff: Type<m, (_: a) => b>) => (fa: Type<m, a>) => Type<m, b>;
	whenM: (cond: Type<m, boolean>) => (m: Type<m, void>) => Type<m, void>;
	unlessM: (cond: Type<m, boolean>) => (m: Type<m, void>) => Type<m, void>;
}
interface Helpers2<m extends Generic2> {
	liftM1: <b, c>(f: (_: b) => c) => <a>(ma: Type<m, a, b>) => Type<m, a, c>;
	ap: <a, b, c>(ff: Type<m, a, (_: b) => c>) => (fa: Type<m, a, b>) => Type<m, a, c>;
	whenM: <a>(cond: Type<m, a, boolean>) => (m: Type<m, a, void>) => Type<m, a, void>;
	unlessM: <a>(cond: Type<m, a, boolean>) => (m: Type<m, a, void>) => Type<m, a, void>;
}
interface Helper<k extends keyof Helpers<Generic1>> {
	<m extends Generic1>(monad: Monad<m>): Helpers<m>[k];
	<m extends Generic2>(monad: Monad2<m>): Helpers2<m>[k];
}

export const liftM1: Helper<'liftM1'> = <m extends Generic1>({ bind, pure }: Monad<m>) => <a, b>(
	f: (_: a) => b,
) => (ma: Type<m, a>): Type<m, b> => bind(ma)(x => pure(f(x)));

export const ap: Helper<'ap'> = <m extends Generic1>({ bind, pure }: Monad<m>) => <a, b>(
	ff: Type<m, (_: a) => b>,
) => (fa: Type<m, a>): Type<m, b> => bind(ff)(f => bind(fa)(a => pure(f(a))));

export const whenM: Helper<'whenM'> = <m extends Generic1>(monad: Monad<m>) => (
	cond: Type<m, boolean>,
) => (m: Type<m, void>): Type<m, void> => monad.bind(cond)(c => when(monad)(c)(m));

export const unlessM: Helper<'unlessM'> = <m extends Generic1>(monad: Monad<m>) => (
	cond: Type<m, boolean>,
) => (m: Type<m, void>): Type<m, void> => monad.bind(cond)(c => unless(monad)(c)(m));
