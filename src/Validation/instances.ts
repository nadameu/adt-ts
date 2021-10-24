import { applicativeEither, Either, functorEither, Left, Right } from '../Either';
import { Anon, Generic1, Generic2, Type1 } from '../Generic';
import {
  Alt_1,
  Alt_2,
  Applicative_1,
  Applicative_2,
  Apply_1,
  Apply_2,
  Semigroup_0,
  Semigroup_1,
} from '../typeclasses';

export const functorValidation = functorEither;

interface TEitherF<f extends Generic1> extends Generic2 {
  type: Either<Type1<f, this['a']>, this['b']>;
}
interface TEither1<a> extends Generic1 {
  type: Either<a, this['a']>;
}

const makeApplyFunctionValidation: {
  <f extends Generic1>(semigroup: Semigroup_1<f>): Apply_2<TEitherF<f>>['apply'];
  <s>(semigroup: Semigroup_0<s>): Apply_1<TEither1<s>>['apply'];
} =
  <s>({ append }: Anon<Semigroup_0<s>>) =>
  <a, b>(ff: Either<s, (_: a) => b>) =>
  (fa: Either<s, a>): Either<s, b> =>
    ff.isLeft
      ? fa.isLeft
        ? Left(append(ff.leftValue)(fa.leftValue))
        : ff
      : fa.isLeft
      ? fa
      : Right(ff.rightValue(fa.rightValue));

export const makeApplyValidation: {
  <f extends Generic1>(semigroup: Semigroup_1<f>): Apply_2<TEitherF<f>>;
  <s>(semigroup: Semigroup_0<s>): Apply_1<TEither1<s>>;
} = <s>({ append }: Anon<Semigroup_0<s>>) =>
  ({
    ...functorEither,
    apply: makeApplyFunctionValidation({ append } as Semigroup_0<s>),
  } as Apply_1<TEither1<unknown>> & Apply_2<TEitherF<Generic1>>);

export const makeApplicativeValidation: {
  <f extends Generic1>(semigroup: Semigroup_1<f>): Applicative_2<TEitherF<f>>;
  <s>(semigroup: Semigroup_0<s>): Applicative_1<TEither1<s>>;
} = <s>({ append }: Anon<Semigroup_0<s>>) =>
  ({
    ...applicativeEither,
    apply: makeApplyFunctionValidation({ append } as Semigroup_0<s>),
  } as Applicative_1<TEither1<unknown>> & Applicative_2<TEitherF<Generic1>>);

export const makeAltValidation: {
  <f extends Generic1>(semigroup: Semigroup_1<f>): Alt_2<TEitherF<f>>;
  <s>(semigroup: Semigroup_0<s>): Alt_1<TEither1<s>>;
} = <s>({ append }: Anon<Semigroup_0<s>>) =>
  ({
    ...functorEither,
    alt:
      <a>(fx: Either<s, a>) =>
      (fy: Either<s, a>) =>
        fx.isLeft ? (fy.isLeft ? Left(append(fx.leftValue)(fy.leftValue)) : fy) : fx,
  } as Alt_1<TEither1<unknown>> & Alt_2<TEitherF<Generic1>>);
