import { Monoid } from '../../typeclasses/Monoid';

export * from './semigroup';

export const mempty: Monoid<boolean>['mempty'] = () => false;
