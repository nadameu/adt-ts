import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';
import { Setoid, equals as eq } from '../classes/Setoid';

Array.prototype[fl.concat] = function concat(that) {
	return this.concat(that);
};
Array.prototype[fl.equals] = function equals(that) {
	if (this.length !== that.length) return false;
	return this.every((x, i) => eq(x as any)(that[i] as any));
};

Array[fl.empty] = function() {
	return [];
};

export default {};

declare global {
	interface Array<T> {
		'@@URI': 'Array';
		'@@A': T;
		['fantasy-land/concat']: (_: T[]) => T[];
		['fantasy-land/equals']: <S extends Keys, a, b, c, d>(
			this: (Type<S, a, b, c, d> & Setoid<S, a, b, c, d>)[],
			_: (Type<S, a, b, c, d> & Setoid<S, a, b, c, d>)[],
		) => boolean;
	}
	interface ArrayConstructor {
		['fantasy-land/empty']: <T>() => T[];
	}
}

declare module '../Types' {
	export interface Types<a, b, c, d> {
		Array: a[];
	}
}
