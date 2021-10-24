export type List<a> = Cons<a> | Nil;

export interface Cons<a> {
  isCons: true;
  isNil: false;
  head: a;
  tail: List<a>;
}
export const Cons =
  <a>(head: a) =>
  (tail: List<a>): Cons<a> => ({
    isCons: true,
    isNil: false,
    head,
    tail,
  });
export interface Nil {
  isCons: false;
  isNil: true;
}
export const Nil: Nil = { isCons: false, isNil: true };
