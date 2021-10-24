import * as fc from 'fast-check';
import { eqNumber, eqString } from '../../src';
import { Anon, Generic1, Generic2, Generic2as1, Type1, Type2 } from '../../src/Generic';
import { Bind_1, Bind_2, Eq } from '../../src/typeclasses';

const laws = <f extends Generic1, a>(
  bind0: Anon<Bind_1<f>>,
  fa: fc.Arbitrary<Type1<f, a>>,
  f: fc.Arbitrary<(_: a) => Type1<f, a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { bind } = bind0 as Bind_1<f>;
  return {
    associativity: (): void =>
      void fc.assert(
        fc.property(fa, f, f, (x, f, g) =>
          eq(bind(g)(bind(f)(x)))(bind<a, a>(k => bind(g)(f(k)))(x))
        )
      ),
  };
};

export const makeBind1Laws =
  <f extends Generic1>(bind: Bind_1<f>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws<f, number>(bind, makeArb(fc.double()), fc.func(makeArb(fc.double())), makeEq(eqNumber).eq);

export const makeBind2Laws =
  <f extends Generic2>(bind: Bind_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>) =>
  (makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<Type2<f, a, b>>) =>
    laws<Generic2as1<f>, number>(
      bind,
      makeArb(fc.string(), fc.double()),
      fc.func(makeArb(fc.string(), fc.double())),
      makeEq(eqString, eqNumber).eq
    );
