import * as fc from 'fast-check';
import { Eq, Group_0 } from '../../src/typeclasses';

const laws = <a>(group: Group_0<a>, a: fc.Arbitrary<a>, eq: Eq<a>['eq']) => {
  const { append, ginverse, mempty } = group;
  return {
    rightInverse: (): void =>
      void fc.assert(fc.property(a, x => eq(append(x)(ginverse(x)))(mempty()))),
    leftInverse: (): void =>
      void fc.assert(fc.property(a, x => eq(append(ginverse(x))(x))(mempty()))),
  };
};

export const makeGroupLaws =
  <a>(group: Group_0<a>) =>
  (eq: Eq<a>) =>
  (arb: fc.Arbitrary<a>) =>
    laws(group, arb, eq.eq);
