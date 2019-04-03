import { Desc, GetKey, Info, MakeInfo } from '../Desc';
import { Semigroup } from './Semigroup';

export interface Dict<info extends Info> {
	never: never;
}
export type Type<desc extends Desc, params extends any[]> = Dict<MakeInfo<desc, params>>[GetKey<
	desc,
	keyof Dict<never>
>];

export interface Monoid<m extends Desc> extends Semigroup<m> {
	empty: <_0 = unknown>() => Type<m, [_0]>;
}

export const empty = <m extends Desc>(S: Monoid<m>) => S.empty;
