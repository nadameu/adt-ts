import { Identified0 } from "../Generic";

export interface Semigroup<a> extends Identified0<a> {
  append: (x: a) => (y: a) => a;
}
