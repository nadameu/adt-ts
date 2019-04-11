import { Type1 } from '../Types';
import { Apply } from './Apply';

export interface Applicative<f> extends Apply<f> {
	pure: <a, y = never, x = never, w = never>(value: a) => Type1<f, w, x, y, a>;
}

export const pure: <f>(A: Applicative<f>) => Applicative<f>['pure'] = A => A.pure;

export const liftA1: <f>(
	A: Applicative<f>,
) => <a, b>(
	f: (_: a) => b,
) => <y, x, w>(fa: Type1<f, w, x, y, a>) => Type1<f, w, x, y, b> = A => f => A.ap(A.pure(f));
