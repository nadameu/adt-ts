import { Keys } from './Types';

// eslint-disable-next-line @typescript-eslint/class-name-casing
export interface _ {
	readonly unused: unique symbol;
}

export interface HKT<URI extends Keys, W, X, Y, Z> {
	'@@HKT': [URI, W, X, Y, Z];
}
