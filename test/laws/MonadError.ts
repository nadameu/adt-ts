import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Generic1, Generic1as2, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { MonadError, MonadError_1, MonadError_2 } from '../../src/typeclasses/MonadError';

const laws = <f extends Generic2, e, a>(
  monadError: MonadError,
  fa: jsc.Arbitrary<Type2<f, e, a>>,
  e: jsc.Arbitrary<e>,
  a: jsc.Arbitrary<a>,
  eq: Eq<Type2<f, e, a>>['eq']
) => {
  const { catchError, pure, throwError } = monadError as MonadError_2<f>;
  return {
    catch: (): void =>
      jsc.assertForall(jsc.fn(fa), e, (f, e) => eq(catchError(f)(throwError(e)))(f(e))),
    pure: (): void =>
      jsc.assertForall(jsc.fn(fa), a, (f, a) => eq(catchError(f)(pure(a)))(pure(a))),
  };
};

export const makeMonadError1Laws = <f extends Generic1>(monadError: MonadError_1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws<Generic1as2<f>, undefined, number>(
    (monadError as unknown) as MonadError,
    makeArb(jsc.number),
    jsc.constant(undefined),
    jsc.number,
    makeEq(eqNumber).eq
  );

export const makeMonadError2Laws = <f extends Generic2>(monadError: MonadError_2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) =>
  laws<f, string, number>(
    monadError as MonadError,
    makeArb(jsc.string, jsc.number),
    jsc.string,
    jsc.number,
    makeEq(eqString, eqNumber).eq
  );
