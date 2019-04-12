export interface Types<w, x, y, z> {
	never: never;
}
export type Keys = keyof Types<never, never, never, never>;

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface _ {
	placeholder: never;
}
export type Placeholder = _;

type Replace<x0, x> = x0 extends _ ? x : x0;
type Type<f, w, x, y, z, z_ = unknown, y_ = unknown, x_ = unknown, w_ = unknown> = {
	[key in Keys]: f extends Types<w_ & infer w0, x_ & infer x0, y_ & infer y0, z_ & infer z0>[key]
		? Types<Replace<w0, w>, Replace<x0, x>, Replace<y0, y>, Replace<z0, z>>[key]
		: never
}[Keys];

export type Type0<f, w, x, y, z> = Type<f, w, x, y, z, _> extends never
	? Type<f, w, x, y, z>
	: Type<f, w, x, y, z, _>;
export type Type1<f, w, x, y, z> = f extends never ? never : Type<f, w, x, y, z, _>;
export type Type2<f, w, x, y, z> = f extends never ? never : Type<f, w, x, y, z, _, _>;
export type Type3<f, w, x, y, z> = f extends never ? never : Type<f, w, x, y, z, _, _, _>;
export type Type4<f, w, x, y, z> = f extends never ? never : Type<f, w, x, y, z, _, _, _, _>;
