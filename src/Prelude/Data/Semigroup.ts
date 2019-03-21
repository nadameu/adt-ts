import { Type } from '../../Type';
import { Maybe } from '../../Maybe';
import { Dict as MonoidDict } from './Monoid';

export interface Semigroup<a extends Type> {
	append<e0 = never, e1 = never, e2 = never, e3 = never>(
		_: Instance<a, [e0, e1, e2, e3]>,
	): (_: Instance<a, [e0, e1, e2, e3]>) => Instance<a, [e0, e1, e2, e3]>;
}

export interface Dict<args extends any[] = never, inner extends Type[] = never>
	extends MonoidDict<args, inner> {
	never: never;
	// String: string;
	// Array: args[0][];
	Maybe: Maybe<Instance<inner[0], args>>;
}
export type Instance<t extends Type, args extends any[]> = {
	[k in t['outer']]: k extends keyof Dict ? Dict<args, t['inner']>[k] : never
}[t['outer']];
