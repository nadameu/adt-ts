import jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Plus1 } from '../../src/typeclasses/Plus';

export const makePlusLaws = <f extends Generic1>(plus: Plus1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    leftIdentity: (): void =>
      jsc.assertForall(makeArb(jsc.number), x => eq(plus.alt(plus.empty(), x), x)),
    rightIdentity: (): void =>
      jsc.assertForall(makeArb(jsc.number), x => eq(plus.alt(x, plus.empty()), x)),
    annihilation: (): void =>
      jsc.assertForall(jsc.fn(jsc.number), f => eq(plus.map(f)(plus.empty()), plus.empty()))
  };
};
