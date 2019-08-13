import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { MonadThrow1 } from '../../src/typeclasses/MonadThrow';

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
