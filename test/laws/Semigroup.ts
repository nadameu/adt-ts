import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Semigroup0, Semigroup1 } from '../../src/typeclasses/Semigroup';

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

export const makeSemigroup1Laws = <f extends Generic1>(semigroup: Semigroup1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  makeSemigroupLaws<Type1<f, number>>(semigroup as any)(makeEq(eqNumber))(makeArb(jsc.number));
