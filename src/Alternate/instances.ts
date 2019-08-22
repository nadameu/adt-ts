import { Generic1, Generic2 } from '../Generic';
import { Alt, Alt1, Alt2 } from '../typeclasses/Alt';
import { Monoid1, Monoid2 } from '../typeclasses/Monoid';
import { Plus, Plus1, Plus2 } from '../typeclasses/Plus';
import { Semigroup1, Semigroup2 } from '../typeclasses/Semigroup';

export const makeSemigroupAlternate: {
  <f extends Generic1>(alt: Alt1<f>): Semigroup1<f>;
  <f extends Generic2>(alt: Alt2<f>): Semigroup2<f>;
} = ({ alt }: Alt) =>
  ({
    append: alt,
  } as Semigroup1<Generic1> & Semigroup2<Generic2>);

export const makeMonoidAlternate: {
  <f extends Generic1>(plus: Plus1<f>): Monoid1<f>;
  <f extends Generic2>(plus: Plus2<f>): Monoid2<f>;
} = ({ alt, empty }: Plus) =>
  ({
    append: alt,
    mempty: empty,
  } as Monoid1<Generic1> & Monoid2<Generic2>);
