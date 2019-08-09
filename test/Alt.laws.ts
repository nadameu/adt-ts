import jsc from 'jsverify';
import { eqNumber } from '../src';
import { Generic1, Type1 } from '../src/Generic';
import { Alt1 } from '../src/typeclasses/Alt';
import { Eq } from '../src/typeclasses/Eq';

export const makeAltLaws = <f extends Generic1>(alt: Alt1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    associativity: (): void =>
      jsc.assertForall(
        makeArb(jsc.number),
        makeArb(jsc.number),
        makeArb(jsc.number),
        (x, y, z) => eq(alt.alt(alt.alt(x, y), z), alt.alt(x, alt.alt(y, z)))
      ),
    distributivity: (): void =>
      jsc.assertForall(
        jsc.fn(jsc.number),
        makeArb(jsc.number),
        makeArb(jsc.number),
        (f, x, y) =>
          eq(alt.alt(alt.map(f)(x), alt.map(f)(y)), alt.map(f)(alt.alt(x, y)))
      )
  };
};
