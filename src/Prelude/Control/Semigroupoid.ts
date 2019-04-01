import { Desc, TypeDesc } from '../../Type';

export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
	Fn: (_: params[0]) => params[1];
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

export const semigroupoidFn: Semigroupoid<'Fn'> = {
	compose: f => g => x => f(g(x)),
};

export const composeFlipped: <a extends TypeDesc>(
	S: Semigroupoid<a>,
) => <b, c>(_: Type<a, [b, c]>) => <d>(_: Type<a, [c, d]>) => Type<a, [b, d]> = S => f => g =>
	S.compose(g)(f);
