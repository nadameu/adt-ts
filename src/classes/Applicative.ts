import { fn } from '../combinators';
import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';
import { ap, Apply } from './Apply';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Applicative<fa extends Applicative<any, a>, a> extends Apply<fa, a> {}
export interface ApplicativeConstructor<f extends Applicative<any, any>> {
	prototype: f;
	[fl.of]<a, y = never, x = never, w = never>(_: a): CreateType<f, a, y, x, w>;
}

type CreateType<f extends Applicative<any, any>, a, y, x, w> = {} & {
	[key in Keys]: f extends Type<key, any, any, any, any> ? Type<key, w, x, y, a> : never
}[Keys];
type Create<f extends Applicative<any, any>, a, y, x, w> = {} & Extract<
	CreateType<f, a, y, x, w>,
	Applicative<any, a>
>;
type DeriveType<f extends Applicative<any, any>, a> = {} & {
	[key in Keys]: f extends Type<key, infer w, infer x, infer y, any> ? Type<key, w, x, y, a> : never
}[Keys];
type Derive<f extends Applicative<any, any>, a> = {} & Extract<
	DeriveType<f, a>,
	Applicative<any, a>
>;

export const of = <f extends Applicative<any, any>>(A: ApplicativeConstructor<f>) => <
	a,
	y = never,
	x = never,
	w = never
>(
	value: a,
) => A[fl.of]<a, y, x, w>(value) as Create<f, a, y, x, w>;

export const liftA1: <a, b>(
	f: fn<a, b>,
) => <fa extends Applicative<any, a>>(fa: fa) => Derive<fa, b> = f => fa =>
	ap(of(fa.constructor as any)(f) as any)(fa as any) as any;
