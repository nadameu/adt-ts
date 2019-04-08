import { Keys } from './Types';

// eslint-disable-next-line @typescript-eslint/class-name-casing
const UNUSED = Symbol();
export type _ = typeof UNUSED;

export interface HKT<URI extends Keys, W = _, X = _, Y = _, Z = _> {
	'@@HKT': [URI, W, X, Y, Z];
}
