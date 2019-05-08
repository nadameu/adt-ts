import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Applicative1, Applicative2, unless, when } from './Applicative';
import { Bind1, Bind2, bindFlipped } from './Bind';

export interface Monad1<f extends Prop1> extends Applicative1<f>, Bind1<f> {}
export interface Monad2<f extends Prop2> extends Applicative2<f>, Bind2<f> {}

interface Derived1<f extends Prop1> extends Monad1<f> {
	'whenM/unlessM': (fp: Type1<f, boolean>) => (fa: Type1<f, void>) => Type1<f, void>;
}
interface Derived2<f extends Prop2> extends Monad2<f> {
	'whenM/unlessM': <a>(fp: Type2<f, a, boolean>) => (fa: Type2<f, a, void>) => Type2<f, a, void>;
}

type Derive<k extends keyof Monad1<never>, r extends keyof Derived1<never>> = <f extends Prop1>(
	M: Pick<Monad1<f>, k>,
) => Derived1<f>[r];
interface DeriveAll<k extends keyof Monad1<never>, r extends keyof Derived1<never>> {
	<f extends Prop2>(M: Pick<Monad2<f>, k>): Derived2<f>[r];
	<f extends Prop1>(M: Pick<Monad1<f>, k>): Derived1<f>[r];
}

export const liftM1: DeriveAll<'bind' | 'pure', 'map'> = (({ bind, pure }) => f =>
	bindFlipped({ bind })(x => pure(f(x)))) as (Derive<'bind' | 'pure', 'map'>);

export const ap: DeriveAll<'bind' | 'pure', 'apply'> = (({ bind, pure }) => ff =>
	bindFlipped({ bind })(x => bind(ff)(f => pure(f(x))))) as Derive<'bind' | 'pure', 'apply'>;

export const whenM: DeriveAll<'bind' | 'pure', 'whenM/unlessM'> = (({ bind, pure }) => fp => fa =>
	bind(fp)(p => when({ pure })(p)(fa))) as Derive<'bind' | 'pure', 'whenM/unlessM'>;

export const unlessM: DeriveAll<'bind' | 'pure', 'whenM/unlessM'> = (({ bind, pure }) => fp => fa =>
	bind(fp)(p => unless({ pure })(p)(fa))) as Derive<'bind' | 'pure', 'whenM/unlessM'>;
