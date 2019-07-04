import { Generic1 } from '../../Generic';
import { compose } from '../../StackSafe/Function';
import { Monoid1 } from '../Monoid';
import { Semigroup1 } from '../Semigroup';

declare const EndoSymbol: unique symbol;
export interface Endo<a> {
	(_: a): a;
	[EndoSymbol]: 'Endo';
}
export interface GenericEndo extends Generic1 {
	type: Endo<this['a']>;
}

export const append: <a>(f: Endo<a>) => (g: Endo<a>) => Endo<a> = compose as any;
export const semigroupEndo: Semigroup1<GenericEndo> = { append };

export const mempty = <a = never>(): Endo<a> => (x => x) as Endo<a>;
export const monoidEndo: Monoid1<GenericEndo> = { ...semigroupEndo, mempty };
