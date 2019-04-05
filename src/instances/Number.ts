/* eslint-disable no-undef */
import * as fl from 'fantasy-land';

Number.prototype[fl.equals] = function equals(that) {
	return isNaN(this) ? isNaN(that) : this === that;
};
Number.prototype[fl.lte] = function lte(that) {
	return this <= that;
};

export default {};

declare global {
	interface Number {
		'@@URI': 'Number';
		[fl.equals]: (this: number, _: number) => boolean;
		[fl.lte]: (this: number, _: number) => boolean;
	}
}

declare module '../Types' {
	export interface Types<a, b, c, d> {
		Number: number;
	}
}
