import * as fc from 'fast-check';
import { eqNumber, eqString } from '../../src';
import { Anon, Generic1, Generic1as2, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq, MonadError_1, MonadError_2 } from '../../src/typeclasses';

const laws = <f extends Generic2, e, a>(
  monadError: Anon<MonadError_2<f>>,
  fa: fc.Arbitrary<Type2<f, e, a>>,
  e: fc.Arbitrary<e>,
  a: fc.Arbitrary<a>,
  eq: Eq<Type2<f, e, a>>['eq']
) => {
  const { catchError, pure, throwError } = monadError as MonadError_2<f>;
  return {
    catch: (): void =>
      void fc.assert(fc.property(fc.func(fa), e, (f, e) => eq(catchError(f)(throwError(e)))(f(e)))),
    pure: (): void =>
      void fc.assert(fc.property(fc.func(fa), a, (f, a) => eq(catchError(f)(pure(a)))(pure(a)))),
  };
};

export const makeMonadError0Laws =
  <f extends Generic1, e>(monadError: MonadError_1<f, e>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (arbError: fc.Arbitrary<e>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws<Generic1as2<f>, e, number>(
      monadError as unknown as MonadError_2<Generic1as2<f>>,
      makeArb(fc.double({ noNaN: true })),
      arbError,
      fc.double({ noNaN: true }),
      makeEq(eqNumber).eq
    );

export const makeMonadError1Laws =
  <f extends Generic1, e>(monadError: MonadError_1<f, e>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (arbError: fc.Arbitrary<e>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws<Generic1as2<f>, e, number>(
      monadError as unknown as MonadError_2<Generic1as2<f>>,
      makeArb(fc.double({ noNaN: true })),
      arbError,
      fc.double({ noNaN: true }),
      makeEq(eqNumber).eq
    );

export const makeMonadError2Laws =
  <f extends Generic2>(monadError: MonadError_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>) =>
  (makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<Type2<f, a, b>>) =>
    laws<f, string, number>(
      monadError,
      makeArb(fc.string(), fc.double({ noNaN: true })),
      fc.string(),
      fc.double({ noNaN: true }),
      makeEq(eqString, eqNumber).eq
    );
