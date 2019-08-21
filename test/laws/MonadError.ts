import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1, Generic2, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { MonadError1, MonadError2 } from '../../src/typeclasses/MonadError';

export const makeMonadError1Laws = <f extends Generic1>(monadError: MonadError1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    catch: (): void =>
      jsc.assertForall(jsc.fn(makeArb(jsc.number)), f =>
        eq(monadError.catchError(() => f(undefined))(monadError.throwError()))(f(undefined))
      ),
    pure: (): void =>
      jsc.assertForall(jsc.fn(makeArb(jsc.number)), jsc.number, (f, a) =>
        eq(monadError.catchError(() => f(undefined))(monadError.pure(a)))(monadError.pure(a))
      ),
  };
};

export const makeMonadError2Laws = <f extends Generic2>(monadError: MonadError2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  const eq = makeEq(eqNumber, eqNumber).eq;
  return {
    catch: (): void =>
      jsc.assertForall(jsc.number, jsc.fn(makeArb(jsc.number, jsc.number)), (e, f) =>
        eq(monadError.catchError(f)(monadError.throwError(e)))(f(e))
      ),
    pure: (): void =>
      jsc.assertForall(jsc.fn(makeArb(jsc.number, jsc.number)), jsc.number, (f, a) =>
        eq(monadError.catchError(f)(monadError.pure(a)))(monadError.pure(a))
      ),
  };
};
