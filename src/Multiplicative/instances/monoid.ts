import { Monoid } from '../../typeclasses/Monoid';

export * from './semigroup';

export const mempty: Monoid<number>['mempty'] = () => 1;
