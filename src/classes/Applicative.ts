import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';
import { Apply } from './Apply';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Applicative<fa extends Applicative<fa, a>, a> extends Apply<fa, a> {}
export interface ApplicativeConstructor<f extends Applicative<f, any>> {
	prototype: f;
	[fl.of]<a, y = never, x = never, w = never>(_: a): Derive<f, a, y, x, w>;
}

type Derive<f extends Applicative<f, any>, a, y, x, w> = {} & {
	[key in Keys]: f extends Type<key, any, any, any, any> ? Type<key, w, x, y, a> : never
}[Keys];

export const of = <f extends Applicative<f, any>>(A: ApplicativeConstructor<f>) => <
	a,
	y = never,
	x = never,
	w = never
>(
	value: a,
) => A[fl.of]<a, y, x, w>(value);
