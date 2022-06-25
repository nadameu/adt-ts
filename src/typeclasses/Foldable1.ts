import * as G from '../Generic';
import { identity } from '../helpers';
import { Foldable_1, Foldable_2 } from './Foldable';
import { Functor_1, Functor_2 } from './Functor';
import { Semigroup_0, Semigroup_1 } from './Semigroup';

export interface FoldMap1Only_1<f extends G.Generic1> extends G.Identified1<f> {
  foldMap1: Helpers1<f>['foldMap1'];
}
export interface Fold1Only_1<f extends G.Generic1> extends G.Identified1<f> {
  fold1: Helpers1<f>['fold1'];
}
export interface Foldable1_1<f extends G.Generic1>
  extends Foldable_1<f>,
    FoldMap1Only_1<f>,
    Fold1Only_1<f> {}

export interface Fold1MapOnly_1<f extends G.Generic1> extends Fold1Only_1<f>, Functor_1<f> {}

export interface FoldMap1Only_2<f extends G.Generic2> extends G.Identified2<f> {
  foldMap1: Helpers2<f>['foldMap1'];
}
export interface Fold1Only_2<f extends G.Generic2> extends G.Identified2<f> {
  fold1: Helpers2<f>['fold1'];
}
export interface Foldable1_2<f extends G.Generic2>
  extends Foldable_2<f>,
    FoldMap1Only_2<f>,
    Fold1Only_2<f> {}

export interface Fold1MapOnly_2<f extends G.Generic2> extends Fold1Only_2<f>, Functor_2<f> {}

interface Helpers1<f extends G.Generic1> {
  foldMap1: Helper1Semigroup<f>['foldMap1'];
  fold1: Helper1Semigroup<f>['fold1'];
}
interface Helpers2<f extends G.Generic2> {
  foldMap1: Helper2Semigroup<f>['foldMap1'];
  fold1: Helper2Semigroup<f>['fold1'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>(foldable: Foldable1_1<f>): Helpers1<f>[k];
    <f extends G.Generic2>(foldable: Foldable1_2<f>): Helpers2<f>[k];
  };
};
type PartialHelper<keys extends keyof Foldable1_1<never> & keyof Foldable1_2<never>> = {
  [k in keyof Helpers1<never>]: {
    <f extends G.Generic1>(_: Pick<Foldable1_1<f>, G.Generic1Type | keys>): Helpers1<f>[k];
    <f extends G.Generic2>(_: Pick<Foldable1_2<f>, G.Generic2Type | keys>): Helpers2<f>[k];
  };
};
interface Helpers1Semigroup0<f extends G.Generic1, m> {
  foldMap1: <a>(f: (_: a) => m) => (fa: G.Type1<f, a>) => m;
  fold1: (fm: G.Type1<f, m>) => m;
}
interface Helpers1Semigroup1<f extends G.Generic1, m extends G.Generic1> {
  foldMap1: <a, b>(f: (_: a) => G.Type1<m, b>) => (fa: G.Type1<f, a>) => G.Type1<m, b>;
  fold1: <a>(fma: G.Type1<f, G.Type1<m, a>>) => G.Type1<m, a>;
}
interface Helpers2Semigroup0<f extends G.Generic2, m> {
  foldMap1: <b>(f: (_: b) => m) => <a>(fab: G.Type2<f, a, b>) => m;
  fold1: <a>(fam: G.Type2<f, a, m>) => m;
}
interface Helpers2Semigroup1<f extends G.Generic2, m extends G.Generic1> {
  foldMap1: <b, c>(f: (_: b) => G.Type1<m, c>) => <a>(fab: G.Type2<f, a, b>) => G.Type1<m, c>;
  fold1: <a, b>(famb: G.Type2<f, a, G.Type1<m, b>>) => G.Type1<m, b>;
}
type Helper1Semigroup<f extends G.Generic1> = {
  [k in keyof Helpers1Semigroup0<never, never>]: {
    <m extends G.Generic1>(semigroup: Semigroup_1<m>): Helpers1Semigroup1<f, m>[k];
    <m>(semigroup: Semigroup_0<m>): Helpers1Semigroup0<f, m>[k];
  };
};
type Helper2Semigroup<f extends G.Generic2> = {
  [k in keyof Helpers2Semigroup0<never, never>]: {
    <m extends G.Generic1>(semigroup: Semigroup_1<m>): Helpers2Semigroup1<f, m>[k];
    <m>(semigroup: Semigroup_0<m>): Helpers2Semigroup0<f, m>[k];
  };
};
type HelperSemigroup = {
  [k in keyof Helper1Semigroup<never>]: {
    <f extends G.Generic1>(foldable: Foldable1_1<f>): Helper1Semigroup<f>[k];
    <f extends G.Generic2>(foldable: Foldable1_2<f>): Helper2Semigroup<f>[k];
  };
};

export const fold1Default: PartialHelper<'foldMap1'>['fold1'] =
  <f extends G.Generic1>({ foldMap1 }: G.Anon<Foldable1_1<f>, 'foldMap1'>) =>
  <m>(semigroup: G.Anon<Semigroup_0<m>>): ((fm: G.Type1<f, m>) => m) =>
    foldMap1(semigroup as Semigroup_0<m>)(identity);

export const foldMap1Default: {
  <f extends G.Generic1>({ fold1, map }: Fold1MapOnly_1<f>): Foldable1_1<f>['foldMap1'];
  <f extends G.Generic2>({ fold1, map }: Fold1MapOnly_2<f>): Foldable1_2<f>['foldMap1'];
} =
  <f extends G.Generic1>({ fold1, map }: G.Anon<Fold1MapOnly_1<f>, 'fold1' | 'map'>) =>
  <m>(semigroup: G.Anon<Semigroup_0<m>>) =>
  <a>(f: (_: a) => m) =>
  (fa: G.Type1<f, a>): m =>
    fold1(semigroup as Semigroup_0<m>)(map(f)(fa));
