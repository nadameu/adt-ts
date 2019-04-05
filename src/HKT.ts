import { Keys } from './Types';

// eslint-disable-next-line @typescript-eslint/class-name-casing
interface _ {
	empty: true;
}

export interface HKT<URI extends Keys, A = _, B = _, C = _, D = _> {
	'@@HKT': [URI, A, B, C, D];
}
