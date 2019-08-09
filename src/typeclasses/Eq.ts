import { Identified0 } from '../Generic';

export interface Eq<a> extends Identified0<a> {
  eq: (x: a, y: a) => boolean;
}
