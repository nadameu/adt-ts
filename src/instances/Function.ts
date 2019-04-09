import * as fl from '../fantasy-land';

export interface Fn<a, b> {
	(_: a): b;
	[fl.compose]<c>(that: Fn<b, c>): Fn<a, c>;
}
export interface FnConstructor {
	<a, b>(f: (_: a) => b): Fn<a, b>;
	prototype: Fn<any, any>;
	[fl.id]: Fn<any, any>;
}

const cloneFn: <args extends any[], b>(f: (...args: args) => b) => (...args: args) => b = f =>
	function(this: any) {
		return f.apply(this, arguments as any);
	};

export const Fn: FnConstructor = (<a, b>(f: (_: a) => b): Fn<a, b> =>
	Object.assign(cloneFn(f), Fn.prototype)) as any;
Fn[fl.id] = Fn(<a>(x: a) => x);
Fn.prototype[fl.compose] = function(that) {
	return Fn(x => that(this(x)));
};

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Fn: Fn<y, z>;
	}
}
