import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { MonadError1 } from '../../src/typeclasses/MonadError';

export const makeMonadError1Laws = <f extends Generic1>(monadError: MonadError1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    catch: (): void =>
      jsc.assertForall(jsc.fn(makeArb(jsc.number)), f =>
        eq(monadError.catchError(() => f(undefined))(monadError.throwError()), f(undefined))
      ),
    pure: (): void =>
      jsc.assertForall(jsc.fn(makeArb(jsc.number)), jsc.number, (f, a) =>
        eq(monadError.catchError(() => f(undefined))(monadError.pure(a)), monadError.pure(a))
      ),
  };
};
