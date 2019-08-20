import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Alt1, Alt2 } from '../../src/typeclasses/Alt';
import { Eq } from '../../src/typeclasses/Eq';

const laws = <a>(
  alt: { alt(x: a, y: a): a; map(f: Function, fa: a): a },
  a: jsc.Arbitrary<a>,
  f: jsc.Arbitrary<(_: any) => any>,
  eq: (x: a, y: a) => boolean
) => ({
  associativity: (): void =>
    jsc.assertForall(a, a, a, (x, y, z) =>
      eq(alt.alt(alt.alt(x, y), z), alt.alt(x, alt.alt(y, z)))
    ),
  distributivity: (): void =>
    jsc.assertForall(f, a, a, (f, x, y) =>
      eq(alt.alt(alt.map(f, x), alt.map(f, y)), alt.map(f, alt.alt(x, y)))
    ),
});

export const makeAlt1Laws = <f extends Generic1>(alt: Alt1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) => {
  return laws(alt, makeArb(jsc.number), jsc.fn(jsc.number), makeEq(eqNumber).eq);
};

export const makeAlt2Laws = <f extends Generic2>(alt: Alt2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  return laws(
    alt,
    makeArb(jsc.string, jsc.number),
    jsc.fn(jsc.number),
    makeEq(eqString, eqNumber).eq
  );
};
