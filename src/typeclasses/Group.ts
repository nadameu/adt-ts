import { NotGenericType } from '../Generic';
import { Monoid_0 } from './Monoid';

export interface Group_0<a> extends Monoid_0<a> {
  ginverse: (_: a) => a;
}

export interface GInverseOnly_0<a> extends Pick<Group_0<a>, NotGenericType | 'ginverse'> {}
