/* eslint-disable no-undef */
import * as fl from 'fantasy-land';

Array.prototype[fl.concat] = function concat(that) {
	return this.concat(that);
};

Array[fl.empty] = function() {
	return [];
};

export default {};

declare global {
	interface Array<T> {
		'@@URI': 'Array';
		'@@A': T;
		[fl.concat]: (_: T[]) => T[];
	}
	interface ArrayConstructor {
		[fl.empty]: <T>() => T[];
	}
}

declare module '../Types' {
	export interface Types<a, b, c, d> {
		Array: a[];
	}
}
