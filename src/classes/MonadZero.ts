import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Alternative1, Alternative2 } from './Alternative';
import { Monad1, Monad2 } from './Monad';

export interface MonadZero1<f extends Prop1> extends Alternative1<f>, Monad1<f> {}
export interface MonadZero2<f extends Prop2> extends Alternative2<f>, Monad2<f> {}

interface Derived1<f extends Prop1> extends MonadZero1<f> {
	guard: (p: boolean) => Type1<f, void>;
}
interface Derived2<f extends Prop2> extends MonadZero2<f> {
	guard: <a = never>(p: boolean) => Type2<f, a, void>;
}

type Derive<k extends keyof MonadZero1<never>, r extends keyof Derived1<never>> = <f extends Prop1>(
	M: Pick<MonadZero1<f>, k>,
) => Derived1<f>[r];
interface DeriveAll<k extends keyof MonadZero1<never>, r extends keyof Derived1<never>> {
	<f extends Prop2>(M: Pick<MonadZero2<f>, k>): Derived2<f>[r];
	<f extends Prop1>(M: Pick<MonadZero1<f>, k>): Derived1<f>[r];
}

export const guard: DeriveAll<'empty' | 'pure', 'guard'> = (({ empty, pure }) => p =>
	p ? pure(undefined) : empty()) as Derive<'empty' | 'pure', 'guard'>;
