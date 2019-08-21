import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Alternative1 } from '../../src/typeclasses/Alternative';
import { Eq } from '../../src/typeclasses/Eq';

export const makeAlternativeLaws = <f extends Generic1>(alternative: Alternative1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    distributivity: (): void =>
      jsc.assertForall(
        makeArb(jsc.fn(jsc.number)),
        makeArb(jsc.fn(jsc.number)),
        makeArb(jsc.number),
        (f, g, x) =>
          eq(alternative.apply(alternative.alt(f)(g))(x))(
            alternative.alt(alternative.apply(f)(x))(alternative.apply(g)(x))
          )
      ),
    annihilation: (): void =>
      jsc.assertForall(makeArb(jsc.number), f =>
        eq(alternative.apply(alternative.empty())(f))(alternative.empty())
      ),
  };
};
