export type Prop0 = Record<'type', any>;
export type Prop1 = Prop0 & Record<'a', unknown>;
export type Prop2 = Prop1 & Record<'b', unknown>;
export type Prop3 = Prop2 & Record<'c', unknown>;
export type Prop4 = Prop3 & Record<'d', unknown>;
export type Prop5 = Prop4 & Record<'e', unknown>;
export type Type0<f extends Prop0> = f extends never ? never : (f & {})['type'];
export type Type1<f extends Prop1, a> = f extends never ? never : (f & { a: a })['type'];
export type Type2<f extends Prop2, a, b> = f extends never ? never : (f & { a: a; b: b })['type'];
export type Type3<f extends Prop3, a, b, c> = f extends never
	? never
	: (f & { a: a; b: b; c: c })['type'];
export type Type4<f extends Prop4, a, b, c, d> = f extends never
	? never
	: (f & { a: a; b: b; c: c; d: d })['type'];
export type Type5<f extends Prop5, a, b, c, d, e> = f extends never
	? never
	: (f & { a: a; b: b; c: c; d: d; e: e })['type'];

export type AnyFn1 = (_: any) => any;
export type AnyFn2 = (_: any) => (_: any) => any;
export type AnyFn3 = (_: any) => (_: any) => (_: any) => any;
export type AnyFn4 = (_: any) => (_: any) => (_: any) => (_: any) => any;
export type AnyFn5 = (_: any) => (_: any) => (_: any) => (_: any) => (_: any) => any;
export type AnyFn6 = (_: any) => (_: any) => (_: any) => (_: any) => (_: any) => (_: any) => any;
