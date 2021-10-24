import * as fc from 'fast-check';
import { eqNumber, eqString } from '../../src';
import { Anon, Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq, Monoid_0, Monoid_1, Monoid_2 } from '../../src/typeclasses';
import { leftIdentity, rightIdentity } from './helpers';

const laws = <a>(monoid: Anon<Monoid_0<a>>, a: fc.Arbitrary<a>, eq: Eq<a>['eq']) => {
  const { append, mempty } = monoid as Monoid_0<a>;
  return {
    leftUnit: (): void => void fc.assert(fc.property(a, leftIdentity(eq)(append)(mempty()))),
    rightUnit: (): void => void fc.assert(fc.property(a, rightIdentity(eq)(append)(mempty()))),
  };
};

export const makeMonoidLaws =
  <a>(monoid: Monoid_0<a>) =>
  (eq: Eq<a>) =>
  (arb: fc.Arbitrary<a>) =>
    laws(monoid, arb, eq.eq);

export const makeMonoid1Laws =
  <f extends Generic1>(monoid: Monoid_1<f>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws(monoid, makeArb(fc.double()), makeEq(eqNumber).eq);

export const makeMonoid2Laws =
  <f extends Generic2>(monoid: Monoid_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>) =>
  (makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<Type2<f, a, b>>) =>
    laws(monoid, makeArb(fc.string(), fc.double()), makeEq(eqString, eqNumber).eq);
