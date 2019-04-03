import { Desc, GetKey, Info, MakeInfo } from '../Desc';

export interface Dict<info extends Info> {
	never: never;
}
export type Type<desc extends Desc, params extends any[]> = Dict<MakeInfo<desc, params>>[GetKey<
	desc,
	keyof Dict<never>
>];

export interface Setoid<s extends Desc> {
	equals: <_0 = unknown>(_: Type<s, [_0]>) => (_: Type<s, [_0]>) => boolean;
}

export const equals = <s extends Desc>(S: Setoid<s>) => S.equals;
export const notEquals: <s extends Desc>(
	S: Setoid<s>,
) => <_0 = unknown>(_: Type<s, [_0]>) => (_: Type<s, [_0]>) => boolean = S => x => y =>
	!equals(S)(x)(y);
