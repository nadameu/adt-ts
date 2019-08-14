export type Either<a, b> = Left<a> | Right<b>;
export function Either<a, b>() {}

export interface Left<a> {
  isLeft: true;
  isRight: false;
  leftValue: a;
}

export interface Right<b> {
  isLeft: false;
  isRight: true;
  rightValue: b;
}

const make = (isLeft: boolean) => {
  const proto = Object.create(Either.prototype);
  proto.isLeft = isLeft;
  proto.isRight = !isLeft;
  if (isLeft)
    return function Left<a>(leftValue: a) {
      const left = Object.create(proto);
      left.leftValue = leftValue;
      return left;
    };
  return function Right<b>(rightValue: b) {
    const right = Object.create(proto);
    right.rightValue = rightValue;
    return right;
  };
};

export const Left: <a>(leftValue: a) => Left<a> = /*#__PURE__*/ make(true);
export const Right: <b>(rightValue: b) => Right<b> = /*#__PURE__*/ make(false);
