import { Desc, TypeDesc } from '../../Type';
import { Semigroupoid } from './Semigroupoid';
export { categoryFn } from '../../Prim/Fn';

export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
	never: never;
}
export type Type<desc extends TypeDesc, params extends any[] = any[]> = desc extends keyof Dict
	? Dict<params>[desc]
	: desc extends Desc<infer key, infer descs>
	? key extends keyof Dict
		? Dict<params, descs>[key]
		: never
	: never;

export interface Category<a extends TypeDesc> extends Semigroupoid<a> {
	identity: Type<a>;
}
