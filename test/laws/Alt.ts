import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1, Generic2, Type2 } from '../../src/Generic';
import { Alt1, Alt2 } from '../../src/typeclasses/Alt';
import { Eq } from '../../src/typeclasses/Eq';

export const makeAlt1Laws = <f extends Generic1>(alt: Alt1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  const eq = makeEq(eqNumber).eq;
  return {
    associativity: (): void =>
      jsc.assertForall(makeArb(jsc.number), makeArb(jsc.number), makeArb(jsc.number), (x, y, z) =>
        eq(alt.alt(alt.alt(x, y), z), alt.alt(x, alt.alt(y, z)))
      ),
    distributivity: (): void =>
      jsc.assertForall(jsc.fn(jsc.number), makeArb(jsc.number), makeArb(jsc.number), (f, x, y) =>
        eq(alt.alt(alt.map(f, x), alt.map(f, y)), alt.map(f, alt.alt(x, y)))
      ),
  };
};

export const makeAlt2Laws = <f extends Generic2>(alt: Alt2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  const eq = makeEq(eqNumber, eqNumber).eq;
  return {
    associativity: (): void =>
      jsc.assertForall(
        makeArb(jsc.number, jsc.number),
        makeArb(jsc.number, jsc.number),
        makeArb(jsc.number, jsc.number),
        (x, y, z) => eq(alt.alt(alt.alt(x, y), z), alt.alt(x, alt.alt(y, z)))
      ),
    distributivity: (): void =>
      jsc.assertForall(
        jsc.fn(jsc.number),
        makeArb(jsc.number, jsc.number),
        makeArb(jsc.number, jsc.number),
        (f, x, y) => eq(alt.alt(alt.map(f, x), alt.map(f, y)), alt.map(f, alt.alt(x, y)))
      ),
  };
};
