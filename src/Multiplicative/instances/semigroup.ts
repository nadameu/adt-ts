import { Semigroup } from '../../typeclasses/Semigroup';

export let NotGenericType: number;

export const append: Semigroup<number>['append'] = (x, y) => x * y;
