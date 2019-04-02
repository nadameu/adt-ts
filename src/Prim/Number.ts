import { Eq } from '../Prelude/Data/Eq';
import { TypeDesc } from '../Type';

export const eqNumber: Eq<'Number'> = { eq: x => y => (isNaN(x) ? isNaN(y) : x === y) };
export const eq = eqNumber.eq;

declare module '../Prelude/Data/Eq' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Number: number;
	}
}
