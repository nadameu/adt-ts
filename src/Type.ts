export type TypeDesc = string | RecursiveTypeDesc;

export interface RecursiveTypeDesc {
	key: string;
	descs: TypeDesc[];
}

export interface Desc<key extends string, descs extends TypeDesc[]> extends RecursiveTypeDesc {
	key: key;
	descs: descs;
}

export type PickEven<args extends any[]> = [args[0], args[2], args[4], args[6], args[8]];
export type PickOdd<args extends any[]> = [args[1], args[3], args[5], args[7], args[9]];
