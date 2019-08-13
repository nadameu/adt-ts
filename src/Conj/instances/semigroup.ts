import { Semigroup } from '../../typeclasses/Semigroup';

export let NotGenericType: boolean;

export const append: Semigroup<boolean>['append'] = (x, y) => x && y;
