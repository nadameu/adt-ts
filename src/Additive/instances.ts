import { Group } from '../typeclasses/Group';
import { Monoid0 } from '../typeclasses/Monoid';
import { Semigroup0 } from '../typeclasses/Semigroup';

const append: Semigroup0<number>['append'] = x => y => x + y;
export const semigroupAdditive = { append } as Semigroup0<number>;

const mempty: Monoid0<number>['mempty'] = () => 0;
export const monoidAdditive = { append, mempty } as Monoid0<number>;

const ginverse: Group<number>['ginverse'] = x => -x;
export const groupAdditive = { append, ginverse, mempty } as Group<number>;
