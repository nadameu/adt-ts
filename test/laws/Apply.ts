import * as fc from 'fast-check';
import { compose, eqNumber, eqString } from '../../src';
import { Anon, Generic1, Generic2, Generic2as1, Type1, Type2 } from '../../src/Generic';
import { Apply_1, Apply_2, Eq } from '../../src/typeclasses';

const laws = <f extends Generic1, a>(
  apply0: Anon<Apply_1<f>>,
  fa: fc.Arbitrary<Type1<f, a>>,
  ff: fc.Arbitrary<Type1<f, (_: a) => a>>,
  eq: (_: Type1<f, a>) => (_: Type1<f, a>) => boolean
) => {
  const { apply, map } = apply0 as Apply_1<f>;
  return {
    composition: (): void =>
      void fc.assert(
        fc.property(ff, ff, fa, (a, u, v) =>
          eq(apply(apply(map(compose)(a))(u))(v))(apply(a)(apply(u)(v)))
        )
      ),
  };
};

export const makeApply1Laws =
  <f extends Generic1>(apply: Apply_1<f>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws<f, number>(
      apply,
      makeArb(fc.double()),
      makeArb(fc.func(fc.double())),
      makeEq(eqNumber).eq
    );

export const makeApply2Laws =
  <f extends Generic2>(apply: Apply_2<f>) =>
  (makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>) =>
  (makeArb: <a, b>(arbA: fc.Arbitrary<a>, arbB: fc.Arbitrary<b>) => fc.Arbitrary<Type2<f, a, b>>) =>
    laws<Generic2as1<f>, number>(
      apply,
      makeArb(fc.string(), fc.double()),
      makeArb(fc.string(), fc.func(fc.double())),
      makeEq(eqString, eqNumber).eq
    );
