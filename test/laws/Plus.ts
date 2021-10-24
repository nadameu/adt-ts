import * as fc from 'fast-check';
import { eqNumber } from '../../src';
import { Anon, Generic1, Type1 } from '../../src/Generic';
import { Eq, Plus_1 } from '../../src/typeclasses';
import { leftIdentity, rightIdentity } from './helpers';

const laws = <f extends Generic1, a>(
  plus: Anon<Plus_1<f>>,
  fa: fc.Arbitrary<Type1<f, a>>,
  eq: Eq<Type1<f, a>>['eq']
) => {
  const { alt, empty, map } = plus as Plus_1<f>;
  return {
    leftIdentity: (): void => void fc.assert(fc.property(fa, leftIdentity(eq)(alt)(empty()))),
    rightIdentity: (): void => void fc.assert(fc.property(fa, rightIdentity(eq)(alt)(empty()))),
    annihilation: (): void =>
      void fc.assert(
        fc.property(fc.func(fc.constant(undefined)), f => leftIdentity(eq)(map)(f)(empty()))
      ),
  };
};

export const makePlusLaws =
  <f extends Generic1>(plus: Plus_1<f>) =>
  (makeEq: <a>(_: Eq<a>) => Eq<Type1<f, a>>) =>
  (makeArb: <a>(arb: fc.Arbitrary<a>) => fc.Arbitrary<Type1<f, a>>) =>
    laws<f, number>(plus, makeArb(fc.double()), makeEq(eqNumber).eq);
