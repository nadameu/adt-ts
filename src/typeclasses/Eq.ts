import { Anon, Identified0 } from '../Generic';
import { identity } from '../helpers';

export interface Eq<a> extends Identified0<a> {
  eq: (x: a) => (y: a) => boolean;
}

export const makeEqInstance: { <a>({ eq }: Anon<Eq<a>>): Eq<a> } = identity<any>;
