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

// eslint-disable-next-line @typescript-eslint/class-name-casing, @typescript-eslint/no-empty-interface
declare interface _ {}
export type Type<f extends Generic, a = _, b = _> = f extends never
	? never
	: (f & { a: a; b: b })['type'];
