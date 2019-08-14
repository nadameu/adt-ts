import { Eq } from '../../typeclasses/Eq';
import { Either } from '../definitions';

export const makeEqEither = <a, b>(eqA: Eq<a>, eqB: Eq<b>) =>
  ({
    eq: (fx, fy) =>
      fx.isLeft
        ? fy.isLeft && eqA.eq(fx.leftValue, fy.leftValue)
        : fy.isLeft
        ? false
        : eqB.eq(fx.rightValue, fy.rightValue),
  } as Eq<Either<a, b>>);
