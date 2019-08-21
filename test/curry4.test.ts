import * as jsc from 'jsverify';
import { curry4 } from '../src/curry';

const arity4 = jsc.fn(jsc.fn(jsc.fn(jsc.fn(jsc.number)))).smap(
  f => {
    const ret = (a: number, b: number, c: number, d: number) => f(a)(b)(c)(d);
    ret.orig = f;
    return ret;
  },
  f => f.orig
);
const numberOrUndefined = jsc.sum([jsc.number, jsc.constant(undefined)]);

test('0 arguments should throw', () => {
  jsc.assertForall(
    arity4,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    (f, a, b, c) => {
      const curried = curry4(f);
      //@ts-ignore
      expect(() => curried()).toThrow();
      //@ts-ignore
      expect(() => curried(a)()).toThrow();
      //@ts-ignore
      expect(() => curried(a)(b)()).toThrow();
      //@ts-ignore
      expect(() => curried(a)(b)(c)()).toThrow();
      return true;
    }
  );
});

test('4 arguments, curried', () => {
  jsc.assertForall(
    arity4,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    (f, a, b, c, d) => curry4(f)(a)(b)(c)(d) === f(a, b, c, d)
  );
});

test('2 arguments at once should throw', () => {
  jsc.assertForall(
    arity4,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    numberOrUndefined,
    (f, a, b, c, d, e) => {
      const curried = curry4(f);
      //@ts-ignore
      expect(() => curried(a, b)).toThrow();
      //@ts-ignore
      expect(() => curried(a)(b, c)).toThrow();
      //@ts-ignore
      expect(() => curried(a)(b)(c, d)).toThrow();
      //@ts-ignore
      expect(() => curried(a)(b)(c)(d, e)).toThrow();
      return true;
    }
  );
});
