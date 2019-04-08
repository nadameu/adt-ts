export interface Types<w, x, y, z> {
	never: never;
}
export type Keys = keyof Types<never, never, never, never>;
export type Type<key extends Keys, w, x, y, z> = Types<w, x, y, z>[key];
