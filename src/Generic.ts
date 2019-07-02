declare const GenericSymbol: unique symbol;
export type Generic = Generic1 | Generic2;

export interface Generic1 {
	[GenericSymbol]: 'Generic1';
	a: unknown;
	type: unknown;
}

export interface Generic2 {
	[GenericSymbol]: 'Generic2';
	a: unknown;
	b: unknown;
	type: unknown;
}

export type Type<f extends Generic, a = unknown, b = unknown> = (f & { a: a; b: b })['type'];
