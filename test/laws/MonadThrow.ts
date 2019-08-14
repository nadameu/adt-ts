import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1, Generic2, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { MonadThrow1, MonadThrow2 } from '../../src/typeclasses/MonadThrow';

export const makeMonadThrow1Laws = <f extends Generic1>(monadThrow: MonadThrow1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    leftZero: (): void =>
      jsc.assertForall(jsc.fn(makeArb(jsc.number)), f =>
        eq(monadThrow.bind(f)(monadThrow.throwError()), monadThrow.throwError())
      ),
  };
};

export const makeMonadThrow2Laws = <f extends Generic2>(monadThrow: MonadThrow2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  const eq = makeEq(eqNumber, eqNumber).eq;
  return {
    leftZero: (): void =>
      jsc.assertForall(jsc.number, jsc.fn(makeArb(jsc.number, jsc.number)), (e, f) =>
        eq(monadThrow.bind(f)(monadThrow.throwError(e)), monadThrow.throwError(e))
      ),
  };
};
