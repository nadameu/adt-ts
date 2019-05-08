import { Prop2, Type2 } from '../Types';
import { identity } from '../instances/Fn';

export interface Bifunctor2<f extends Prop2> {
	bimap: <a, c>(f: (_: a) => c) => <b, d>(g: (_: b) => d) => (fx: Type2<f, a, b>) => Type2<f, c, d>;
}

interface Derived2<f extends Prop2> extends Bifunctor2<f> {
	lmap: <a, c>(f: (_: a) => c) => <b>(fx: Type2<f, a, b>) => Type2<f, c, b>;
	rmap: <b, c>(f: (_: b) => c) => <a>(fx: Type2<f, a, b>) => Type2<f, a, c>;
}

type Derive<k extends keyof Bifunctor2<never>, r extends keyof Derived2<never>> = <f extends Prop2>(
	B: Pick<Bifunctor2<f>, k>,
) => Derived2<f>[r];

export const lmap: Derive<'bimap', 'lmap'> = ({ bimap }) => f => bimap(f)(identity);

export const rmap: Derive<'bimap', 'rmap'> = ({ bimap }) => bimap(identity);
