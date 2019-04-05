/* eslint-disable no-undef */
import * as fl from 'fantasy-land';

Boolean.prototype[fl.equals] = function equals(that) {
	return this === that;
};

export default {};

declare global {
	interface Boolean {
		readonly [Symbol.toStringTag]: 'Boolean';
		[fl.equals]: (_: boolean) => boolean;
	}
}

declare module '../Types' {
	export interface Types<a, b> {
		Boolean: boolean;
	}
}
