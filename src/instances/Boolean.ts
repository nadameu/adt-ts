import * as fl from '../fantasy-land';

Boolean.prototype[fl.equals] = function equals(that) {
	return this === that;
};

export default {};

declare global {
	interface Boolean {
		'@@URI': 'Boolean';
		['fantasy-land/equals']: (this: boolean, _: boolean) => boolean;
	}
}

declare module '../Types' {
	export interface Types<a, b, c, d> {
		Boolean: boolean;
	}
}
