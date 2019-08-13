import { Semigroup1 } from '../typeclasses/Semigroup';
import { TLast } from './internal';

export const append: Semigroup1<TLast>['append'] = (_, y) => y;
