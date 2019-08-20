import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1, Generic2, Type2 } from '../../src/Generic';
import { Foldable1, Foldable2 } from '../../src/typeclasses/Foldable';
import { Monoid } from '../../src/typeclasses/Monoid';

export const makeFoldable1Laws = <f extends Generic1>(foldable: Foldable1<f>) => (
  makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>
) => {
  const eq = eqNumber.eq;
  return {
    foldl: (): void =>
      jsc.assertForall(makeArb(jsc.number), jsc.number, (fx, z) =>
        eq(
          foldable.foldl<number, number>(acc => x => acc - x)(z)(fx),
          foldable
            .foldl<number, number[]>(xs => x => (xs.push(x), xs))([])(fx)
            .reduce((acc, x) => acc - x, z)
        )
      ),
    foldr: (): void =>
      jsc.assertForall(makeArb(jsc.number), jsc.number, (fx, z) =>
        eq(
          foldable.foldr<number, number>(x => acc => x - acc)(z)(fx),
          foldable
            .foldr<number, number[]>(x => xs => [x, ...xs])([])(fx)
            .reduceRight((acc, x) => x - acc, z)
        )
      ),
    foldMap: (): void =>
      jsc.assertForall(makeArb(jsc.number), jsc.fn(jsc.number), (fx, f) =>
        eq(
          foldable.foldMap<number>({
            append: (x, y) => x + y,
            mempty: () => 0,
          } as Monoid<number>)(f)(fx),
          foldable
            .foldl<number, number[]>(xs => x => (xs.push(x), xs))([])(fx)
            .reduce((acc, x) => acc + f(x), 0)
        )
      ),
  };
};

export const makeFoldable2Laws = <f extends Generic2>(foldable: Foldable2<f>) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => {
  const eq = eqNumber.eq;
  return {
    foldl: (): void =>
      jsc.assertForall(makeArb(jsc.number, jsc.number), jsc.number, (fx, z) =>
        eq(
          foldable.foldl<number, number>(acc => x => acc - x)(z)(fx),
          foldable
            .foldl<number, number[]>(xs => x => (xs.push(x), xs))([])(fx)
            .reduce((acc, x) => acc - x, z)
        )
      ),
    foldr: (): void =>
      jsc.assertForall(makeArb(jsc.number, jsc.number), jsc.number, (fx, z) =>
        eq(
          foldable.foldr<number, number>(x => acc => x - acc)(z)(fx),
          foldable
            .foldr<number, number[]>(x => xs => [x, ...xs])([])(fx)
            .reduceRight((acc, x) => x - acc, z)
        )
      ),
    foldMap: (): void =>
      jsc.assertForall(makeArb(jsc.number, jsc.number), jsc.fn(jsc.number), (fx, f) =>
        eq(
          foldable.foldMap<number>({
            NotGenericType: (undefined as unknown) as number,
            append: (x, y) => x + y,
            mempty: () => 0,
          })(f)(fx),
          foldable
            .foldl<number, number[]>(xs => x => (xs.push(x), xs))([])(fx)
            .reduce((acc, x) => acc + f(x), 0)
        )
      ),
  };
};
