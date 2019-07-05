import { Generic1, Type, Generic2 } from '../Generic';
import { Alt, Alt2 } from './Alt';

export interface Plus<f extends Generic1> extends Alt<f> {
	empty: <a = never>() => Type<f, a>;
}

export interface Plus2<f extends Generic2> extends Alt2<f> {
	empty: <a = never, b = never>() => Type<f, a, b>;
}
