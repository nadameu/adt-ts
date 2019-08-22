import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Monoid0, Monoid1, Monoid2 } from '../../src/typeclasses/Monoid';

export const makeMonoidLaws = <a>(monoid: Monoid0<a>) => (eq: Eq<a>) => (arb: jsc.Arbitrary<a>) => {
  return {
    leftUnit: (): void => jsc.assertForall(arb, x => eq.eq(monoid.append(monoid.mempty())(x))(x)),
    rightUnit: (): void => jsc.assertForall(arb, x => eq.eq(monoid.append(x)(monoid.mempty()))(x)),
  };
};

export const makeMonoid1Laws = <f extends Generic1>({ append, mempty }: Monoid1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  makeMonoidLaws<Type1<f, number>>({ append, mempty } as Monoid0<Type1<f, number>>)(
    makeEq(eqNumber)
  )(makeArb(jsc.number));

export const makeMonoid2Laws = <f extends Generic2>({ append, mempty }: Monoid2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) =>
  makeMonoidLaws<Type2<f, string, number>>({ append, mempty } as Monoid0<Type2<f, string, number>>)(
    makeEq(eqString, eqNumber)
  )(makeArb(jsc.string, jsc.number));
