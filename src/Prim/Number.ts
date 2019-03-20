import { Eq } from '../Prelude/Data/Eq';

export const eq: Eq<'Number'>['eq'] = x => y => (isNaN(x) ? isNaN(y) : x === y);

declare module '../TypesDictionary' {
	export interface EqInstances<Params extends any[] = any[]> {
		Number: { instance: number };
	}
}
