export type LazyList<a> = {
  (): ConsResult<a> | NilResult;
};

export interface LazyCons<a> {
  (): ConsResult<a>;
}

export interface LazyNil {
  (): NilResult;
}

export interface ConsResult<a> {
  isCons: true;
  isNil: false;
  head: a;
  tail: LazyList<a>;
}
export const LazyCons = <a>(head: a) => (tail: LazyList<a>): LazyCons<a> => {
  const result = ConsResult(head)(tail);
  return () => result;
};
export const ConsResult = <a>(head: a) => (tail: LazyList<a>): ConsResult<a> => ({
  isCons: true,
  isNil: false,
  head,
  tail,
});
export const isLazyCons = <a>(list: LazyList<a>): list is LazyCons<a> => list().isCons;

export interface NilResult {
  isCons: false;
  isNil: true;
}
export const LazyNil: LazyNil = () => NilResult;
export const NilResult: NilResult = { isCons: false, isNil: true };
export const isLazyNil = <a>(list: LazyList<a>): list is LazyNil => list().isNil;
