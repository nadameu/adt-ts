import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Monoid, Monoid1 } from '../../src/typeclasses/Monoid';

export const makeMonoidLaws = <a>(monoid: Monoid<a>) => (eq: Eq<a>) => (arb: jsc.Arbitrary<a>) => {
  return {
    leftUnit: (): void => jsc.assertForall(arb, x => eq.eq(monoid.append(monoid.mempty(), x), x)),
    rightUnit: (): void => jsc.assertForall(arb, x => eq.eq(monoid.append(x, monoid.mempty()), x)),
  };
};

export const makeMonoid1Laws = <f extends Generic1>(monoid: Monoid1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  makeMonoidLaws<Type1<f, number>>(monoid as any)(makeEq(eqNumber))(makeArb(jsc.number));
