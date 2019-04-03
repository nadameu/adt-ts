import { Desc, GetKey, Info, MakeInfo } from '../Desc';
import { Dict as MonoidDict } from './Monoid';

export interface Dict<info extends Info> extends MonoidDict<info> {
	never: never;
}
export type Type<desc extends Desc, params extends any[]> = Dict<MakeInfo<desc, params>>[GetKey<
	desc,
	keyof Dict<never>
>];

export interface Semigroup<s extends Desc> {
	concat: <_0 = unknown>(_: Type<s, [_0]>) => (_: Type<s, [_0]>) => Type<s, [_0]>;
}

export const concat = <s extends Desc>(S: Semigroup<s>) => S.concat;
