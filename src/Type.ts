export interface TypeDesc {
	URI: string;
	VarDescs: TypeDesc[];
}

export interface Desc<URI extends string, VarDescs extends TypeDesc[] = never[]> {
	URI: URI;
	VarDescs: VarDescs;
}

export type PickEven<args extends any[]> = [args[0], args[2], args[4], args[6], args[8]];
export type PickOdd<args extends any[]> = [args[1], args[3], args[5], args[7], args[9]];
