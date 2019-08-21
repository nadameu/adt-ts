import * as jsc from 'jsverify';
import { curry2 } from '../src/curry';

const arity2 = jsc
  .fn(jsc.fn(jsc.number))
  .smap(f => (a: number, b: number) => f(a)(b), f => a => b => f(a, b));
const numberOrUndefined = jsc.sum([jsc.number, jsc.constant(undefined)]);

test('0 arguments should throw', () => {
  jsc.assertForall(arity2, numberOrUndefined, (f, a) => {
    const curried = curry2(f);
    //@ts-ignore
    expect(() => curried()).toThrow();
    //@ts-ignore
    expect(() => curried(a)()).toThrow();
    return true;
  });
});

test('2 arguments, curried', () => {
  jsc.assertForall(
    arity2,
    numberOrUndefined,
    numberOrUndefined,
    (f, a, b) => curry2(f)(a)(b) === f(a, b)
  );
});

test('2 arguments at once should throw', () => {
  jsc.assertForall(
    arity2,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    (f, a, b, c) => {
      const curried = curry2(f);
      //@ts-ignore
      expect(() => curried(a, b)).toThrow();
      //@ts-ignore
      expect(() => curried(a)(b, c)).toThrow();
      return true;
    }
  );
});
