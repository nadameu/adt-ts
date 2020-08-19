import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Anon, Generic1, Type1 } from '../../src/Generic';
import { Eq, Plus_1 } from '../../src/typeclasses';
import { leftIdentity, rightIdentity } from './helpers';

const laws = <f extends Generic1, a>(
  plus: Anon<Plus_1<f>>,
  fa: jsc.Arbitrary<Type1<f, a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { alt, empty, map } = plus as Plus_1<f>;
  return {
    leftIdentity: (): void => void jsc.assertForall(fa, leftIdentity(eq)(alt)(empty())),
    rightIdentity: (): void => void jsc.assertForall(fa, rightIdentity(eq)(alt)(empty())),
    annihilation: (): void =>
      void jsc.assertForall(jsc.fn(jsc.unit), f => leftIdentity(eq)(map)(f)(empty())),
  };
};

export const makePlusLaws = <f extends Generic1>(plus: Plus_1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws<f, number>(plus, makeArb(jsc.number), makeEq(eqNumber).eq);
