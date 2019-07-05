import { Generic1, Generic2, Type } from '../Generic';
import { Extend, Extend2 } from './Extend';

export interface Comonad<w extends Generic1> extends Extend<w> {
	extract: <a>(wa: Type<w, a>) => a;
}

export interface Comonad2<w extends Generic2> extends Extend2<w> {
	extract: <a, b>(wa: Type<w, a, b>) => b;
}
