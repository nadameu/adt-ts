import { iterable, Just, Nothing } from '../src';

test('unfoldr1', () =>
  expect(
    Array.from(iterable.unfoldr1((x: number) => [x, x <= 3 ? Just(x + 1) : Nothing])(0))
  ).toEqual([0, 1, 2, 3, 4]));

test('compact', () => {
  const array = [1, 2, 4, 8, 16];
  expect(
    Array.from(
      iterable.compact(
        (function* () {
          for (const value of array) {
            if (Math.random() > 0.5) yield Nothing;
            yield Just(value);
          }
        })()
      )
    )
  ).toEqual(array);
});
