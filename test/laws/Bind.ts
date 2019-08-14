import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1, Generic2, Type2 } from '../../src/Generic';
import { Bind1, Bind2 } from '../../src/typeclasses/Bind';
import { Eq } from '../../src/typeclasses/Eq';

export const makeBind1Laws = <f extends Generic1>(bind: Bind1<f>) => (
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
      ),
  };
};

export const makeBind2Laws = <f extends Generic2>(bind: Bind2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  const eq = makeEq(eqNumber, eqNumber).eq;
  return {
    associativity: (): void =>
      jsc.assertForall(
        makeArb(jsc.number, jsc.number),
        jsc.fn(makeArb(jsc.number, jsc.number)),
        jsc.fn(makeArb(jsc.number, jsc.number)),
        (x, f, g) => eq(bind.bind(g)(bind.bind(f)(x)), bind.bind(k => bind.bind(g)(f(k)))(x))
      ),
  };
};
