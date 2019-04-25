import { Prop2, Type } from '../Types';
import { Semigroupoid } from './Semigroupoid';

export interface Category<f extends Prop2> extends Semigroupoid<f> {
	identity: <x = never, w = never, v = never>() => Type<f, v, w, x, any, any>;
}
