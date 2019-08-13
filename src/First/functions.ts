import { Semigroup1 } from '../typeclasses/Semigroup';
import { TFirst } from './internal';

export const append: Semigroup1<TFirst>['append'] = (x, _) => x;
