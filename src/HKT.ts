import { Keys } from './Types';
export interface HKT<URI extends Keys, A, B, C, D> {
	'@@URI': URI;
	'@@A'?: A;
	'@@B'?: B;
	'@@C'?: C;
	'@@D'?: D;
}
