import { Semiring } from './Semiring';

export interface Ring<a> extends Semiring<a> {
	sub: (x: a) => (y: a) => a;
}

export const negate = <a>(ringA: Ring<a>) => (x: a): a => ringA.sub(ringA.zero)(x);
