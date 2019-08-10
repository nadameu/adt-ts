import { Generic1, Identified1, Type1 } from '../Generic';
import { Monoid, Monoid1 } from './Monoid';

export interface Foldable1<f extends Generic1> extends Identified1<f> {
  foldl: <a, b>(f: (_: b) => (_: a) => b) => (b: b) => (fa: Type1<f, a>) => b;
  foldr: <a, b>(f: (_: a) => (_: b) => b) => (b: b) => (fa: Type1<f, a>) => b;
  foldMap<m extends Generic1>(
    monoid: Monoid1<m>
  ): <a, b>(f: (_: a) => Type1<m, b>) => (fa: Type1<f, a>) => Type1<m, b>;
  foldMap<m>(monoid: Monoid<m>): <a>(f: (_: a) => m) => (fa: Type1<f, a>) => m;
}
