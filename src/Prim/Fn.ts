import * as C from '../Prelude/Control/Category';
import * as S from '../Prelude/Control/Semigroupoid';
import * as F from '../Prelude/Data/Functor';
import { TypeDesc } from '../Type';

export type Fn<a, b> = (_: a) => b;
export type Fn2<a, b, c> = (_: a) => (_: b) => c;

// Semigroupoid
export const semigroupoidFn: S.Semigroupoid<'Fn'> = { compose: f => g => x => f(g(x)) };
export const compose = semigroupoidFn.compose;
export const composeFlipped = S.composeFlipped(semigroupoidFn);

// Category
export const categoryFn: C.Category<'Fn'> = { ...semigroupoidFn, identity: x => x };
export const identity = categoryFn.identity;

// Functor
export const functorFn: F.Functor<'Fn'> = { map: compose };
export const map = functorFn.map;
export const mapFlipped = F.mapFlipped(functorFn);
const _void = F.void(functorFn);
export { _void as void };
export const voidRight = F.voidRight(functorFn);
export const voidLeft = F.voidLeft(functorFn);
export const flap = F.flap(functorFn);

declare module '../Prelude/Control/Semigroupoid' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Fn: Fn<params[0], params[1]>;
	}
}

declare module '../Prelude/Control/Category' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Fn: <t>(_: t) => t;
	}
}

declare module '../Prelude/Data/Functor' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Fn: Fn<params[1], params[0]>;
	}
}
