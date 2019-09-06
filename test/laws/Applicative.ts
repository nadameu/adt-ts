import * as jsc from 'jsverify';
import { eqNumber, eqString, flip, identity, thrush } from '../../src';
import { Generic1, Generic2, Generic2as1, Type1, Type2 } from '../../src/Generic';
import { Applicative, Applicative_1, Applicative_2 } from '../../src/typeclasses/Applicative';
import { Eq } from '../../src/typeclasses/Eq';
import { homomorphism, leftIdentity } from './helpers';

const laws = <f extends Generic1, a>(
  applicative: Applicative,
  a: jsc.Arbitrary<a>,
  f: jsc.Arbitrary<(_: a) => a>,
  fa: jsc.Arbitrary<Type1<f, a>>,
  ff: jsc.Arbitrary<Type1<f, (_: a) => a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { apply, pure } = applicative as Applicative_1<f>;
  return {
    identity: (): void => jsc.assertForall(fa, leftIdentity(eq)(apply)(pure(identity))),
    homomorphism: (): void =>
      jsc.assertForall(f, a, (f, x) => homomorphism(eq)(pure)(apply)(flip(thrush) as any)(f)(x)),
    interchange: (): void =>
      jsc.assertForall(ff, a, (u, y) => eq(apply(u)(pure(y)))(apply(pure(thrush(y)))(u))),
  };
};

export const makeApplicative1Laws = <f extends Generic1>(applicative: Applicative_1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws(
    applicative as Applicative,
    jsc.number,
    jsc.fn(jsc.number),
    makeArb(jsc.number),
    makeArb(jsc.fn(jsc.number)),
    makeEq(eqNumber).eq
  );

export const makeApplicative2Laws = <f extends Generic2>(applicative: Applicative_2<f>) => (
  makeEq: <a, b>(eqA: Eq<a>, eqB: Eq<b>) => Eq<Type2<f, a, b>>
) => (
  makeArb: <a, b>(arbA: jsc.Arbitrary<a>, arbB: jsc.Arbitrary<b>) => jsc.Arbitrary<Type2<f, a, b>>
) =>
  laws<Generic2as1<f>, number>(
    applicative as Applicative,
    jsc.number,
    jsc.fn(jsc.number),
    makeArb(jsc.string, jsc.number),
    makeArb(jsc.string, jsc.fn(jsc.number)),
    makeEq(eqString, eqNumber).eq
  );
