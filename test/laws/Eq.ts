import * as jsc from 'jsverify';
import { Eq } from '../../src/typeclasses/Eq';
import { Type1, Generic1, Generic2, Type2 } from '../../src/Generic';
import { eqNumber } from '../../src';

export const makeEqLaws = <a>(eq: Eq<a>) => (arb: jsc.Arbitrary<a>) => ({
  reflexivity: (): void => jsc.assertForall(arb, x => eq.eq(x)(x)),
  symmetry: (): void => jsc.assertForall(arb, arb, (x, y) => eq.eq(x)(y) === eq.eq(y)(x)),
  transitivity: (): void =>
    jsc.assertForall(arb, arb, arb, (x, y, z) => (eq.eq(x)(y) && eq.eq(y)(z) ? eq.eq(x)(z) : true)),
});

export const makeEq1Laws = <f extends Generic1>(makeEq: <a>(eq: Eq<a>) => Eq<Type1<f, a>>) => (
  makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>
) => makeEqLaws(makeEq(eqNumber))(makeArb(jsc.number));

export const makeEq2Laws = <f extends Generic2>(
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => makeEqLaws(makeEq(eqNumber, eqNumber))(makeArb(jsc.number, jsc.number));
