import * as E from '../Prelude/Data/Eq';
import * as F from '../Prelude/Data/Functor';
import { Desc, TypeDesc } from '../Type';

// Eq
export const eq1Array: E.Eq1<'Array'> = {
	eq1: E => xs => ys => {
		if (xs.length !== ys.length) return false;
		return xs.every((x, i) => E.eq(x)(ys[i]));
	},
};
export const eqArray: <a extends TypeDesc>(_: E.Eq<a>) => E.Eq<Desc<'Array', [a]>> = E => ({
	eq: eq1Array.eq1(E),
});

// Functor
export const functorArray: F.Functor<'Array'> = { map: f => xs => xs.map(x => f(x)) };
export const map = functorArray.map;
export const mapFlipped = F.mapFlipped(functorArray);
const _void = F.void(functorArray);
export { _void as void };
export const voidRight = F.voidRight(functorArray);
export const voidLeft = F.voidLeft(functorArray);
export const flap = F.flap(functorArray);

declare module '../Prelude/Data/Eq' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Array: Type<descs[0], params>[];
	}
}

declare module '../Prelude/Data/Functor' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Array: params[0][];
	}
}
