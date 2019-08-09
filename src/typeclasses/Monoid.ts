import { Semigroup } from "./Semigroup";

export interface Monoid<a> extends Semigroup<a> {
  mempty: () => a;
}
