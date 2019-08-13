import { Monoid } from '../typeclasses/Monoid';
export const append: Monoid<boolean>['append'] = (x, y) => x || y;
export const mempty: Monoid<boolean>['mempty'] = () => false;
