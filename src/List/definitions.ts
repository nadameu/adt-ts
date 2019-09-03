export const enum ListTag {
  Cons,
  Snoc,
  Append,
  Nil,
}

export type NEList<a> = Cons<a> | Snoc<a> | Append<a>;

export type List<a> = NEList<a> | Nil;

export type ConsList<a> = NEConsList<a> | Nil;

export type SnocList<a> = NESnocList<a> | Nil;

export interface Cons<a> {
  tag: ListTag.Cons;
  head: a;
  tail: List<a>;
}
export interface NEConsList<a> extends Cons<a> {
  tail: ConsList<a>;
}
export const Cons: {
  <a>(head: a): {
    (tail: ConsList<a>): NEConsList<a>;
    (tail: List<a>): Cons<a>;
  };
} = <a>(head: a) => (tail: List<a>): any => ({ tag: ListTag.Cons, head, tail });
export const isCons: {
  <a>(list: ConsList<a>): list is NEConsList<a>;
  <a>(list: List<a>): list is Cons<a>;
} = <a>(list: List<a>): list is any => list.tag === ListTag.Cons;

export interface Snoc<a> {
  tag: ListTag.Snoc;
  init: List<a>;
  last: a;
}
export interface NESnocList<a> extends Snoc<a> {
  init: SnocList<a>;
}
export const Snoc: {
  <a>(init: NESnocList<a>): (last: a) => NESnocList<a>;
  <a>(init: List<a>): (last: a) => Snoc<a>;
} = <a>(init: List<a>) => (last: a): any => ({ tag: ListTag.Snoc, init, last });
export const isSnoc: {
  <a>(list: SnocList<a>): list is NESnocList<a>;
  <a>(list: List<a>): list is Snoc<a>;
} = <a>(list: List<a>): list is any => list.tag === ListTag.Snoc;

export interface Append<a> {
  tag: ListTag.Append;
  left: NEList<a>;
  right: NEList<a>;
}
export const Append = <a>(left: NEList<a>) => (right: NEList<a>): Append<a> => ({
  tag: ListTag.Append,
  left,
  right,
});
export const isAppend = <a>(list: List<a>): list is Append<a> => list.tag === ListTag.Append;

export interface Nil {
  tag: ListTag.Nil;
}
export const Nil: Nil = { tag: ListTag.Nil };
export const isNil = <a>(list: List<a>): list is Nil => list.tag === ListTag.Nil;
