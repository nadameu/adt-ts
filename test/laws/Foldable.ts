import * as jsc from 'jsverify';
import { eqNumber, monoidAdditive } from '../../src';
import { curry2, curry3 } from '../../src/curry';
import { Generic1, Generic2, Type1, Type2 } from '../../src/Generic';
import { Foldable1, Foldable2 } from '../../src/typeclasses/Foldable';

const laws = <a, i>(
  foldable: {
    foldl<b>(f: (_: b) => (_: i) => b): (z: b) => (fi: a) => b;
    foldr<b>(f: (_: i) => (_: b) => b): (z: b) => (fi: a) => b;
    foldMap<b>(monoid: {
      append(x: b, y: b): b;
      append(x: b): (y: b) => b;
      mempty(): b;
    }): (f: (_: i) => b) => (fi: a) => b;
  },
  a: jsc.Arbitrary<a>,
  i: jsc.Arbitrary<i>,
  monoid: { append(x: i, y: i): i; append(x: i): (y: i) => i; mempty(): i },
  eq: (x: i, y: i) => boolean
) => ({
  foldl: (): void =>
    jsc.assertForall(a, i, jsc.fn(jsc.fn(jsc.nat)), (x, z, f: (_: i) => (_: i) => i) =>
      eq(
        foldable.foldl(f)(z)(x),
        foldable.foldMap<(_: i) => i>({
          append: curry3((f, g, x) => g(f(x))),
          mempty: () => x => x,
        })(x => y => f(y)(x))(x)(z)
      )
    ),
  foldr: (): void =>
    jsc.assertForall(a, i, jsc.fn(jsc.fn(jsc.nat)), (x, z, f: (_: i) => (_: i) => i) =>
      eq(
        foldable.foldr(f)(z)(x),
        foldable.foldMap<(_: i) => i>({
          append: curry3((f, g, x) => f(g(x))),
          mempty: () => x => x,
        })(f)(x)(z)
      )
    ),
  foldMap: (): void =>
    jsc.assertForall(a, x =>
      eq(
        foldable.foldMap(monoid)(x => x)(x),
        foldable
          .foldMap<i[]>({ append: curry2((x, y) => x.concat(y)), mempty: () => [] })(x => [x])(x)
          .reduceRight((acc, x) => monoid.append(x, acc), monoid.mempty())
      )
    ),
});

export const makeFoldable1Laws = <f extends Generic1>(foldable: Foldable1<f>) => (
  makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>
) => laws(foldable, makeArb(jsc.nat), jsc.nat, monoidAdditive, eqNumber.eq);

export const makeFoldable2Laws = <f extends Generic2>(foldable: Foldable2<f>) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) => laws(foldable, makeArb(jsc.string, jsc.nat), jsc.nat, monoidAdditive, eqNumber.eq);
