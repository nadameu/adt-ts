import * as fc from 'fast-check';
import { eqNumber, eqString } from '../../src';
import * as G from '../../src/Generic';
import { Eq, Semigroup_0, Semigroup_1, Semigroup_2 } from '../../src/typeclasses';
import { associative } from './helpers';

const laws = <a>(semigroup: G.Anon<Semigroup_0<a>>, a: fc.Arbitrary<a>, eq: Eq<a>['eq']) => {
  const { append } = semigroup as Semigroup_0<a>;
  return {
    associativity: (): void =>
      void fc.assert(fc.property(a, a, a, (x, y, z) => associative(eq)(append)(x)(y)(z))),
  };
};

export const makeSemigroupLaws =
  <a>(semigroup: Semigroup_0<a>) =>
  (eq: Eq<a>) =>
  (arb: fc.Arbitrary<a>) =>
    laws(semigroup, arb, eq.eq);

export const makeSemigroup1Laws =
  <f extends G.Generic1>(semigroup: Semigroup_1<f>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<G.Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<G.Type1<f, a>>) =>
    laws(semigroup, makeArb(fc.double({ noNaN: true })), makeEq(eqNumber).eq);

export const makeSemigroup2Laws =
  <f extends G.Generic2>(semigroup: Semigroup_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<G.Type2<f, a, b>>) =>
  (
    makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<G.Type2<f, a, b>>
  ) =>
    laws(
      semigroup,
      makeArb(fc.string(), fc.double({ noNaN: true })),
      makeEq(eqString, eqNumber).eq
    );
