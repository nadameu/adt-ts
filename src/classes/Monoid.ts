import { Type0 } from '../Types';
import { Semigroup } from './Semigroup';

export interface Monoid<a> extends Semigroup<a> {
	empty: <z = never, y = never, x = never, w = never>() => Type0<a, w, x, y, z>;
}

export const empty: <a>(M: Monoid<a>) => Monoid<a>['empty'] = M => M.empty;
