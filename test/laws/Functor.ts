import * as jsc from 'jsverify';
import { Generic1, Type1, Generic2, Type2 } from '../../src/Generic';
import { Functor1, Functor2 } from '../../src/typeclasses/Functor';
import { Eq } from '../../src/typeclasses/Eq';
import { eqNumber } from '../../src';

export const makeFunctor1Laws = <f extends Generic1>(functor: Functor1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    identity: (): void => jsc.assertForall(makeArb(jsc.number), x => eq(functor.map(x => x, x), x)),
    composition: (): void =>
      jsc.assertForall(makeArb(jsc.number), jsc.fn(jsc.number), jsc.fn(jsc.number), (x, f, g) =>
        eq(functor.map(f, functor.map(g, x)), functor.map(x => f(g(x)), x))
      ),
  };
};

export const makeFunctor2Laws = <f extends Generic2>(functor: Functor2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  const eq = makeEq(eqNumber, eqNumber).eq;
  return {
    identity: (): void =>
      jsc.assertForall(makeArb(jsc.number, jsc.number), x => eq(functor.map(x => x, x), x)),
    composition: (): void =>
      jsc.assertForall(
        makeArb(jsc.number, jsc.number),
        jsc.fn(jsc.number),
        jsc.fn(jsc.number),
        (x, f, g) => eq(functor.map(f, functor.map(g, x)), functor.map(x => f(g(x)), x))
      ),
  };
};
