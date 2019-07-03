import { DivisionRing } from './DivisionRing';
import { EuclidianRing } from './EuclidianRing';

export interface Field<a> extends EuclidianRing<a>, DivisionRing<a> {}
