import { Generic2 } from '../Generic';
import { Semigroupoid } from './Semigroupoid';

declare const CategorySymbol: unique symbol;
export interface GenericCategory extends Generic2 {
	[CategorySymbol]: 'Category';
	identity: unknown;
}

export interface Category<a extends GenericCategory> extends Semigroupoid<a> {
	identity: a['identity'];
}
