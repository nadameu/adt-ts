import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1, Generic2, Type2 } from '../../src/Generic';
import { Apply1, Apply2 } from '../../src/typeclasses/Apply';
import { Eq } from '../../src/typeclasses/Eq';

export const makeApply1Laws = <f extends Generic1>(apply: Apply1<f>) => (
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
            )(v)
          )(apply.apply(a)(apply.apply(u)(v)))
      ),
  };
};

export const makeApply2Laws = <f extends Generic2>(apply: Apply2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  const eq = makeEq(eqNumber, eqNumber).eq;
  return {
    composition: (): void =>
      jsc.assertForall(
        makeArb(jsc.number, jsc.fn(jsc.number)),
        makeArb(jsc.number, jsc.fn(jsc.number)),
        makeArb(jsc.number, jsc.number),
        (a, u, v) =>
          eq(
            apply.apply(
              apply.apply(
                apply.map((f: (_: number) => number) => (g: (_: number) => number) => (x: number) =>
                  f(g(x))
                )(a)
              )(u)
            )(v)
          )(apply.apply(a)(apply.apply(u)(v)))
      ),
  };
};
