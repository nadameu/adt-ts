import { equals as eq, Setoid } from '../classes/Setoid';
import * as fl from '../fantasy-land';

Array.prototype[fl.concat] = function concat(that) {
	return this.concat(that);
};
Array.prototype[fl.equals] = function equals(that) {
	if (this.length !== that.length) return false;
	return this.every((x, i) => eq(x as any)(that[i] as any));
};
Array.prototype[fl.map] = function map(f) {
	return this.map(x => f(x));
};

Array[fl.empty] = function() {
	return [];
};

export default {};

declare global {
	interface Array<T> {
		['fantasy-land/concat']: (_: T[]) => T[];
		['fantasy-land/equals']: <U extends Setoid<U>>(this: U[], _: U[]) => boolean;
		['fantasy-land/map']: <U>(f: (_: T) => U) => U[];
	}
	interface ArrayConstructor {
		['fantasy-land/empty']: <T = never>() => T[];
	}
}

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Array: z[];
	}
}
