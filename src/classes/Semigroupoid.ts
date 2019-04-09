import * as fl from '../fantasy-land';
import { Keys, Type } from '../Types';

export interface Semigroupoid<s extends Semigroupoid<any, a, b>, a, b> {
	[fl.compose]<c>(this: s, _: DeriveType<s, b, c>): DeriveType<s, a, c>;
}

type DeriveType<s extends Semigroupoid<any, any, any>, a, b> = {} & {
	[key in Keys]: s extends Type<key, infer w, infer x, any, any> ? Type<key, w, x, a, b> : never
}[Keys];
type Derive<s extends Semigroupoid<any, any, any>, a, b> = {} & Extract<
	DeriveType<s, a, b>,
	Semigroupoid<any, a, b>
>;
type Params<s extends Semigroupoid<any, any, any>> = {} & s extends Semigroupoid<
	any,
	infer a,
	infer b
>
	? [a, b]
	: never;
type In<s extends Semigroupoid<any, any, any>> = Params<s>[0];
type Out<s extends Semigroupoid<any, any, any>> = Params<s>[1];

export const composeFlipped = <s extends Semigroupoid<any, any, any>>(f: s) => <c>(
	g: Derive<s, Out<s>, c>,
) => f[fl.compose](g as DeriveType<s, Out<s>, c>) as Derive<s, In<s>, c>;

export const compose = <s extends Semigroupoid<any, any, any>>(f: s) => <a>(
	g: Derive<s, a, In<s>>,
) =>
	(g as Semigroupoid<any, a, In<s>>)[fl.compose](f as DeriveType<s, In<s>, Out<s>>) as Derive<
		s,
		a,
		Out<s>
	>;
