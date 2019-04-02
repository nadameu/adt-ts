import * as E from '../Prelude/Data/Eq';
import { Desc, TypeDesc } from '../Type';
import { eqArray } from './Array';
import { eqString } from './String';

// Eq
export const eqRecord: <a extends TypeDesc>(_: E.Eq<a>) => E.Eq<Desc<'Record', [a]>> = E => ({
	eq: x => y => {
		const xKeys = Object.keys(x).sort();
		return (
			eqArray(eqString).eq(xKeys)(Object.keys(y).sort()) &&
			xKeys.every(key => E.eq((x as any)[key])((y as any)[key]))
		);
	},
});

declare module '../Prelude/Data/Eq' {
	export interface Dict<params extends any[] = any[], descs extends TypeDesc[] = never[]> {
		Record: Record<params[0], Type<descs[0]>>;
	}
}
