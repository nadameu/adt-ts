import * as fl from '../fantasy-land';

export interface Setoid<a extends Setoid<a>> {
	[fl.equals]: (this: a, _: a) => boolean;
}

export const equals = <a extends Setoid<a>>(x: a) => (y: a) => x[fl.equals](y);
export const notEquals = <a extends Setoid<a>>(x: a) => (y: a) => !x[fl.equals](y);
