import { Prop2, Type2 } from '../Types';

export interface Lazy<a> {
	defer: (f: () => a) => a;
}

export interface Lazy2<f extends Prop2> {
	defer: <a, b>(f: () => Type2<f, a, b>) => Type2<f, a, b>;
}

export const fix: <a>(L: Lazy<a>) => (f: (_: a) => a) => a = ({ defer }) => f => {
	const go = defer(() => f(go));
	return go;
};
