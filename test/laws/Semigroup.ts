import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Anon, Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq, Semigroup_0, Semigroup_1, Semigroup_2 } from '../../src/typeclasses';
import { associative } from './helpers';

const laws = <a>(semigroup: Anon<Semigroup_0<a>>, a: jsc.Arbitrary<a>, eq: Eq<a>['eq']) => {
  const { append } = semigroup as Semigroup_0<a>;
  return {
    associativity: (): void =>
      jsc.assertForall(a, a, a, (x, y, z) => associative(eq)(append)(x)(y)(z)),
  };
};

export const makeSemigroupLaws = <a>(semigroup: Semigroup_0<a>) => (eq: Eq<a>) => (
  arb: jsc.Arbitrary<a>
) => laws(semigroup, arb, eq.eq);

export const makeSemigroup1Laws = <f extends Generic1>(semigroup: Semigroup_1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws(semigroup, makeArb(jsc.number), makeEq(eqNumber).eq);

export const makeSemigroup2Laws = <f extends Generic2>(semigroup: Semigroup_2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => laws(semigroup, makeArb(jsc.string, jsc.number), makeEq(eqString, eqNumber).eq);
