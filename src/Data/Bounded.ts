import { Ord } from './Ord';

export interface Bounded<a> extends Ord<a> {
	top: a;
	bottom: a;
}
