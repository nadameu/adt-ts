import jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Apply1 } from '../../src/typeclasses/Apply';
import { Eq } from '../../src/typeclasses/Eq';

export const makeApplyLaws = <f extends Generic1>(apply: Apply1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    composition: (): void =>
      jsc.assertForall(
        makeArb(jsc.fn(jsc.number)),
        makeArb(jsc.fn(jsc.number)),
        makeArb(jsc.number),
        (a, u, v) =>
          eq(
            apply.apply(
              apply.apply(
                apply.map((f: (_: number) => number) => (g: (_: number) => number) => (x: number) =>
                  f(g(x))
                )(a)
              )(u)
            )(v),
            apply.apply(a)(apply.apply(u)(v))
          )
      ),
  };
};
