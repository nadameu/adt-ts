import { Prop1, Prop2, Type1, Type2 } from '../Types';
import { Extend1, Extend2 } from './Extend';

export interface Comonad1<f extends Prop1> extends Extend1<f> {
	extract: <a>(fa: Type1<f, a>) => a;
}

export interface Comonad2<f extends Prop2> extends Extend2<f> {
	extract: <a, b>(fa: Type2<f, a, b>) => b;
}
