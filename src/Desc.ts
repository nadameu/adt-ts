export interface Info {
	params: any[];
	descs: Desc[];
}
export interface TypeDesc {
	key: string;
	descs: Desc[];
}
export type Desc = string | TypeDesc;
export interface MakeInfo<desc extends Desc, params extends any[]> extends Info {
	params: params;
	descs: desc extends TypeDesc ? desc['descs'] : never;
}
export type GetKey<desc extends Desc, keys extends string> = desc extends keys
	? desc
	: desc extends { key: keys }
	? desc['key']
	: never;
export interface CompositeDesc<key extends string, descs extends Desc[]> extends TypeDesc {
	key: key;
	descs: descs;
}
