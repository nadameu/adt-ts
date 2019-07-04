import { Generic1, Type, Generic2 } from '../Generic';
import { Apply, Apply2 } from './Apply';

export interface Applicative<f extends Generic1> extends Apply<f> {
	pure: <a>(x: a) => Type<f, a>;
}

export interface Applicative2<f extends Generic2> extends Apply2<f> {
	pure: <b, a = never>(x: b) => Type<f, a, b>;
}

interface Helpers<f extends Generic1> {
	liftA1: <a, b>(f: (_: a) => b) => (fa: Type<f, a>) => Type<f, b>;
	when: (cond: boolean) => (m: Type<f, void>) => Type<f, void>;
	unless: (cond: boolean) => (m: Type<f, void>) => Type<f, void>;
}
interface Helpers2<f extends Generic2> {
	liftA1: <b, c>(f: (_: b) => c) => <a>(fa: Type<f, a, b>) => Type<f, a, c>;
	when: (cond: boolean) => <a>(m: Type<f, a, void>) => Type<f, a, void>;
	unless: (cond: boolean) => <a>(m: Type<f, a, void>) => Type<f, a, void>;
}
interface Helper<k extends keyof Helpers<Generic1>> {
	<f extends Generic1>(applicative: Applicative<f>): Helpers<f>[k];
	<f extends Generic2>(applicative: Applicative2<f>): Helpers2<f>[k];
}

export const liftA1: Helper<'liftA1'> = <f extends Generic1>({ apply, pure }: Applicative<f>) => <
	a,
	b
>(
	f: (_: a) => b,
): ((fa: Type<f, a>) => Type<f, b>) => /*@__PURE__*/ apply(pure(f));

export const when: Helper<'when'> = <f extends Generic1>(applicative: Applicative<f>) => (
	cond: boolean,
) => (m: Type<f, void>): Type<f, void> => (cond ? m : applicative.pure(undefined));

export const unless: Helper<'unless'> = <f extends Generic1>(applicative: Applicative<f>) => (
	cond: boolean,
) => (m: Type<f, void>): Type<f, void> => (cond ? applicative.pure(undefined) : m);
