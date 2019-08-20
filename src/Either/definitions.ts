export type Either<a, b> = Left<a> | Right<b>;
export function Either<a, b>() {}

export interface Left<a> {
  isLeft: true;
  isRight: false;
  leftValue: a;
}
export const Left = <a>(leftValue: a): Left<a> => ({ isLeft: true, isRight: false, leftValue });

export interface Right<b> {
  isLeft: false;
  isRight: true;
  rightValue: b;
}
export const Right = <b>(rightValue: b): Right<b> => ({ isLeft: false, isRight: true, rightValue });
