import { Functor, Functor2, mapFlipped } from '../../../Data/Functor';
import { Monoid } from '../../../Data/Monoid';
import { Semigroup } from '../../../Data/Semigroup';
import { Generic1, Generic2, Type } from '../../../Generic';
import { Applicative } from '../../Applicative';
import { Apply, lift2 } from '../../Apply';
import { Bind } from '../../Bind';
import { Monad } from '../../Monad';
import { MonadTell, MonadWriter } from './Class';

declare const WriterTSymbol: unique symbol;
export type WriterT<w, m extends Generic1, a> = Type<m, [a, w]> & { [WriterTSymbol]: 'WriterT' };
export const WriterT = <w, m extends Generic1, a>(m: Type<m, [a, w]>) => m as WriterT<w, m, a>;

export interface GenericWriterT<m extends Generic1> extends Generic2 {
	type: WriterT<this['a'], m, this['b']>;
}
export interface GenericWriterT1<w, m extends Generic1> extends Generic1 {
	type: WriterT<w, m, this['a']>;
}

export const runWriterT = <w, m extends Generic1, a>(x: WriterT<w, m, a>): Type<m, [a, w]> => x;

export const execWriterT = <m extends Generic1>(
	functor: Functor<m>,
): (<w, a>(m: WriterT<w, m, a>) => Type<m, w>) =>
	/*@__PURE__*/ functor.map<[any, any], any>(([_, w]) => w);

export const mapWriterT = <w1, w2, m1 extends Generic1, m2 extends Generic1, a, b>(
	f: (_: Type<m1, [a, w1]>) => Type<m2, [b, w2]>,
) => (m: WriterT<w1, m1, a>): WriterT<w2, m2, b> => WriterT(f(m));

export const makeFunctorWriterT = <m extends Generic1>(
	functor: Functor<m>,
): Functor2<GenericWriterT<m>> => ({
	map: f => mapWriterT(functor.map(([a, w]) => [f(a), w])),
});

export const makeApplyWriterT = <w, m extends Generic1>(
	semigroup: Semigroup<w>,
	apply: Apply<m>,
): Apply<GenericWriterT1<w, m>> => ({
	...makeFunctorWriterT(apply),
	apply: ff => fv =>
		WriterT(
			lift2(apply)<[(_: any) => any, w], [any, w], [any, w]>(([f, w1]) => ([v, w2]) => [
				f(v),
				semigroup.append(w1)(w2),
			])(ff)(fv),
		),
});

export const makeApplicativeWriterT = <w, m extends Generic1>(
	monoid: Monoid<w>,
	applicative: Applicative<m>,
): Applicative<GenericWriterT1<w, m>> => ({
	...makeApplyWriterT(monoid, applicative),
	pure: x => WriterT(applicative.pure([x, monoid.mempty()])),
});

export const makeBindWriterT = <w, m extends Generic1>(
	semigroup: Semigroup<w>,
	bind: Bind<m>,
): Bind<GenericWriterT1<w, m>> => ({
	...makeApplyWriterT(semigroup, bind),
	bind: ma => f =>
		WriterT(
			bind.bind(runWriterT(ma))(([a, w1]) =>
				mapFlipped(bind)(runWriterT(f(a)))(([b, w2]) => [b, semigroup.append(w1)(w2)]),
			),
		),
});

export const makeMonadWriterT = <w, m extends Generic1>(
	monoid: Monoid<w>,
	monad: Monad<m>,
): Monad<GenericWriterT1<w, m>> => ({
	...makeApplicativeWriterT(monoid, monad),
	...makeBindWriterT(monoid, monad),
});

export const makeMonadTellWriterT = <w, m extends Generic1>(
	monoid: Monoid<w>,
	monad: Monad<m>,
): MonadTell<w, GenericWriterT1<w, m>> => ({
	...makeMonadWriterT(monoid, monad),
	tell: x => WriterT(monad.pure([undefined, x])),
});

export const makeMonadWriterWriterT = <w, m extends Generic1>(
	monoid: Monoid<w>,
	monad: Monad<m>,
): MonadWriter<w, GenericWriterT1<w, m>> => ({
	...makeMonadTellWriterT(monoid, monad),
	listen: m => WriterT(monad.bind(runWriterT(m))(([a, w]) => monad.pure([[a, w], w]))),
	pass: m => WriterT(monad.bind(runWriterT(m))(([[a, f], w]) => monad.pure([a, f(w)]))),
});
