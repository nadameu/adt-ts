import { Type1 } from '../Types';
import { Apply } from './Apply';
import { Functor } from './Functor';

export interface Applicative<f> extends Apply<f> {
	pure: <a, y = never, x = never, w = never>(value: a) => Type1<f, w, x, y, a>;
}

export const pure: <f>(A: Applicative<f>) => Applicative<f>['pure'] = A => A.pure;

export const liftA1: <f>(A: Pick<Applicative<f>, 'apply' | 'pure'>) => Functor<f>['map'] = A => f =>
	A.apply(A.pure(f));
