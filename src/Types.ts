export interface Types<a, b, c, d> {
	never: never;
}
export type Keys = keyof Types<never, never, never, never>;
export type Type<key extends Keys, a, b, c, d> = Types<a, b, c, d>[key];
