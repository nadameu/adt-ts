import { Anon, Generic1, Generic2 } from '../Generic';
import {
  Alt_1,
  Alt_2,
  Monoid_1,
  Monoid_2,
  Plus_1,
  Plus_2,
  Semigroup_1,
  Semigroup_2,
} from '../typeclasses';

export const makeSemigroupAlternate: {
  <f extends Generic1>(alt: Alt_1<f>): Semigroup_1<f>;
  <f extends Generic2>(alt: Alt_2<f>): Semigroup_2<f>;
} = <f extends Generic1>({ alt }: Anon<Alt_1<f>, 'alt'>) =>
  ({
    append: alt,
  } as Semigroup_1<Generic1> & Semigroup_2<Generic2>);

export const makeMonoidAlternate: {
  <f extends Generic1>(plus: Plus_1<f>): Monoid_1<f>;
  <f extends Generic2>(plus: Plus_2<f>): Monoid_2<f>;
} = <f extends Generic1>({ alt, empty }: Anon<Plus_1<f>>) =>
  ({
    append: alt,
    mempty: empty,
  } as Monoid_1<Generic1> & Monoid_2<Generic2>);
