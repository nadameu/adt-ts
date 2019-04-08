import { equals, Setoid } from '../classes/Setoid';
import * as fl from '../fantasy-land';

export class Arr<a> extends Array<a> {
	constructor(xs: a[]) {
		super(xs.length);
		xs.forEach((x, i) => {
			this[i] = x;
		});
	}
	[fl.ap]<b>(that: Arr<(_: a) => b>): Arr<b> {
		const result = new Arr<b>([]);
		for (const f of that) {
			for (const x of this) {
				result.push(f(x));
			}
		}
		return result;
	}
	[fl.concat](that: Arr<a>): Arr<a> {
		return new Arr(this.concat(that));
	}
	[fl.equals]<b extends Setoid<b>>(this: b[], that: b[]): boolean {
		return this.length === that.length && this.every((x, i) => equals(x)(that[i]));
	}
	[fl.map]<b>(f: (x: a) => b): Arr<b> {
		return new Arr(this.map(f));
	}

	static [fl.empty]<a = never>(): Arr<a> {
		return new Arr([]);
	}
}

declare module '../Types' {
	export interface Types<w, x, y, z> {
		Arr: Arr<z>;
	}
}
