import { Prop0, Type } from '../Types';

export interface Semigroup<a extends Prop0> {
	append: <z, y, x, w, v>(
		x: Type<a, v, w, x, y, z>,
	) => (y: Type<a, v, w, x, y, z>) => Type<a, v, w, x, y, z>;
}
