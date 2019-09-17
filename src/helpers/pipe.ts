export const pipe: {
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
} = (...fs: Array<(_: any) => any>) => (a: any): any => {
  const len = fs.length;
  let result = a;
  for (let i = 0; i < len; i++) {
    result = fs[i](result);
  }
  return result;
};
