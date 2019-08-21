import * as jsc from 'jsverify';
import { autocurry4 } from '../src/autocurry';

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
  jsc.assertForall(arity4, numberOrUndefined, numberOrUndefined, numberOrUndefined, (f, a, b, c) => {
    const curried = autocurry4(f);
    //@ts-ignore
    expect(() => curried()).toThrow();
    //@ts-ignore
    expect(() => curried(a)()).toThrow();
    //@ts-ignore
    expect(() => curried(a, b)()).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b)()).toThrow();
    //@ts-ignore
    expect(() => curried(a, b, c)()).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b, c)()).toThrow();
    //@ts-ignore
    expect(() => curried(a, b)(c)()).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b)(c)()).toThrow();
    return true;
  });
});

test('4 arguments', () => {
  jsc.assertForall(arity4, numberOrUndefined, numberOrUndefined, numberOrUndefined, numberOrUndefined, (f, a, b, c, d) => {
    const curried = autocurry4(f);
    const results = [curried(a, b, c, d), curried(a, b, c)(d), curried(a, b)(c, d), curried(a, b)(c)(d), curried(a)(b, c, d), curried(a)(b, c)(d), curried(a)(b)(c, d), curried(a)(b)(c)(d)];
    const expected = f(a, b, c, d);
    return results.every(x => x === expected);
  });
});

test('5 arguments should throw', () => {
  jsc.assertForall(arity4, numberOrUndefined, numberOrUndefined, numberOrUndefined, numberOrUndefined, numberOrUndefined, (f, a, b, c, d, e) => {
    const curried = autocurry4(f);
    //@ts-ignore
    expect(() => curried(a, b, c, d, e)).toThrow();
    //@ts-ignore
    expect(() => curried(a, b, c)(d, e)).toThrow();
    //@ts-ignore
    expect(() => curried(a, b)(c, d, e)).toThrow();
    //@ts-ignore
    expect(() => curried(a, b)(c)(d, e)).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b, c, d, e)).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b, c)(d, e)).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b)(c, d, e)).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b)(c)(d, e)).toThrow();
    return true;
  });
});
