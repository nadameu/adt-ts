import { Monoid } from './Monoid';

export interface Group<a> extends Monoid<a> {
  invert: (_: a) => a;
}
