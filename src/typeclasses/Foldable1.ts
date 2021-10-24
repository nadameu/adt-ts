import { Anon, Generic1, Generic1Type, Generic2, Generic2Type, Type1, Type2 } from '../Generic';
import { identity } from '../helpers/identity';
import { Foldable_1, Foldable_2 } from './Foldable';
import { Functor_1, Functor_2 } from './Functor';
import { Semigroup_0, Semigroup_1 } from './Semigroup';

export interface Foldable1_1<f extends Generic1> extends Foldable_1<f> {
  foldMap1: Helpers1<f>['foldMap1'];
  fold1: Helpers1<f>['fold1'];
}

export interface Foldable1_2<f extends Generic2> extends Foldable_2<f> {
  foldMap1: Helpers2<f>['foldMap1'];
  fold1: Helpers2<f>['fold1'];
}

export interface FoldMap1Only_1<f extends Generic1>
  extends Pick<Foldable1_1<f>, Generic1Type | 'foldMap1'> {}

export interface FoldMap1Only_2<f extends Generic2>
  extends Pick<Foldable1_2<f>, Generic2Type | 'foldMap1'> {}

export interface Fold1Only_1<f extends Generic1>
  extends Pick<Foldable1_1<f>, Generic1Type | 'fold1'> {}

export interface Fold1Only_2<f extends Generic2>
  extends Pick<Foldable1_2<f>, Generic2Type | 'fold1'> {}

interface Helpers1<f extends Generic1> {
  foldMap1: Helper1Semigroup<f>['foldMap1'];
  fold1: Helper1Semigroup<f>['fold1'];
}
interface Helpers2<f extends Generic2> {
  foldMap1: Helper2Semigroup<f>['foldMap1'];
  fold1: Helper2Semigroup<f>['fold1'];
}
type Helper = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(foldable: Foldable1_1<f>): Helpers1<f>[k];
    <f extends Generic2>(foldable: Foldable1_2<f>): Helpers2<f>[k];
  };
};
type PartialHelper<keys extends keyof Foldable1_1<never> & keyof Foldable1_2<never>> = {
  [k in keyof Helpers1<never>]: {
    <f extends Generic1>(_: Pick<Foldable1_1<f>, Generic1Type | keys>): Helpers1<f>[k];
    <f extends Generic2>(_: Pick<Foldable1_2<f>, Generic2Type | keys>): Helpers2<f>[k];
  };
};
interface Helpers1Semigroup0<f extends Generic1, m> {
  foldMap1: <a>(f: (_: a) => m) => (fa: Type1<f, a>) => m;
  fold1: (fm: Type1<f, m>) => m;
}
interface Helpers1Semigroup1<f extends Generic1, m extends Generic1> {
  foldMap1: <a, b>(f: (_: a) => Type1<m, b>) => (fa: Type1<f, a>) => Type1<m, b>;
  fold1: <a>(fma: Type1<f, Type1<m, a>>) => Type1<m, a>;
}
interface Helpers2Semigroup0<f extends Generic2, m> {
  foldMap1: <b>(f: (_: b) => m) => <a>(fab: Type2<f, a, b>) => m;
  fold1: <a>(fam: Type2<f, a, m>) => m;
}
interface Helpers2Semigroup1<f extends Generic2, m extends Generic1> {
  foldMap1: <b, c>(f: (_: b) => Type1<m, c>) => <a>(fab: Type2<f, a, b>) => Type1<m, c>;
  fold1: <a, b>(famb: Type2<f, a, Type1<m, b>>) => Type1<m, b>;
}
type Helper1Semigroup<f extends Generic1> = {
  [k in keyof Helpers1Semigroup0<never, never>]: {
    <m extends Generic1>(semigroup: Semigroup_1<m>): Helpers1Semigroup1<f, m>[k];
    <m>(semigroup: Semigroup_0<m>): Helpers1Semigroup0<f, m>[k];
  };
};
type Helper2Semigroup<f extends Generic2> = {
  [k in keyof Helpers2Semigroup0<never, never>]: {
    <m extends Generic1>(semigroup: Semigroup_1<m>): Helpers2Semigroup1<f, m>[k];
    <m>(semigroup: Semigroup_0<m>): Helpers2Semigroup0<f, m>[k];
  };
};
type HelperSemigroup = {
  [k in keyof Helper1Semigroup<never>]: {
    <f extends Generic1>(foldable: Foldable1_1<f>): Helper1Semigroup<f>[k];
    <f extends Generic2>(foldable: Foldable1_2<f>): Helper2Semigroup<f>[k];
  };
};

export const fold1Default: PartialHelper<'foldMap1'>['fold1'] =
  <f extends Generic1>({ foldMap1 }: Anon<Foldable1_1<f>, 'foldMap1'>) =>
  <m>(semigroup: Anon<Semigroup_0<m>>): ((fm: Type1<f, m>) => m) =>
    foldMap1(semigroup as Semigroup_0<m>)(identity);

export const foldMap1Default: {
  <f extends Generic1>({ fold1, map }: Fold1Only_1<f> & Functor_1<f>): Foldable1_1<f>['foldMap1'];
  <f extends Generic2>({ fold1, map }: Fold1Only_2<f> & Functor_2<f>): Foldable1_2<f>['foldMap1'];
} =
  <f extends Generic1>({ fold1, map }: Anon<Fold1Only_1<f> & Functor_1<f>, 'fold1' | 'map'>) =>
  <m>(semigroup: Anon<Semigroup_0<m>>) =>
  <a>(f: (_: a) => m) =>
  (fa: Type1<f, a>): m =>
    fold1(semigroup as Semigroup_0<m>)(map(f)(fa));
