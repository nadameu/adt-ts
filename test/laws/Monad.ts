import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Anon, Generic1, Generic2, Generic2as1, Type1, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Monad_1, Monad_2 } from '../../src/typeclasses/Monad';

const laws = <f extends Generic1, a>(
  monad: Anon<Monad_1<f>>,
  fa: jsc.Arbitrary<Type1<f, a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { bind, pure } = monad as Monad_1<f>;
  return {
    leftIdentity: (): void =>
      jsc.assertForall(jsc.number, jsc.fn(fa), (x, f) => eq(bind(f)(pure(x)))(f(x))),
    rightIdentity: (): void => jsc.assertForall(fa, x => eq(bind(pure)(x))(x)),
  };
};

export const makeMonad1Laws = <f extends Generic1>(monad: Monad_1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws<f, number>(monad, makeArb(jsc.number), makeEq(eqNumber).eq);

export const makeMonad2Laws = <f extends Generic2>(monad: Monad_2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) =>
  laws<Generic2as1<f>, number>(
    monad,
    makeArb(jsc.string, jsc.number),
    makeEq(eqString, eqNumber).eq
  );
