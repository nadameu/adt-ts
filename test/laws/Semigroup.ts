import * as jsc from 'jsverify';
import { eqNumber, eqString } from '../../src';
import { Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Semigroup0, Semigroup1, Semigroup2 } from '../../src/typeclasses/Semigroup';

export const makeSemigroupLaws = <a>(semigroup: Semigroup0<a>) => (eq: Eq<a>) => (
  arb: jsc.Arbitrary<a>
) => {
  return {
    associativity: (): void =>
      jsc.assertForall(arb, arb, arb, (x, y, z) =>
        eq.eq(semigroup.append(semigroup.append(x)(y))(z))(
          semigroup.append(x)(semigroup.append(y)(z))
        )
      ),
  };
};

export const makeSemigroup1Laws = <f extends Generic1>({ append }: Semigroup1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  makeSemigroupLaws<Type1<f, number>>({ append } as Semigroup0<Type1<f, number>>)(makeEq(eqNumber))(
    makeArb(jsc.number)
  );

export const makeSemigroup2Laws = <f extends Generic2>({ append }: Semigroup2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) =>
  makeSemigroupLaws<Type2<f, string, number>>({ append } as Semigroup0<Type2<f, string, number>>)(
    makeEq(eqString, eqNumber)
  )(makeArb(jsc.string, jsc.number));
