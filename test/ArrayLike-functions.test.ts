import { expect, test } from 'vitest';
import {
  AL,
  applicativeIterable,
  eitherBool,
  eqNumber,
  Just,
  Left,
  makeEqArrayLike,
  makeEqIterable,
  maybeBool,
  monoidString,
  Nothing,
  Right,
} from '../src';
import { Eq } from '../src/typeclasses';

const empty: ArrayLike<number> = { length: 0 };
const populated: ArrayLike<number> = { 0: 1, 1: 2, 2: 3, 3: 4, length: 4 };

const makeExpectEq = <a>(eq: Eq<a>) => {
  const isEq = makeEqArrayLike(eq).eq;
  return (xs: ArrayLike<a>, ys: ArrayLike<a>) => expect(isEq(xs)(ys)).toBe(true);
};
const expectEqNumber = makeExpectEq(eqNumber);

test('forEach', () => {
  const newArray: ArrayLike<number> = { length: 0 };
  const push = AL.forEach<number>(x => {
    (newArray as any)[(newArray.length as any)++] = x;
  });
  push(empty);
  expectEqNumber(newArray, empty);
  push(populated);
  expectEqNumber(newArray, populated);
});

test('forEachRight', () => {
  const newArray: ArrayLike<number> = { length: 0 };
  const unshift = AL.forEachRight<number>(x => {
    (newArray as any)[(newArray.length as any)++] = x;
  });
  unshift(empty);
  expectEqNumber(newArray, empty);
  unshift(populated);
  expectEqNumber(newArray, Array.from(populated).reverse());
});

test('forEachWithIndex', () => {
  const expectEq = makeExpectEq(makeEqArrayLike(eqNumber));
  const newArray: ArrayLike<[number, number]> = { length: 0 };
  const push = AL.forEachWithIndex<number>(i => x => {
    (newArray as any)[(newArray.length as any)++] = [i, x];
  });
  push(empty);
  expectEq(newArray, empty as ArrayLike<never>);
  push(populated);
  expectEq(
    newArray,
    Array.from(populated).map((x, i) => [i, x])
  );
});

test('mapWithIndex', () => {
  const mapF = AL.mapWithIndex<number, number>(i => x => x * x + i);
  const xs = mapF(empty);
  expectEqNumber(xs, empty);
  const ys = mapF(populated);
  expectEqNumber(
    ys,
    Array.from(populated).map((x, i) => x * x + i)
  );
});

test('foldlWithIndex', () => {
  const foldF = AL.foldlWithIndex<number, number>(i => acc => x => acc + i * x)(8);
  const x = foldF(empty);
  expect(x).toBe(8);
  const y = foldF(populated);
  expect(y).toBe(28);
});

test('foldrWithIndex', () => {
  const foldF = AL.foldrWithIndex<number, number>(i => x => acc => acc + i * x)(8);
  const x = foldF(empty);
  expect(x).toBe(8);
  const y = foldF(populated);
  expect(y).toBe(28);
});

test('filter', () => {
  const filterP = AL.filter((x: number) => x > 2);
  const xs = filterP(empty);
  expectEqNumber(xs, empty);
  const ys = filterP(populated);
  expectEqNumber(
    ys,
    Array.from(populated).filter(x => x > 2)
  );
});

test('filterMap', () => {
  const filterMapP = AL.filterMap(maybeBool((x: number) => x > 2));
  const xs = filterMapP(empty);
  expectEqNumber(xs, []);
  const ys = filterMapP(populated);
  expectEqNumber(ys, [3, 4]);
});

test('partitionMap', () => {
  const partitionMapP = AL.partitionMap(eitherBool((x: number) => x > 2));
  const xs = partitionMapP(empty);
  expectEqNumber(xs.left, empty);
  expectEqNumber(xs.right, empty);
  const ys = partitionMapP(populated);
  expectEqNumber(ys.left, [1, 2]);
  expectEqNumber(ys.right, [3, 4]);
});

test('wither', () => {
  const eq = makeEqIterable(makeEqArrayLike(eqNumber)).eq;
  const witherF = AL.wither(applicativeIterable)((x: number) =>
    x > 1 ? [x < 3 ? Just(x) : Nothing] : [Just(x - 3)]
  );
  const x = witherF(empty);
  expect(eq(x)([empty])).toBe(true);
  const y = witherF(populated);
  expect(eq(y)([[-2, 2]])).toBe(true);
});

test('wilt', () => {
  const eqArrNumber = makeEqArrayLike(eqNumber);
  const eq = makeEqIterable({
    eq: x => y => eqArrNumber.eq(x.left)(y.left) && eqArrNumber.eq(x.right)(y.right),
  } as Eq<{
    left: ArrayLike<number>;
    right: ArrayLike<number>;
  }>).eq;
  const wiltF = AL.wilt(applicativeIterable)((x: number) =>
    x > 1 ? [x < 3 ? Right(x) : Left(x)] : [Left(x - 3)]
  );
  const x = wiltF(empty);
  expect(eq(x)([{ left: empty, right: empty }])).toBe(true);
  const y = wiltF(populated);
  expect(eq(y)([{ left: [-2, 3, 4], right: [2] }])).toBe(true);
});

test('range', () => {
  expect(() => AL.range(1.5)(2)).toThrow();
  expect(() => AL.range(1)(2.5)).toThrow();
  expect(AL.range(1)(1)).toEqual([1]);
  expect(AL.range(2)(5)).toEqual([2, 3, 4, 5]);
  expect(AL.range(2)(-2)).toEqual([2, 1, 0, -1, -2]);
});

test('intercalate', () => {
  const intComma = AL.intercalate(monoidString)(', ');
  expect(intComma([])).toEqual('');
  expect(intComma({ '0': 'a', length: 1 })).toEqual('a');
  expect(intComma({ '0': 'a', '1': 'b', length: 2 })).toEqual('a, b');
  expect(intComma({ '0': 'a', '1': 'b', '2': 'c', length: 3 })).toEqual('a, b, c');
});
