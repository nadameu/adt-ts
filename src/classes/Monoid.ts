import { Prop0, Type } from '../Types';
import { Semigroup } from './Semigroup';

export interface Monoid<a extends Prop0> extends Semigroup<a> {
	empty: <z = never, y = never, x = never, w = never, v = never>() => Type<a, v, w, x, y, z>;
}
