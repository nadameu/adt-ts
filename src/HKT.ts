import { Keys } from './Types';
export interface HKT<URI extends Keys, A = never, B = never, C = never, D = never> {
	'@@HKT': [URI, A, B, C, D];
}
