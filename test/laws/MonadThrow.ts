import * as fc from 'fast-check';
import { eqNumber, eqString } from '../../src';
import { Anon, Generic1, Generic1as2, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq, MonadThrow_1, MonadThrow_2 } from '../../src/typeclasses';

const laws = <f extends Generic2, e, a>(
  monadThrow: Anon<MonadThrow_2<f>>,
  e: fc.Arbitrary<e>,
  fa: fc.Arbitrary<Type2<f, e, a>>,
  eq: Eq<Type2<f, e, a>>['eq']
) => {
  const { bind, throwError } = monadThrow as MonadThrow_2<f>;
  return {
    leftZero: (): void =>
      void fc.assert(
        fc.property(e, fc.func(fa), (e, f) => eq(bind(f)(throwError(e)))(throwError(e)))
      ),
  };
};

export const makeMonadThrow1Laws =
  <f extends Generic1, e>(monadThrow: MonadThrow_1<f, e>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (arbError: fc.Arbitrary<e>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws<Generic1as2<f>, e, number>(
      monadThrow as unknown as MonadThrow_2<Generic1as2<f>>,
      arbError,
      makeArb(fc.double()),
      makeEq(eqNumber).eq
    );

export const makeMonadThrow2Laws =
  <f extends Generic2>(monadThrow: MonadThrow_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>) =>
  (makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<Type2<f, a, b>>) =>
    laws<f, string, number>(
      monadThrow,
      fc.string(),
      makeArb(fc.string(), fc.double()),
      makeEq(eqString, eqNumber).eq
    );
