import * as jsc from 'jsverify';
import { autocurry2 } from '../src/autocurry';

const arity2 = jsc.fn(jsc.fn(jsc.number)).smap(f => (a: number, b: number) => f(a)(b), f => a => b => f(a, b));
const numberOrUndefined = jsc.sum([jsc.number, jsc.constant(undefined)]);

test('0 arguments should throw', () => {
  jsc.assertForall(arity2, numberOrUndefined, (f, a) => {
    const curried = autocurry2(f);
    //@ts-ignore
    expect(() => curried()).toThrow();
    //@ts-ignore
    expect(() => curried(a)()).toThrow();
    return true;
  });
});

test('2 arguments', () => {
  jsc.assertForall(arity2, numberOrUndefined, numberOrUndefined, (f, a, b) => {
    const curried = autocurry2(f);
    const results = [curried(a, b), curried(a)(b)];
    const expected = f(a, b);
    return results.every(x => x === expected);
  });
});

test('3 arguments should throw', () => {
  jsc.assertForall(arity2, numberOrUndefined, numberOrUndefined, numberOrUndefined, (f, a, b, c) => {
    const curried = autocurry2(f);
    //@ts-ignore
    expect(() => curried(a, b, c)).toThrow();
    //@ts-ignore
    expect(() => curried(a)(b, c)).toThrow();
    return true;
  });
});
