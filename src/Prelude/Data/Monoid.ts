import { Type, TypeCons } from '../../Type';
import { Semigroup, Instance as SemigroupInstance } from './Semigroup';
import { Maybe } from '../../Maybe';

export interface Monoid<a extends Type> extends Semigroup<a> {
	empty<e0 = never, e1 = never, e2 = never, e3 = never>(): Instance<a, [e0, e1, e2, e3]>;
}

export interface Dict<args extends any[] = never, inner extends Type[] = never> {
	never: never;
	Array: args[0][];
	Maybe: Maybe<SemigroupInstance<inner[0], args>>;
}
export type Instance<t extends Type, args extends any[]> = {
	[k in t['outer']]: k extends keyof Dict ? Dict<args, t['inner']>[k] : never
}[t['outer']];

declare const monoidArray: Monoid<TypeCons<'Array'>>;
const fnArray = monoidArray.append;

declare const monoidMaybe: <a extends Type>(M: Monoid<a>) => Monoid<TypeCons<'Maybe', [a]>>;
const monoidMaybeArray = monoidMaybe(monoidArray);
const fnMaybeArray = monoidMaybeArray.empty;
