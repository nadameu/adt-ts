import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';
import { Semigroupoid } from './Semigroupoid';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Category<c extends Category<any, a, b>, a, b> extends Semigroupoid<c, a, b> {}
export interface CategoryConstructor<c extends Category<any, any, any>> {
	prototype: c;
	[fl.id]: CreateType<c>;
}

type CreateType<c extends Category<any, any, any>> = {} & {
	[key in Keys]: c extends Type<key, any, any, any, any> ? Type<key, any, any, any, any> : never
}[Keys];
type Create<c extends Category<any, any, any>> = {} & Extract<
	CreateType<c>,
	Category<any, any, any>
>;

export const id = <c extends Category<any, any, any>>(C: CategoryConstructor<c>) =>
	C[fl.id] as Create<c>;
