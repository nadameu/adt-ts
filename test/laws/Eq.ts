import * as fc from 'fast-check';
import { eqNumber, eqString } from '../../src';
import * as G from '../../src/Generic';
import { Eq } from '../../src/typeclasses';

const laws = <a>(eq0: Eq<a>, a: fc.Arbitrary<a>) => {
  const { eq } = eq0 as Eq<a>;
  return {
    reflexivity: (): void => void fc.assert(fc.property(a, x => eq(x)(x))),
    symmetry: (): void => void fc.assert(fc.property(a, a, (x, y) => eq(x)(y) === eq(y)(x))),
    transitivity: (): void =>
      void fc.assert(fc.property(a, a, a, (x, y, z) => (eq(x)(y) && eq(y)(z) ? eq(x)(z) : true))),
  };
};

export const makeEqLaws =
  <a>(eq: Eq<a>) =>
  (arb: fc.Arbitrary<a>) =>
    laws(eq, arb);

export const makeEq1Laws =
  <f extends G.Generic1>(makeEq: <a>(eq: Eq<a>) => Eq<G.Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<G.Type1<f, a>>) =>
    laws(makeEq(eqNumber), makeArb(fc.double({ noNaN: true })));

export const makeEq2Laws =
  <f extends G.Generic2>(makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<G.Type2<f, a, b>>) =>
  (
    makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<G.Type2<f, a, b>>
  ) =>
    laws(makeEq(eqString, eqNumber), makeArb(fc.string(), fc.double({ noNaN: true })));
