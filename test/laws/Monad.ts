import * as fc from 'fast-check';
import { eqNumber, eqString } from '../../src';
import { Anon, Generic1, Generic2, Generic2as1, Type1, Type2 } from '../../src/Generic';
import { Eq, Monad_1, Monad_2 } from '../../src/typeclasses';

const laws = <f extends Generic1, a>(
  monad: Anon<Monad_1<f>>,
  fa: fc.Arbitrary<Type1<f, a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { bind, pure } = monad as Monad_1<f>;
  return {
    leftIdentity: (): void =>
      void fc.assert(fc.property(fc.double(), fc.func(fa), (x, f) => eq(bind(f)(pure(x)))(f(x)))),
    rightIdentity: (): void => void fc.assert(fc.property(fa, x => eq(bind(pure)(x))(x))),
  };
};

export const makeMonad1Laws =
  <f extends Generic1>(monad: Monad_1<f>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws<f, number>(monad, makeArb(fc.double()), makeEq(eqNumber).eq);

export const makeMonad2Laws =
  <f extends Generic2>(monad: Monad_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>) =>
  (makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<Type2<f, a, b>>) =>
    laws<Generic2as1<f>, number>(
      monad,
      makeArb(fc.string(), fc.double()),
      makeEq(eqString, eqNumber).eq
    );
