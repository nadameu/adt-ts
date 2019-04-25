export type Prop0 = Record<'type', any>;
export type Prop1 = Prop0 & Record<'z', unknown>;
export type Prop2 = Prop1 & Record<'y', unknown>;
export type Prop3 = Prop2 & Record<'x', unknown>;
export type Prop4 = Prop3 & Record<'w', unknown>;
export type Prop5 = Prop4 & Record<'v', unknown>;
export type Type<f extends Prop0, v, w, x, y, z> = f extends never
	? never
	: (f & { v: v; w: w; x: x; y: y; z: z })['type'];
