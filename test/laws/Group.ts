import * as jsc from 'jsverify';
import { Eq } from '../../src/typeclasses/Eq';
import { Group_0 } from '../../src/typeclasses/Group';

const laws = <a>(group: Group_0<a>, a: jsc.Arbitrary<a>, eq: Eq<a>['eq']) => {
  const { append, ginverse, mempty } = group;
  return {
    rightInverse: (): void => jsc.assertForall(a, x => eq(append(x)(ginverse(x)))(mempty())),
    leftInverse: (): void => jsc.assertForall(a, x => eq(append(ginverse(x))(x))(mempty())),
  };
};

export const makeGroupLaws = <a>(group: Group_0<a>) => (eq: Eq<a>) => (arb: jsc.Arbitrary<a>) =>
  laws(group, arb, eq.eq);
