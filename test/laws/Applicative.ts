import * as fc from 'fast-check';
import { eqNumber, eqString, flip, identity, thrush } from '../../src';
import { Anon, Generic1, Generic2, Generic2as1, Type1, Type2 } from '../../src/Generic';
import { Applicative_1, Applicative_2, Eq } from '../../src/typeclasses';
import { homomorphism, leftIdentity } from './helpers';

const laws = <f extends Generic1, a>(
  applicative: Anon<Applicative_1<f>>,
  a: fc.Arbitrary<a>,
  f: fc.Arbitrary<(_: a) => a>,
  fa: fc.Arbitrary<Type1<f, a>>,
  ff: fc.Arbitrary<Type1<f, (_: a) => a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { apply, pure } = applicative as Applicative_1<f>;
  return {
    identity: (): void => void fc.assert(fc.property(fa, leftIdentity(eq)(apply)(pure(identity)))),
    homomorphism: (): void =>
      void fc.assert(
        fc.property(f, a, (f, x) => homomorphism(eq)(pure)(apply)(flip(thrush as any))(f)(x))
      ),
    interchange: (): void =>
      void fc.assert(
        fc.property(ff, a, (u, y) => eq(apply(u)(pure(y)))(apply(pure(thrush(y)))(u)))
      ),
  };
};

export const makeApplicative1Laws =
  <f extends Generic1>(applicative: Applicative_1<f>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws(
      applicative,
      fc.double({ noNaN: true }),
      fc.func(fc.double({ noNaN: true })),
      makeArb(fc.double({ noNaN: true })),
      makeArb(fc.func(fc.double({ noNaN: true }))),
      makeEq(eqNumber).eq
    );

export const makeApplicative2Laws =
  <f extends Generic2>(applicative: Applicative_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>) =>
  (makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<Type2<f, a, b>>) =>
    laws<Generic2as1<f>, number>(
      applicative,
      fc.double({ noNaN: true }),
      fc.func(fc.double({ noNaN: true })),
      makeArb(fc.string(), fc.double({ noNaN: true })),
      makeArb(fc.string(), fc.func(fc.double({ noNaN: true }))),
      makeEq(eqString, eqNumber).eq
    );
