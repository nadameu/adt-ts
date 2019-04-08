import * as fl from '../fantasy-land';
import { HKT } from '../HKT';

Boolean.prototype[fl.equals] = function equals(that) {
	return this === that;
};

export default {};

declare global {
	interface Boolean extends HKT<'Boolean'> {
		['fantasy-land/equals']: (this: boolean, _: boolean) => boolean;
	}
}

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Boolean: boolean;
	}
}
