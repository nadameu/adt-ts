import { Group_0 } from '../typeclasses/Group';
import { Monoid_0 } from '../typeclasses/Monoid';
import { Semigroup_0 } from '../typeclasses/Semigroup';

const append: Semigroup_0<number>['append'] = x => y => x + y;
export const semigroupAdditive = { append } as Semigroup_0<number>;

const mempty: Monoid_0<number>['mempty'] = () => 0;
export const monoidAdditive = { append, mempty } as Monoid_0<number>;

const ginverse: Group_0<number>['ginverse'] = x => -x;
export const groupAdditive = { append, ginverse, mempty } as Group_0<number>;
