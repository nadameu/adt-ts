import { Setoid } from '../classes/Setoid';
import { Info } from '../Desc';

export const equals: Setoid<'Number'>['equals'] = x => y => (isNaN(x) ? isNaN(y) : x === y);

declare module '../classes/Ord' {
	export interface Dict<info extends Info> {
		Number: number;
	}
}
