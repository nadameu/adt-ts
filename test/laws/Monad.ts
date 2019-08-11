import jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Monad1 } from '../../src/typeclasses/Monad';
import { Eq } from '../../src/typeclasses/Eq';

export const makeMonadLaws = <f extends Generic1>(monad: Monad1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    leftIdentity: (): void =>
      jsc.assertForall(jsc.number, jsc.fn(makeArb(jsc.number)), (x, f) =>
        eq(monad.bind(f)(monad.pure(x)), f(x))
      ),
    rightIdentity: (): void =>
      jsc.assertForall(makeArb(jsc.number), x => eq(monad.bind(monad.pure)(x), x)),
  };
};
