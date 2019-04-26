import { Prop1, Prop2, Type1, Type2, AnyFn2, AnyFn3 } from '../Types';
import { Apply1, Apply2 } from './Apply';

export interface Applicative1<f extends Prop1> extends Apply1<f> {
	pure: <a>(value: a) => Type1<f, a>;
}
export interface Applicative2<f extends Prop2> extends Apply2<f> {
	pure: <b, a = never>(value: b) => Type2<f, a, b>;
}

export const liftA1: {
	<f extends Prop2>(A: Pick<Applicative2<f>, 'apply' | 'pure'>): Applicative2<f>['map'];
	<f extends Prop1>(A: Pick<Applicative1<f>, 'apply' | 'pure'>): Applicative1<f>['map'];
} = (({ apply, pure }) => f => apply(pure(f))) as AnyFn2;

export const when: {
	<f extends Prop2>(A: Pick<Applicative2<f>, 'pure'>): (
		p: boolean,
	) => <a>(fa: Type2<f, a, void>) => Type2<f, a, void>;
	<f extends Prop1>(A: Pick<Applicative1<f>, 'pure'>): (
		p: boolean,
	) => (fa: Type1<f, void>) => Type1<f, void>;
} = (({ pure }) => p => fa => (p ? fa : pure(undefined))) as AnyFn3;

export const unless: {
	<f extends Prop2>(A: Pick<Applicative2<f>, 'pure'>): (
		p: boolean,
	) => <a>(fa: Type2<f, a, void>) => Type2<f, a, void>;
	<f extends Prop1>(A: Pick<Applicative1<f>, 'pure'>): (
		p: boolean,
	) => (fa: Type1<f, void>) => Type1<f, void>;
} = (({ pure }) => p => fa => (p ? pure(undefined) : fa)) as AnyFn3;
