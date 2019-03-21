export interface Type {
	outer: string;
	inner: Type[];
}

export interface TypeCons<outer extends string, inner extends Type[] = never[]> {
	outer: outer;
	inner: inner;
}

export type PickEven<args extends any[]> = [args[0], args[2], args[4], args[6], args[8]];
export type PickOdd<args extends any[]> = [args[1], args[3], args[5], args[7], args[9]];
