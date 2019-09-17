export const compose = <b, c>(f: (_: b) => c) => <a>(g: (_: a) => b) => (a: a) => f(g(a));
export const composeN: {
  (): <a>(_: a) => a;
  <a, b>(f0: (_: a) => b): (_: a) => b;
  <a, b, c>(f0: (_: b) => c, f1: (_: a) => b): (_: a) => c;
  <a, b, c, d>(f0: (_: c) => d, f1: (_: b) => c, f2: (_: a) => b): (_: a) => d;
  <a, b, c, d, e>(f0: (_: d) => e, f1: (_: c) => d, f2: (_: b) => c, f3: (_: a) => b): (_: a) => e;
  <a, b, c, d, e, f>(
    f0: (_: e) => f,
    f1: (_: d) => e,
    f2: (_: c) => d,
    f3: (_: b) => c,
    f4: (_: a) => b
  ): (_: a) => f;
  (...fs: Array<(_: any) => any>): (_: any) => any;
} = (...fs: Array<(_: any) => any>) => (a: any) => {
  let result = a;
  for (let i = fs.length - 1; i >= 0; i--) {
    result = fs[i](result);
  }
  return result;
};
export const identity = <a>(a: a) => a;
export const constant = <a>(a: a) => <b>(b: b) => a;
export const thrush = <a>(a: a) => <b>(f: (_: a) => b): b => f(a);
export const flip = <a, b, c>(f: (_: a) => (_: b) => c) => (b: b) => (a: a) => f(a)(b);
export const pipe = <a, b>(f: (_: a) => b) => <c>(g: (_: b) => c) => (a: a) => g(f(a));
export const pipeN: {
  (): <a>(_: a) => a;
  <a, b>(f0: (_: a) => b): (_: a) => b;
  <a, b, c>(f0: (_: a) => b, f1: (_: b) => c): (_: a) => c;
  <a, b, c, d>(f0: (_: a) => b, f1: (_: b) => c, f2: (_: c) => d): (_: a) => d;
  <a, b, c, d, e>(f0: (_: a) => b, f1: (_: b) => c, f2: (_: c) => d, f3: (_: d) => e): (_: a) => e;
  <a, b, c, d, e, f>(
    f0: (_: a) => b,
    f1: (_: b) => c,
    f2: (_: c) => d,
    f3: (_: d) => e,
    f4: (_: e) => f
  ): (_: a) => f;
  (...fs: Array<(_: any) => any>): (_: any) => any;
} = (...fs: Array<(_: any) => any>) => (a: any): any => {
  const len = fs.length;
  let result = a;
  for (let i = 0; i < len; i++) {
    result = fs[i](result);
  }
  return result;
};
export interface Wrapped<a> {
  pipe(): a;
  pipe<b>(f0: (_: a) => b): b;
  pipe<b, c>(f0: (_: a) => b, f1: (_: b) => c): c;
  pipe<b, c, d>(f0: (_: a) => b, f1: (_: b) => c, f2: (_: c) => d): d;
  pipe<b, c, d, e>(f0: (_: a) => b, f1: (_: b) => c, f2: (_: c) => d, f3: (_: d) => e): e;
  pipe<b, c, d, e, f>(
    f0: (_: a) => b,
    f1: (_: b) => c,
    f2: (_: c) => d,
    f3: (_: d) => e,
    f4: (_: e) => f
  ): f;
  pipe(...fs: ((_: any) => any)[]): any;
}
export const wrap = <a>(a: a): Wrapped<a> => ({
  pipe: (...fs: Array<(_: any) => any>) => pipeN(...fs)(a),
});

export const prop = <T, K extends keyof T>(key: K) => (obj: T): T[K] => obj[key];

export const method = <
  T extends { [k in K]: (...args: A) => unknown },
  K extends keyof T,
  A extends unknown[]
>(
  key: K,
  ...args: A
) => (obj: T): T[K] extends (...args: A) => infer B ? B : never => obj[key](...args) as any;
