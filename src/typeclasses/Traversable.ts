import { Generic1, Type1 } from '../Generic';
import { Applicative1 } from './Applicative';
import { Foldable1 } from './Foldable';
import { Functor1 } from './Functor';

export interface Traversable1<t extends Generic1> extends Functor1<t>, Foldable1<t> {
  traverse<m extends Generic1>(
    applicative: Applicative1<m>
  ): <a, b>(f: (_: a) => Type1<m, b>) => (ta: Type1<t, a>) => Type1<m, Type1<t, b>>;
  sequence<m extends Generic1>(
    applicative: Applicative1<m>
  ): <a>(tma: Type1<t, Type1<m, a>>) => Type1<m, Type1<t, a>>;
}
