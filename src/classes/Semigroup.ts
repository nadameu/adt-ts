import * as fl from '../fantasy-land';

export interface Semigroup<a extends Semigroup<a>> {
	[fl.concat]: (this: a, _: a) => a;
}

export const concat = <a extends Semigroup<a>>(x: a) => (y: a) => x[fl.concat](y);
