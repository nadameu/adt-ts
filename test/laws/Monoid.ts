import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Monoid, Monoid_0, Monoid_1, Monoid_2 } from '../../src/typeclasses/Monoid';
import { leftIdentity, rightIdentity } from './helpers';

const laws = <a>(monoid: Monoid, a: jsc.Arbitrary<a>, eq: Eq<a>['eq']) => {
  const { append, mempty } = monoid as Monoid_0<a>;
  return {
    leftUnit: (): void => jsc.assertForall(a, leftIdentity(eq)(append)(mempty())),
    rightUnit: (): void => jsc.assertForall(a, rightIdentity(eq)(append)(mempty())),
  };
};

export const makeMonoidLaws = <a>(monoid: Monoid_0<a>) => (eq: Eq<a>) => (arb: jsc.Arbitrary<a>) =>
  laws(monoid as Monoid, arb, eq.eq);

export const makeMonoid1Laws = <f extends Generic1>(monoid: Monoid_1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws(monoid as Monoid, makeArb(jsc.number), makeEq(eqNumber).eq);

export const makeMonoid2Laws = <f extends Generic2>(monoid: Monoid_2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => laws(monoid as Monoid, makeArb(jsc.string, jsc.number), makeEq(eqString, eqNumber).eq);
