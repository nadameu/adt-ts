import { Prop1, Prop2, Type1, Type2, AnyFn2 } from '../Types';
import { Alternative1, Alternative2 } from './Alternative';
import { Monad1, Monad2 } from './Monad';

export interface MonadZero1<f extends Prop1> extends Alternative1<f>, Monad1<f> {}
export interface MonadZero2<f extends Prop2> extends Alternative2<f>, Monad2<f> {}

export const guard: {
	<f extends Prop2>(M: Pick<MonadZero2<f>, 'empty' | 'pure'>): <a = never>(
		p: boolean,
	) => Type2<f, a, void>;
	<f extends Prop1>(M: Pick<MonadZero1<f>, 'empty' | 'pure'>): (p: boolean) => Type1<f, void>;
} = (({ empty, pure }) => p => (p ? pure(undefined) : empty())) as AnyFn2;
