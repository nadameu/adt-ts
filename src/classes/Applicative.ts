import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Apply1, Apply2 } from './Apply';

export interface Applicative1<f extends Prop1> extends Apply1<f> {
	pure: <a>(value: a) => Type1<f, a>;
}
export interface Applicative2<f extends Prop2> extends Apply2<f> {
	pure: <b, a = never>(value: b) => Type2<f, a, b>;
}

interface Derived1<f extends Prop1> extends Applicative1<f> {
	'when/unless': (p: boolean) => (fa: Type1<f, void>) => Type1<f, void>;
}
interface Derived2<f extends Prop2> extends Applicative2<f> {
	'when/unless': (p: boolean) => <a>(fa: Type2<f, a, void>) => Type2<f, a, void>;
}
type Derive<k extends keyof Applicative1<never>, r extends keyof Derived1<never>> = <
	f extends Prop1
>(
	A: Pick<Applicative1<f>, k>,
) => Derived1<f>[r];
interface DeriveAll<k extends keyof Applicative1<never>, r extends keyof Derived1<never>> {
	<f extends Prop2>(A: Pick<Applicative2<f>, k>): Derived2<f>[r];
	<f extends Prop1>(A: Pick<Applicative1<f>, k>): Derived1<f>[r];
}

export const liftA1: DeriveAll<'apply' | 'pure', 'map'> = (({ apply, pure }) => f =>
	apply(pure(f))) as Derive<'apply' | 'pure', 'map'>;

export const when: DeriveAll<'pure', 'when/unless'> = (({ pure }) => p => fa =>
	p ? fa : pure(undefined)) as Derive<'pure', 'when/unless'>;

export const unless: DeriveAll<'pure', 'when/unless'> = (({ pure }) => p => fa =>
	p ? pure(undefined) : fa) as Derive<'pure', 'when/unless'>;
