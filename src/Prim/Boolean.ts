import { Eq } from '../Prelude/Data/Eq';

export const eq: Eq<'Boolean'>['eq'] = x => y => x === y;

declare module '../TypesDictionary' {
	export interface EqInstances<Params extends any[] = any[]> {
		Boolean: { instance: boolean };
	}
}
