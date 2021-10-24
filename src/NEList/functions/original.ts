import { Anon } from '../../Generic';
import { List } from '../../List/definitions';
import * as list from '../../List/functions/original';
import { Alt_1 } from '../../typeclasses';
import { Foldable_1 } from '../../typeclasses/Foldable';
import { fold1Default, Foldable1_1 } from '../../typeclasses/Foldable1';
import { Monad_1 } from '../../typeclasses/Monad';
import { Semigroup_0, Semigroup_1 } from '../../typeclasses/Semigroup';
import { Traversable_1 } from '../../typeclasses/Traversable';
import { NEList } from '../definitions';
import { TNEList } from '../internal';

export const cons = list.cons as <a>(head: a) => (tail: List<a>) => NEList<a>;
export const nil = list.nil;

export const map = list.map as Monad_1<TNEList>['map'];
export const apply = list.apply as Monad_1<TNEList>['apply'];
export const bind = list.bind as Monad_1<TNEList>['bind'];
export const pure = list.pure as Monad_1<TNEList>['pure'];

export const append = list.append as Semigroup_1<TNEList>['append'];

export const alt = list.alt as Alt_1<TNEList>['alt'];

export const foldl = list.foldl as Foldable_1<TNEList>['foldl'];
export const foldr = list.foldr as Foldable_1<TNEList>['foldr'];
export const foldMap = list.foldMap as Foldable_1<TNEList>['foldMap'];

export const traverse = list.traverse as Traversable_1<TNEList>['traverse'];
export const sequence = list.sequence as Traversable_1<TNEList>['sequence'];

export const foldMap1: Foldable1_1<TNEList>['foldMap1'] =
  <m>({ append }: Anon<Semigroup_0<m>>) =>
  <a>(f: (_: a) => m) =>
  (fa: NEList<a>): m =>
    list.foldl<a, m>(ys => x => append(ys)(f(x)))(f(fa.head))(fa.tail);
export const fold1 = fold1Default({ foldMap1 } as Foldable1_1<TNEList>);
