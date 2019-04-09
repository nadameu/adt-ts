import * as fl from '../fantasy-land';

export interface Fn<a, b> {
	(_: a): b;
	[fl.map]<c>(f: (_: b) => c): Fn<a, c>;
	[fl.compose]<c>(f: Fn<b, c>): Fn<a, c>;
}

// eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
const proto = {
	[fl.map](f) {
		return Fn(x => f(this(x)));
	},
	[fl.compose](f) {
		return Fn(x => f(this(x)));
	},
} as Fn<any, any>;

export const Fn = <a, b>(f: (_: a) => b): Fn<a, b> => Object.assign(f, proto);

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Fn: Fn<y, z>;
	}
}
