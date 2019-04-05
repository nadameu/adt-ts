export interface Types<a = never, b = never> {
	never: never;
}
export type Keys = keyof Types;
export type Type<key extends Keys, a, b> = Types<a, b>[key];
