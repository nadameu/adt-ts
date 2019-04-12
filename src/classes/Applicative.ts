import { Type1 } from '../Types';
import { Apply } from './Apply';

export interface Applicative<f> extends Apply<f> {
	pure: <a, y = never, x = never, w = never>(value: a) => Type1<f, w, x, y, a>;
}

export const pure: <f>(A: Pick<Applicative<f>, 'pure'>) => Applicative<f>['pure'] = A => A.pure;

export const liftA1: <f>(
	A: Pick<Applicative<f>, 'apply' | 'pure'>,
) => Applicative<f>['map'] = A => f => A.apply(A.pure(f));

export const when: <f>(
	A: Pick<Applicative<f>, 'pure'>,
) => (
	p: boolean,
) => <y, x, w>(fa: Type1<f, w, x, y, void>) => Type1<f, w, x, y, void> = A => p => fa =>
	p ? fa : A.pure(undefined);

export const unless: <f>(
	A: Pick<Applicative<f>, 'pure'>,
) => (
	p: boolean,
) => <y, x, w>(fa: Type1<f, w, x, y, void>) => Type1<f, w, x, y, void> = A => p => fa =>
	p ? A.pure(undefined) : fa;
