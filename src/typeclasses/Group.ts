import { Monoid } from './Monoid';

export interface Group<a> extends Monoid<a> {
  ginverse: (_: a) => a;
}
