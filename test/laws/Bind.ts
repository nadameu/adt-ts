import jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Bind1 } from '../../src/typeclasses/Bind';
import { Eq } from '../../src/typeclasses/Eq';

export const makeBindLaws = <f extends Generic1>(bind: Bind1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    associativity: (): void =>
      jsc.assertForall(
        makeArb(jsc.number),
        jsc.fn(makeArb(jsc.number)),
        jsc.fn(makeArb(jsc.number)),
        (x, f, g) => eq(bind.bind(g)(bind.bind(f)(x)), bind.bind(k => bind.bind(g)(f(k)))(x))
      )
  };
};
