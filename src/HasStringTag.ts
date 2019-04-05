export interface HasStringTag<T extends string> {
	readonly [Symbol.toStringTag]: T;
}
