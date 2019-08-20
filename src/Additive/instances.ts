import { curry2 } from '../curry';
import { Group } from '../typeclasses/Group';
import { Monoid } from '../typeclasses/Monoid';
import { Semigroup } from '../typeclasses/Semigroup';

const append: Semigroup<number>['append'] = curry2((x: number, y: number) => x + y);
export const semigroupAdditive = { append } as Semigroup<number>;

const mempty: Monoid<number>['mempty'] = () => 0;
export const monoidAdditive = { append, mempty } as Monoid<number>;

const ginverse: Group<number>['ginverse'] = x => -x;
export const groupAdditive = { append, ginverse, mempty } as Group<number>;
