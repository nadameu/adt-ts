import { concat } from '../classes/Semigroup';
import { equals } from '../classes/Setoid';
import { T } from '../combinators';
import * as fl from '../fantasy-land';

export class Maybe {
	get isNothing() {
		return !this.isJust;
	}

	static [fl.empty]() {
		return Nothing;
	}
}
const JustConstructor = class Just extends Maybe {
	constructor(value) {
		super();
		this.isJust = true;
		this.value = value;
	}

	[fl.ap](that) {
		return that[fl.map](T(this.value));
	}
	[fl.concat](that) {
		return that.isNothing ? this : Just(concat(this.value)(that.value));
	}
	[fl.equals](that) {
		return that.isJust && equals(this.value)(that.value);
	}
	[fl.map](f) {
		return Just(f(this.value));
	}
};
export const Just = x => new JustConstructor(x);
const NothingConstructor = class Nothing extends Maybe {
	constructor() {
		super();
		this.isJust = false;
	}
	[fl.ap](_) {
		return this;
	}
	[fl.concat](that) {
		return that;
	}
	[fl.equals](that) {
		return that.isNothing;
	}
	[fl.map](_) {
		return this;
	}
};
export const Nothing = new NothingConstructor();
