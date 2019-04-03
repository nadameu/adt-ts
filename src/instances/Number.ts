import { Setoid } from '../classes/Setoid';
import { Info } from '../Desc';

export const equals: Setoid<'Number'>['equals'] = x => y => (isNaN(x) ? isNaN(y) : x === y);

declare module '../classes/Setoid' {
	export interface Dict<info extends Info> {
		Number: number;
	}
}
