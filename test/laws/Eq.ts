import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses';

const laws = <a>(eq0: Eq<a>, a: jsc.Arbitrary<a>) => {
  const { eq } = eq0 as Eq<a>;
  return {
    reflexivity: (): void => jsc.assertForall(a, x => eq(x)(x)),
    symmetry: (): void => jsc.assertForall(a, a, (x, y) => eq(x)(y) === eq(y)(x)),
    transitivity: (): void =>
      jsc.assertForall(a, a, a, (x, y, z) => (eq(x)(y) && eq(y)(z) ? eq(x)(z) : true)),
  };
};

export const makeEqLaws = <a>(eq: Eq<a>) => (arb: jsc.Arbitrary<a>) => laws(eq, arb);

export const makeEq1Laws = <f extends Generic1>(makeEq: <a>(eq: Eq<a>) => Eq<Type1<f, a>>) => (
  makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>
) => laws(makeEq(eqNumber), makeArb(jsc.number));

export const makeEq2Laws = <f extends Generic2>(
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => laws(makeEq(eqString, eqNumber), makeArb(jsc.string, jsc.number));
