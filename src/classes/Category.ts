import { Prop2, Type2 } from '../Types';
import { Semigroupoid2 } from './Semigroupoid';

export interface Category2<f extends Prop2> extends Semigroupoid2<f> {
	identity: Type2<f, any, any>;
}
