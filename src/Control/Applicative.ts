import { Generic1, Type } from '../Generic';
import { Apply } from './Apply';

export interface Applicative<f extends Generic1> extends Apply<f> {
	pure: <a>(x: a) => Type<f, a>;
}

export const liftA1 = <f extends Generic1>({ apply, pure }: Applicative<f>) => <a, b>(
	f: (_: a) => b,
): ((fa: Type<f, a>) => Type<f, b>) => /*@__PURE__*/ apply(pure(f));

export const when = <f extends Generic1>(applicative: Applicative<f>) => (cond: boolean) => (
	m: Type<f, void>,
): Type<f, void> => (cond ? m : applicative.pure(undefined));

export const unless = <f extends Generic1>(applicative: Applicative<f>) => (cond: boolean) => (
	m: Type<f, void>,
): Type<f, void> => (cond ? applicative.pure(undefined) : m);
