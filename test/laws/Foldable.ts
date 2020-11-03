import * as jsc from 'jsverify';
import {
  array,
  eqNumber,
  flip,
  makeEqArrayLike,
  makeMonoidDual,
  monoidArrayLike,
  monoidEndo,
} from '../../src';
import { Anon, Generic1, Generic2, Generic2as1, Type1, Type2 } from '../../src/Generic';
import { Eq, Foldable_1, Foldable_2 } from '../../src/typeclasses';

const laws = <f extends Generic1, a>(
  foldable: Anon<Foldable_1<f>>,
  a: jsc.Arbitrary<a>,
  fa: jsc.Arbitrary<Type1<f, a>>,
  eq: Eq<a>['eq']
) => {
  const { foldMap, foldl, foldr } = foldable as Foldable_1<f>;
  return {
    foldl: (): void =>
      void jsc.assertForall(fa, a, jsc.fn(jsc.fn(a)), (fa, z, f) =>
        eq(foldl(f)(z)(fa))(foldMap(makeMonoidDual(monoidEndo))(flip(f))(fa)(z))
      ),
    foldr: (): void =>
      void jsc.assertForall(fa, a, jsc.fn(jsc.fn(a)), (fa, z, f) =>
        eq(foldr(f)(z)(fa))(foldMap(monoidEndo)(f)(fa)(z))
      ),
    foldMap: (): void =>
      void jsc.assertForall(fa, fa =>
        makeEqArrayLike({ eq } as Eq<a>).eq(foldMap(monoidArrayLike)(array.pure)(fa))(
          foldl<a, a[]>(xs => x => (xs.push(x), xs))([])(fa)
        )
      ),
  };
};

export const makeFoldable1Laws = <f extends Generic1>(foldable: Foldable_1<f>) => (
  makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>
) => laws<f, number>(foldable, jsc.nat, makeArb(jsc.nat), eqNumber.eq);

export const makeFoldable2Laws = <f extends Generic2>(foldable: Foldable_2<f>) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => laws<Generic2as1<f>, number>(foldable, jsc.nat, makeArb(jsc.string, jsc.nat), eqNumber.eq);
