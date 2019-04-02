import { Eq } from '../Prelude/Data/Eq';
import { TypeDesc } from '../Type';

export const eqBoolean: Eq<'Boolean'> = { eq: x => y => x === y };
export const eq = eqBoolean.eq;

declare module '../Prelude/Data/Eq' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Boolean: boolean;
	}
}
