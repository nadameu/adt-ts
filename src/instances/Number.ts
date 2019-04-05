import * as fl from '../fantasy-land';

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
		'@@A': never;
		'@@B': never;
		'@@C': never;
		'@@D': never;
		['fantasy-land/equals']: (this: number, _: number) => boolean;
		['fantasy-land/lte']: (this: number, _: number) => boolean;
	}
}

declare module '../Types' {
	export interface Types<a, b, c, d> {
		Number: number;
	}
}
