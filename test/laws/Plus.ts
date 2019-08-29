import * as jsc from 'jsverify';
import { eqNumber } from '../../src';
import { Generic1, Type1 } from '../../src/Generic';
import { Eq } from '../../src/typeclasses/Eq';
import { Plus, Plus1 } from '../../src/typeclasses/Plus';
import { leftIdentity, rightIdentity } from './helpers';

const laws = <f extends Generic1, a>(
  plus: Plus,
  fa: jsc.Arbitrary<Type1<f, a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { alt, empty, map } = plus as Plus1<f>;
  return {
    leftIdentity: (): void => jsc.assertForall(fa, leftIdentity(eq)(alt)(empty())),
    rightIdentity: (): void => jsc.assertForall(fa, rightIdentity(eq)(alt)(empty())),
    annihilation: (): void =>
      jsc.assertForall(jsc.fn(jsc.unit), f => leftIdentity(eq)(map)(f)(empty())),
  };
};

export const makePlusLaws = <f extends Generic1>(plus: Plus1<f>) => (
  makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>
) => (makeArb: <a>(arb: jsc.Arbitrary<a>) => jsc.Arbitrary<Type1<f, a>>) =>
  laws<f, number>(plus as Plus, makeArb(jsc.number), makeEq(eqNumber).eq);
