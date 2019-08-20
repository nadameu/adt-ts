import * as jsc from 'jsverify';
import { curry3 } from '../src/curry';

const arity3 = jsc
  .fn(jsc.fn(jsc.fn(jsc.number)))
  .smap(f => (a: number, b: number, c: number) => f(a)(b)(c), f => a => b => c => f(a, b, c));
const numberOrUndefined = jsc.sum([jsc.number, jsc.constant(undefined)]);

test('0 arguments should throw', () => {
  jsc.assertForall(arity3, numberOrUndefined, numberOrUndefined, (f, a, b) => {
    const curried = curry3(f);
    //@ts-ignore
    expect(() => curried()).toThrow();
    //@ts-ignore
    expect(() => curried(a)()).toThrow();
    //@ts-ignore
    expect(() => curried(a, b)()).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b)()).toThrow();
    return true;
  });
});

test('3 arguments', () => {
  jsc.assertForall(
    arity3,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    (f, a, b, c) => {
      const curried = curry3(f);
      const results = [curried(a, b, c), curried(a, b)(c), curried(a)(b, c), curried(a)(b)(c)];
      const expected = f(a, b, c);
      return results.every(x => x === expected);
    }
  );
});

test('4 arguments should throw', () => {
  jsc.assertForall(
    arity3,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    (f, a, b, c, d) => {
      const curried = curry3(f);
      //@ts-ignore
      expect(() => curried(a, b, c, d)).toThrow();
      //@ts-ignore
      expect(() => curried(a, b)(c, d)).toThrow();
      //@ts-ignore
      expect(() => curried(a)(b, c, d)).toThrow();
      //@ts-ignore
      expect(() => curried(a)(b)(c, d)).toThrow();
      return true;
    }
  );
});
