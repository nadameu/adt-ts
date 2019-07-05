import { Generic1, Generic2, Type } from '../Generic';
import { Alternative, Alternative2 } from './Alternative';
import { Monad, Monad2 } from './Monad';

export interface MonadZero<m extends Generic1> extends Monad<m>, Alternative<m> {}

export interface MonadZero2<m extends Generic2> extends Monad2<m>, Alternative2<m> {}

interface Helpers<m extends Generic1> {
	guard: (cond: boolean) => Type<m, void>;
}
interface Helpers2<m extends Generic2> {
	guard: <a = never>(cond: boolean) => Type<m, a, void>;
}
interface Helper<k extends keyof Helpers<Generic1>> {
	<m extends Generic1>(monadZero: MonadZero<m>): Helpers<m>[k];
	<m extends Generic2>(monadZero: MonadZero2<m>): Helpers2<m>[k];
}

export const guard: Helper<'guard'> = <m extends Generic1>(monadZero: MonadZero<m>) => (
	cond: boolean,
): Type<m, void> => (cond ? monadZero.pure(undefined) : monadZero.empty());
