import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1, Generic2, Type2 } from '../../src/Generic';
import { Monad1, Monad2 } from '../../src/typeclasses/Monad';
import { Eq } from '../../src/typeclasses/Eq';

export const makeMonad1Laws = <f extends Generic1>(monad: Monad1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    leftIdentity: (): void =>
      jsc.assertForall(jsc.number, jsc.fn(makeArb(jsc.number)), (x, f) =>
        eq(monad.bind(f)(monad.pure(x)), f(x))
      ),
    rightIdentity: (): void =>
      jsc.assertForall(makeArb(jsc.number), x => eq(monad.bind(monad.pure)(x), x)),
  };
};

export const makeMonad2Laws = <f extends Generic2>(monad: Monad2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  const eq = makeEq(eqNumber, eqNumber).eq;
  return {
    leftIdentity: (): void =>
      jsc.assertForall(jsc.number, jsc.fn(makeArb(jsc.number, jsc.number)), (x, f) =>
        eq(monad.bind(f)(monad.pure(x)), f(x))
      ),
    rightIdentity: (): void =>
      jsc.assertForall(makeArb(jsc.number, jsc.number), x => eq(monad.bind(monad.pure)(x), x)),
  };
};
