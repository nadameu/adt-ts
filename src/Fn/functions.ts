import { Semigroupoid2 } from '../typeclasses/Semigroupoid';
import { TFn } from './internal';
import { Category2 } from '../typeclasses/Category';

export const compose: Semigroupoid2<TFn>['compose'] = f => g => x => f(g(x));

export const identity: Category2<TFn>['identity'] = x => x;
