export const flip =
  <a, b, c>(f: (_: a) => (_: b) => c) =>
  (b: b) =>
  (a: a) =>
    f(a)(b);
