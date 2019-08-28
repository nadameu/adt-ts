export type Either<a, b> = Left<a> | Right<b>;

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

export const either = <a, c>(f: (_: a) => c) => <b>(g: (_: b) => c) => (fab: Either<a, b>): c =>
  fab.isLeft ? f(fab.leftValue) : g(fab.rightValue);
