import jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Foldable1 } from '../../src/typeclasses/Foldable';

export const makeFoldableLaws = <f extends Generic1>(foldable: Foldable1<f>) => (
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
