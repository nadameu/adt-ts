import { flip } from '../../helpers/flip';
import { List } from '../../List/definitions';
import * as list from '../../List/functions';
import { Just, Maybe, Nothing } from '../../Maybe/definitions';
import {
  Applicative_1,
  Bind_1,
  Compactable_1,
  CompactOnly_1,
  filterDefault,
  filterMapDefault,
  FilterMapOnly_1,
  FilterOnly_1,
  Foldable_1,
  foldMapDefaultL,
  FoldROnly_1,
  Functor_1,
  Monoid_1,
  partitionDefaultFilter,
  partitionMapDefault,
  separateDefault,
  SeparateOnly_1,
  sequenceDefault,
  Traversable_1,
  traverseDefaultFoldableUnfoldable,
  TraverseOnly_1,
  UnfoldROnly_1,
  wiltDefault,
  witherDefault,
} from '../../typeclasses';
import { applyDefault } from '../../typeclasses/Bind';
import { TIterable } from '../internal';

const iteratorReturnResult: IteratorReturnResult<undefined> = { done: true, value: undefined };
const iteratorYieldResult = <a>(value: a): IteratorYieldResult<a> => ({ done: false, value });

export const map: Functor_1<TIterable>['map'] = <a, b>(f: (_: a) => b) => (fa: Iterable<a>) => ({
  [Symbol.iterator]() {
    const enum StateTag {
      YIELDING,
      DONE,
    }
    type State = { tag: StateTag.YIELDING; iterator: Iterator<a> } | { tag: StateTag.DONE };
    let state: State = { tag: StateTag.YIELDING, iterator: fa[Symbol.iterator]() };
    return {
      next() {
        switch (state.tag) {
          case StateTag.YIELDING:
            const result = state.iterator.next();
            if (result.done) {
              state = { tag: StateTag.DONE };
            } else {
              return iteratorYieldResult(f(result.value));
            }

          case StateTag.DONE:
            return iteratorReturnResult;
        }
      },
    };
  },
});

export const pure: Applicative_1<TIterable>['pure'] = (value) => ({
  [Symbol.iterator]() {
    let done = false;
    return {
      next() {
        if (done) return iteratorReturnResult;
        done = true;
        return iteratorYieldResult(value);
      },
    };
  },
});

// export const bind: Bind_1<TIterable>['bind'] = <a, b>(f: (_: a) => Iterable<b>) => (
//   fa: Iterable<a>
// ): Iterable<b> => foldl(append)(mempty<b>())(map(f)(fa));

export const bind = <a, b>(f: (_: a) => Iterable<b>) => (fa: Iterable<a>): Iterable<b> => ({
  [Symbol.iterator]() {
    const enum Tag {
      OUTER,
      INNER,
      DONE,
    }
    type State =
      | { tag: Tag.OUTER; outer: Iterator<a> }
      | { tag: Tag.INNER; outer: Iterator<a>; inner: Iterator<b> }
      | { tag: Tag.DONE };
    let state: State = { tag: Tag.OUTER, outer: fa[Symbol.iterator]() };
    return {
      next() {
        while (true)
          switch (state.tag) {
            case Tag.OUTER: {
              const result = state.outer.next();
              if (result.done) {
                state = { tag: Tag.DONE };
                break;
              } else {
                state = {
                  tag: Tag.INNER,
                  outer: state.outer,
                  inner: f(result.value)[Symbol.iterator](),
                };
                break;
              }
            }

            case Tag.INNER: {
              const result = state.inner.next();
              if (result.done) {
                state = { tag: Tag.OUTER, outer: state.outer };
                break;
              } else {
                return iteratorYieldResult(result.value);
              }
            }

            case Tag.DONE:
              return iteratorReturnResult;
          }
      },
    };
  },
});

export const apply = applyDefault({ bind, map } as Bind_1<TIterable>);

