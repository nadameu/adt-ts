import * as fl from '../fantasy-land';
import { HKT, _ } from '../HKT';

Number.prototype[fl.equals] = function equals(that) {
	return isNaN(this) ? isNaN(that) : this === that;
};
Number.prototype[fl.lte] = function lte(that) {
	return this <= that;
};

export default {};

declare global {
	interface Number extends HKT<'Number', _, _, _, _> {
		['fantasy-land/equals']: (this: number, _: number) => boolean;
		['fantasy-land/lte']: (this: number, _: number) => boolean;
	}
}

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Number: number;
	}
}
