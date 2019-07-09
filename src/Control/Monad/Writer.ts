import { Functor2 } from '../../Data/Functor';
import { GenericIdentity } from '../../Data/Identity';
import { Monoid } from '../../Data/Monoid';
import { Semigroup } from '../../Data/Semigroup';
import { Generic1, Generic2 } from '../../Generic';
import { Applicative } from '../Applicative';
import { Apply } from '../Apply';
import { Bind } from '../Bind';
import { Monad } from '../Monad';
import { MonadTell, MonadWriter } from './Writer/Class';
import { WriterT } from './Writer/Trans';

declare const WriterSymbol: unique symbol;
export type Writer<w, a> = WriterT<w, GenericIdentity, a> & { [WriterSymbol]: 'Writer' };
export const Writer = <w, a>(tuple: [a, w]) => tuple as Writer<w, a>;

export interface GenericWriter extends Generic2 {
	type: Writer<this['a'], this['b']>;
}

export interface GenericWriter1<w> extends Generic1 {
	type: Writer<w, this['a']>;
}

export const functorWriter: Functor2<GenericWriter> = {
	map: f => ([a, w]) => Writer([f(a), w]),
};

export const makeApplyWriter = <w>(semigroup: Semigroup<w>): Apply<GenericWriter1<w>> => ({
	...functorWriter,
	apply: ([f, w1]) => ([v, w2]) => Writer([f(v), semigroup.append(w1)(w2)]),
});

export const makeApplicativeWriter = <w>(monoid: Monoid<w>): Applicative<GenericWriter1<w>> => ({
	...makeApplyWriter(monoid),
	pure: x => Writer([x, monoid.mempty()]),
});

export const makeBindWriter = <w>(semigroup: Semigroup<w>): Bind<GenericWriter1<w>> => ({
	...makeApplyWriter(semigroup),
	bind: ([a, w1]) => f => {
		const [b, w2] = f(a);
		return Writer([b, semigroup.append(w1)(w2)]);
	},
});

export const makeMonadWriter = <w>(monoid: Monoid<w>): Monad<GenericWriter1<w>> => ({
	...makeApplicativeWriter(monoid),
	...makeBindWriter(monoid),
});

export const makeMonadTellWriter = <w>(monoid: Monoid<w>): MonadTell<w, GenericWriter1<w>> => ({
	...makeMonadWriter(monoid),
	tell: x => Writer([undefined, x]),
});

export const makeMonadWriterWriter = <w>(monoid: Monoid<w>): MonadWriter<w, GenericWriter1<w>> => ({
	...makeMonadTellWriter(monoid),
	listen: m => {
		const [a, w] = m;
		return Writer([[a, w], w]);
	},
	pass: m => {
		const [[a, f], w] = m;
		return Writer([a, f(w)]);
	},
});
