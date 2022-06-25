import * as fc from 'fast-check';
import { eqNumber, eqString, identity } from '../../src';
import { Anon, Generic1, Generic2, Generic2as1, Type1, Type2 } from '../../src/Generic';
import { Eq, Functor_1, Functor_2 } from '../../src/typeclasses';
import { leftIdentity } from './helpers';

const laws = <f extends Generic1, a>(
  functor: Anon<Functor_1<f>>,
  a: fc.Arbitrary<a>,
  fa: fc.Arbitrary<Type1<f, a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { map } = functor as Functor_1<f>;
  return {
    identity: (): void => void fc.assert(fc.property(fa, leftIdentity(eq)(map)(identity))),
    composition: (): void =>
      void fc.assert(
        fc.property(fa, fc.func(a), fc.func(a), (x, f, g) =>
          eq(map(f)(map(g)(x)))(map(x => f(g(x)))(x))
        )
      ),
  };
};

export const makeFunctor1Laws =
  <f extends Generic1>(functor: Functor_1<f>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws<f, number>(
      functor,
      fc.double({ noNaN: true }),
      makeArb(fc.double({ noNaN: true })),
      makeEq(eqNumber).eq
    );

export const makeFunctor2Laws =
  <f extends Generic2>(functor: Functor_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>) =>
  (makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<Type2<f, a, b>>) =>
    laws<Generic2as1<f>, number>(
      functor,
      fc.double({ noNaN: true }),
      makeArb(fc.string(), fc.double({ noNaN: true })),
      makeEq(eqString, eqNumber).eq
    );
