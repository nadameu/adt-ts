import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Semigroup, Semigroup0, Semigroup1, Semigroup2 } from '../../src/typeclasses/Semigroup';
import { associative } from './helpers';

const laws = <a>(semigroup: Semigroup, a: jsc.Arbitrary<a>, eq: Eq<a>['eq']) => {
  const { append } = semigroup as Semigroup0<a>;
  return {
    associativity: (): void =>
      jsc.assertForall(a, a, a, (x, y, z) => associative(eq)(append)(x)(y)(z)),
  };
};

export const makeSemigroupLaws = <a>(semigroup: Semigroup0<a>) => (eq: Eq<a>) => (
  arb: jsc.Arbitrary<a>
) => laws(semigroup as Semigroup, arb, eq.eq);

export const makeSemigroup1Laws = <f extends Generic1>(semigroup: Semigroup1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws(semigroup as Semigroup, makeArb(jsc.number), makeEq(eqNumber).eq);

export const makeSemigroup2Laws = <f extends Generic2>(semigroup: Semigroup2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => laws(semigroup as Semigroup, makeArb(jsc.string, jsc.number), makeEq(eqString, eqNumber).eq);
