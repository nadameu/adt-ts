import { Eq } from '../Prelude/Data/Eq';
import { TypeDesc } from '../Type';

export const eqString: Eq<'String'> = { eq: x => y => x === y };
export const eq = eqString.eq;

declare module '../Prelude/Data/Eq' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		String: string;
	}
}
