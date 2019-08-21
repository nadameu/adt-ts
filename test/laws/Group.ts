import * as jsc from 'jsverify';
import { Eq } from '../../src/typeclasses/Eq';
import { Group } from '../../src/typeclasses/Group';

export const makeGroupLaws = <a>(group: Group<a>) => (eq: Eq<a>) => (arb: jsc.Arbitrary<a>) => {
  return {
    rightInverse: (): void =>
      jsc.assertForall(arb, x => eq.eq(group.append(x)(group.ginverse(x)))(group.mempty())),
    leftInverse: (): void =>
      jsc.assertForall(arb, x => eq.eq(group.append(group.ginverse(x))(x))(group.mempty())),
  };
};
