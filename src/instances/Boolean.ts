import * as fl from '../fantasy-land';

Boolean.prototype[fl.equals] = function equals(that) {
	return this === that;
};

export default {};

declare global {
	interface Boolean {
		['fantasy-land/equals']: (this: boolean, _: boolean) => boolean;
	}
}

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Boolean: boolean;
	}
}
