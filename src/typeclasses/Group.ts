import { Monoid0 } from './Monoid';

export interface Group<a> extends Monoid0<a> {
  ginverse: (_: a) => a;
}
