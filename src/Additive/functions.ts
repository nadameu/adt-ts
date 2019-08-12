import { Monoid } from '../typeclasses/Monoid';
export const append: Monoid<number>['append'] = (x, y) => x + y;
export const mempty: Monoid<number>['mempty'] = () => 0;
