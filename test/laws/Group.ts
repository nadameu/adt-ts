import * as jsc from 'jsverify';
import { Eq, Group_0 } from '../../src/typeclasses';

const laws = <a>(group: Group_0<a>, a: jsc.Arbitrary<a>, eq: Eq<a>['eq']) => {
  const { append, ginverse, mempty } = group;
  return {
    rightInverse: (): void => void jsc.assertForall(a, x => eq(append(x)(ginverse(x)))(mempty())),
    leftInverse: (): void => void jsc.assertForall(a, x => eq(append(ginverse(x))(x))(mempty())),
  };
};

export const makeGroupLaws = <a>(group: Group_0<a>) => (eq: Eq<a>) => (arb: jsc.Arbitrary<a>) =>
  laws(group, arb, eq.eq);
