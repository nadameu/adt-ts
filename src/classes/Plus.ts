import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Alt1, Alt2 } from './Alt';

export interface Plus1<f extends Prop1> extends Alt1<f> {
	empty: <a = never>() => Type1<f, a>;
}

export interface Plus2<f extends Prop2> extends Alt2<f> {
	empty: <a = never, b = never>() => Type2<f, a, b>;
}
