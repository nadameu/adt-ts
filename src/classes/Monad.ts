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

type Derive<r extends keyof Derived1<never>> = <f extends Prop1>(M: Monad1<f>) => Derived1<f>[r];
interface DeriveAll<r extends keyof Derived1<never>> {
	<f extends Prop2>(M: Monad2<f>): Derived2<f>[r];
	<f extends Prop1>(M: Monad1<f>): Derived1<f>[r];
}

export const liftM1: DeriveAll<'map'> = (M => f => bindFlipped(M)(x => M.pure(f(x)))) as (Derive<
	'map'
>);

export const ap: DeriveAll<'apply'> = (M => ff =>
	bindFlipped(M)(x => M.bind(ff)(f => M.pure(f(x))))) as Derive<'apply'>;

export const whenM: DeriveAll<'whenM/unlessM'> = (M => fp => fa =>
	M.bind(fp)(p => when(M)(p)(fa))) as Derive<'whenM/unlessM'>;

export const unlessM: DeriveAll<'whenM/unlessM'> = (M => fp => fa =>
	M.bind(fp)(p => unless(M)(p)(fa))) as Derive<'whenM/unlessM'>;
