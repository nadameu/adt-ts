import { flip, identity } from '../instances/Fn';
import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Functor1, Functor2 } from './Functor';

export interface Extend1<f extends Prop1> extends Functor1<f> {
	extend: <a, b>(f: (_: Type1<f, a>) => b) => (fa: Type1<f, a>) => Type1<f, b>;
}

export interface Extend2<f extends Prop2> extends Functor2<f> {
	extend: <a, b, c>(f: (_: Type2<f, a, b>) => c) => (fa: Type2<f, a, b>) => Type2<f, a, c>;
}

interface Derived1<f extends Prop1> extends Extend1<f> {
	extendFlipped: <a>(fa: Type1<f, a>) => <b>(f: (_: Type1<f, a>) => b) => Type1<f, b>;
	composeCoKleisli: <a, b>(
		f: (_: Type1<f, a>) => b,
	) => <c>(g: (_: Type1<f, b>) => c) => (_: Type1<f, a>) => c;
	composeCoKleisliFlipped: <b, c>(
		f: (_: Type1<f, b>) => c,
	) => <a>(g: (_: Type1<f, a>) => b) => (_: Type1<f, a>) => c;
	duplicate: <a>(fa: Type1<f, a>) => Type1<f, Type1<f, a>>;
}
interface Derived2<f extends Prop2> extends Extend2<f> {
	extendFlipped: <a, b>(fa: Type2<f, a, b>) => <c>(f: (_: Type2<f, a, b>) => c) => Type2<f, a, c>;
	composeCoKleisli: <a, b, c>(
		f: (_: Type2<f, a, b>) => c,
	) => <d>(g: (_: Type2<f, a, c>) => d) => (_: Type2<f, a, b>) => d;
	composeCoKleisliFlipped: <a, c, d>(
		f: (_: Type2<f, a, c>) => d,
	) => <b>(g: (_: Type2<f, a, b>) => c) => (_: Type2<f, a, b>) => d;
	duplicate: <a, b>(fa: Type2<f, a, b>) => Type2<f, a, Type2<f, a, b>>;
}

type Derive<k extends keyof Extend1<never>, r extends keyof Derived1<never>> = <f extends Prop1>(
	E: Pick<Extend1<f>, k>,
) => Derived1<f>[r];
interface DeriveAll<k extends keyof Extend1<never>, r extends keyof Derived1<never>> {
	<f extends Prop2>(E: Pick<Extend2<f>, k>): Derived2<f>[r];
	<f extends Prop1>(E: Pick<Extend1<f>, k>): Derived1<f>[r];
}

export const extendFlipped: DeriveAll<'extend', 'extendFlipped'> = (({ extend }) =>
	flip(extend)) as Derive<'extend', 'extendFlipped'>;

export const composeCoKleisli: DeriveAll<'extend', 'composeCoKleisli'> = (({
	extend,
}) => f => g => fa => g(extend(f)(fa))) as Derive<'extend', 'composeCoKleisli'>;

export const composeCoKleisliFlipped: DeriveAll<'extend', 'composeCoKleisliFlipped'> = (({
	extend,
}) => f => g => fa => f(extend(g)(fa))) as Derive<'extend', 'composeCoKleisliFlipped'>;

export const duplicate: DeriveAll<'extend', 'duplicate'> = (({ extend }) =>
	extend(identity)) as Derive<'extend', 'duplicate'>;
