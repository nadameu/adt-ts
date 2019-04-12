import { Type2 } from '../Types';
import { Semigroupoid } from './Semigroupoid';

export interface Category<f> extends Semigroupoid<f> {
	identity: <x = never, w = never>() => Type2<f, w, x, any, any>;
}

export const identity: <f>(C: Category<f>) => Category<f>['identity'] = C => C.identity;
