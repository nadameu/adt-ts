import { Desc, TypeDesc } from '../../Type';
export { semigroupoidFn } from '../../Prim/Fn';

export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
	never: never;
}
export type Type<a extends TypeDesc, params extends any[] = any[]> = a extends keyof Dict
	? Dict<params>[a]
	: a extends Desc<infer key, infer descs>
	? key extends keyof Dict
		? Dict<params, descs>[key]
		: never
	: never;

export interface Semigroupoid<a extends TypeDesc> {
	compose: <c, d>(_: Type<a, [c, d]>) => <b>(_: Type<a, [b, c]>) => Type<a, [b, d]>;
}

export const composeFlipped: <a extends TypeDesc>(
	S: Semigroupoid<a>,
) => <b, c>(_: Type<a, [b, c]>) => <d>(_: Type<a, [c, d]>) => Type<a, [b, d]> = S => f => g =>
	S.compose(g)(f);
