import { Identified0 } from '../Generic';
import { Monoid_0 } from './Monoid';

export interface GInverseOnly_0<a> extends Identified0<a> {
  ginverse: (_: a) => a;
}
export interface Group_0<a> extends Monoid_0<a>, GInverseOnly_0<a> {}
