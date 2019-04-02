import * as F from '../Prelude/Data/Functor';
import { TypeDesc } from '../Type';

// Functor
export const functorArray: F.Functor<'Array'> = { map: f => xs => xs.map(x => f(x)) };
export const map = functorArray.map;
export const mapFlipped = F.mapFlipped(functorArray);
const _void = F.void(functorArray);
export { _void as void };
export const voidRight = F.voidRight(functorArray);
export const voidLeft = F.voidLeft(functorArray);
export const flap = F.flap(functorArray);

declare module '../Prelude/Data/Functor' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Array: params[0][];
	}
}
