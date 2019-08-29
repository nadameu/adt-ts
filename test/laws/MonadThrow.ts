import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Generic1, Generic1as2, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { MonadThrow, MonadThrow1, MonadThrow2 } from '../../src/typeclasses/MonadThrow';

const laws = <f extends Generic2, e, a>(
  monadThrow: MonadThrow,
  fa: jsc.Arbitrary<Type2<f, e, a>>,
  eq: Eq<Type2<f, e, a>>['eq']
) => {
  const { bind, throwError } = monadThrow as MonadThrow2<f>;
  return {
    leftZero: (): void =>
      jsc.assertForall(jsc.number, jsc.fn(fa), (e, f) => eq(bind(f)(throwError(e)))(throwError(e))),
  };
};

export const makeMonadThrow1Laws = <f extends Generic1>(monadThrow: MonadThrow1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws<Generic1as2<f>, undefined, number>(
    (monadThrow as unknown) as MonadThrow,
    makeArb(jsc.number),
    makeEq(eqNumber).eq
  );

export const makeMonadThrow2Laws = <f extends Generic2>(monadThrow: MonadThrow2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) =>
  laws<f, string, number>(
    monadThrow as MonadThrow,
    makeArb(jsc.string, jsc.number),
    makeEq(eqString, eqNumber).eq
  );