export const append = <a>(xs: Iterable<a>) => (ys: Iterable<a>): Iterable<a> => ({
  [Symbol.iterator]() {
    const enum State {
      LEFT,
      RIGHT,
      DONE,
    }
    let state: State = State.LEFT;
    let iterator = xs[Symbol.iterator]();
    return {
      next() {
        while (true) {
          if (state === State.DONE) return iteratorReturnResult;
          const result = iterator.next();
          if (result.done) {
            if (state === State.LEFT) {
              state = State.RIGHT;
              iterator = ys[Symbol.iterator]();
            } else state = State.DONE;
          } else return iteratorYieldResult(result.value);
        }
      },
    };
  },
});

export const mempty: Monoid_1<TIterable>['mempty'] = () => [];

export const alt = append;
export const empty = mempty;

export const foldl = <a, b>(f: (_: b) => (_: a) => b) => (b0: b) => (xs: Iterable<a>): b => {
  let acc = b0;
  for (const x of xs) {
    acc = f(acc)(x);
  }
  return acc;
};

export const foldr = <a, b>(f: (_: a) => (_: b) => b) => (b0: b) => (xs: Iterable<a>): b => {
  const reversed = foldl<a, List<a>>(flip(list.cons))(list.nil)(xs);
  return list.foldl(flip(f))(b0)(reversed);
};

export const unfoldr1 = <a, b>(f: (_: b) => [a, Maybe<b>]) => (b: b): Iterable<a> =>
  unfoldr<a, Maybe<b>>((x) => (x.isNothing ? x : Just(f(x.value))))(Just(b));

export const unfoldr = <a, b>(f: (_: b) => Maybe<[a, b]>) => (b: b): Iterable<a> => ({
  [Symbol.iterator]() {
    let next = b;
    return {
      next() {
        const result = f(next);
        if (result.isJust) {
          let value: a;
          [value, next] = result.value;
          return iteratorYieldResult(value);
        } else return iteratorReturnResult;
      },
    };
  },
});

export const foldMap = foldMapDefaultL({ foldl } as Foldable_1<TIterable>);

export const traverse = traverseDefaultFoldableUnfoldable({ foldr, unfoldr } as FoldROnly_1<
  TIterable
> &
  UnfoldROnly_1<TIterable>);

export const sequence = sequenceDefault({ traverse } as Traversable_1<TIterable>);

export const range = (start: number) => (end: number): Iterable<number> => {
  if (!Number.isInteger(start) || !Number.isInteger(end))
    throw new TypeError('Start and end must be integers.');
  let step = start < end ? 1 : -1;
  const stop = end + step;
  return unfoldr<number, number>((i) => (i !== stop ? Just([i, i + step]) : Nothing))(start);
};

export const fromArray = <a>(xs: ArrayLike<a>): Iterable<a> => {
  const len = xs.length;
  return unfoldr<a, number>((index) => (index < len ? Just([xs[index], index + 1]) : Nothing))(0);
};

export const compact: Compactable_1<TIterable>['compact'] = <a>(
  fma: Iterable<Maybe<a>>
): Iterable<a> => ({
  [Symbol.iterator]() {
    const iter = fma[Symbol.iterator]();
    return {
      next() {
        for (let result = iter.next(); !result.done; result = iter.next())
          if (result.value.isJust) return iteratorYieldResult(result.value.value);
        return iteratorReturnResult;
      },
    };
  },
});

export const separate = separateDefault({
  map,
  compact,
} as CompactOnly_1<TIterable> & Functor_1<TIterable>);

export const filterMap = filterMapDefault({
  map,
  compact,
} as CompactOnly_1<TIterable> & Functor_1<TIterable>);

export const filter = filterDefault({ filterMap } as FilterMapOnly_1<TIterable>);

export const partition = partitionDefaultFilter({
  filter,
} as FilterOnly_1<TIterable>);

export const partitionMap = partitionMapDefault({ map, separate } as Functor_1<TIterable> &
  SeparateOnly_1<TIterable>);

export const wilt = wiltDefault({ separate, traverse } as SeparateOnly_1<TIterable> &
  TraverseOnly_1<TIterable>);

export const wither = witherDefault({ compact, traverse } as CompactOnly_1<TIterable> &
  TraverseOnly_1<TIterable>);
