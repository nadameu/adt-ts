import * as fl from '../fantasy-land';
import { Semigroup } from './Semigroup';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Monoid<a extends Monoid<a>> extends Semigroup<a> {}
export interface MonoidConstructor<a extends Monoid<a>> {
	prototype: Monoid<a>;
	[fl.empty]: () => a;
}

export const empty = <a extends Monoid<a>>(M: MonoidConstructor<a>) => M[fl.empty]();
