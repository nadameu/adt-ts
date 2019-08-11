import jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Applicative1 } from '../../src/typeclasses/Applicative';
import { Eq } from '../../src/typeclasses/Eq';

export const makeApplicativeLaws = <f extends Generic1>(applicative: Applicative1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    identity: (): void =>
      jsc.assertForall(makeArb(jsc.number), v =>
        eq(applicative.apply(applicative.pure(<a>(a: a) => a))(v), v)
      ),
    homomorphism: (): void =>
      jsc.assertForall(jsc.fn(jsc.number), jsc.number, (f, x) =>
        eq(applicative.apply(applicative.pure(f))(applicative.pure(x)), applicative.pure(f(x)))
      ),
    interchange: (): void =>
      jsc.assertForall(makeArb(jsc.fn(jsc.number)), jsc.number, (u, y) =>
        eq(
          applicative.apply(u)(applicative.pure(y)),
          applicative.apply(applicative.pure((f: (_: number) => number) => f(y)))(u)
        )
      ),
  };
};
