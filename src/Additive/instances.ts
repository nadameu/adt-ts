import { Monoid } from '../typeclasses/Monoid';
import { Semigroup } from '../typeclasses/Semigroup';

const append = (x: number, y: number) => x + y;

export const semigroupAdditive = { append } as Semigroup<number>;

export const monoidAdditive = { append, mempty: () => 0 } as Monoid<number>;
