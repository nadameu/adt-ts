import { Semigroupoid } from '../classes/Semigroupoid';
import { compose } from '../combinators';
import { Placeholder as _ } from '../Types';

export type Fn<a, b> = (_: a) => b;

export { compose };

export const semigroupoidFunction: Semigroupoid<Fn<_, _>> = { compose };

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Fn: Fn<y, z>;
	}
}
