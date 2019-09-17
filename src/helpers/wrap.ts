import { pipe } from './pipe';

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
  pipe: (...fs: Array<(_: any) => any>) => (pipe as any)(...fs)(a),
});
