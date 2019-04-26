import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Applicative1, Applicative2, unless, when } from './Applicative';
import { Bind1, Bind2, bindFlipped } from './Bind';

export interface Monad1<f extends Prop1> extends Applicative1<f>, Bind1<f> {}
export interface Monad2<f extends Prop2> extends Applicative2<f>, Bind2<f> {}

export const liftM1: {
	<f extends Prop2>(M: Pick<Monad2<f>, 'bind' | 'pure'>): Monad2<f>['map'];
	<f extends Prop1>(M: Pick<Monad1<f>, 'bind' | 'pure'>): Monad1<f>['map'];
} = (({ bind, pure }) => f => bindFlipped({ bind })(x => pure(f(x)))) as (<f extends Prop1>(
	M: Pick<Monad1<f>, 'bind' | 'pure'>,
) => Monad1<f>['map']);

export const ap: {
	<f extends Prop2>(M: Pick<Monad2<f>, 'bind' | 'pure'>): Monad2<f>['apply'];
	<f extends Prop1>(M: Pick<Monad1<f>, 'bind' | 'pure'>): Monad1<f>['apply'];
} = (({ bind, pure }) => ff => fa => bind(ff)(f => bind(fa)(x => pure(f(x))))) as <f extends Prop1>(
	M: Pick<Monad1<f>, 'bind' | 'pure'>,
) => Monad1<f>['apply'];

export const whenM: {
	<f extends Prop2>(A: Pick<Monad2<f>, 'bind' | 'pure'>): <a>(
		fp: Type2<f, a, boolean>,
	) => (fa: Type2<f, a, void>) => Type2<f, a, void>;
	<f extends Prop1>(A: Pick<Monad1<f>, 'bind' | 'pure'>): (
		fp: Type1<f, boolean>,
	) => (fa: Type1<f, void>) => Type1<f, void>;
} = (({ bind, pure }) => fp => fa => bind(fp)(p => when({ pure })(p)(fa))) as <f extends Prop1>(
	A: Pick<Monad1<f>, 'bind' | 'pure'>,
) => (fp: Type1<f, boolean>) => (fa: Type1<f, void>) => Type1<f, void>;

export const unlessM: {
	<f extends Prop2>(A: Pick<Monad2<f>, 'bind' | 'pure'>): <a>(
		fp: Type2<f, a, boolean>,
	) => (fa: Type2<f, a, void>) => Type2<f, a, void>;
	<f extends Prop1>(A: Pick<Monad1<f>, 'bind' | 'pure'>): (
		fp: Type1<f, boolean>,
	) => (fa: Type1<f, void>) => Type1<f, void>;
} = (({ bind, pure }) => fp => fa => bind(fp)(p => unless({ pure })(p)(fa))) as <f extends Prop1>(
	A: Pick<Monad1<f>, 'bind' | 'pure'>,
) => (fp: Type1<f, boolean>) => (fa: Type1<f, void>) => Type1<f, void>;
