const _slice = Array.prototype.slice;
const slice = _slice.call.bind(_slice) as <a>(xs: ArrayLike<a>, i?: number) => a[];

export function curry<a>(f: () => a): () => a;
export function curry<a, b>(f: (_: a) => b): (_: a) => b;
export function curry<a, b, c>(
  f: (a: a, b: b) => c
): {
  (a: a, b: b): c;
  (a: a): (b: b) => c;
};
export function curry<a, b, c, d>(
  f: (a: a, b: b, c: c) => d
): {
  (a: a, b: b, c: c): d;
  (a: a, b: b): (c: c) => d;
  (a: a): {
    (b: b, c: c): d;
    (b: b): (c: c) => d;
  };
};
export function curry<a, b, c, d, e>(
  f: (a: a, b: b, c: c, d: d) => e
): {
  (a: a, b: b, c: c, d: d): e;
  (a: a, b: b, c: c): (d: d) => e;
  (a: a, b: b): {
    (c: c, d: d): e;
    (c: c): (d: d) => e;
  };
  (a: a): {
    (b: b, c: c, d: d): e;
    (b: b, c: c): (d: d) => e;
    (b: b): {
      (c: c, d: d): e;
      (c: c): (d: d) => e;
    };
  };
};
export function curry(f: Function) {
  const args = slice(arguments, 1);
  if (args.length === f.length) return f.apply(null, args);
  if (args.length > f.length)
    throw new Error(`Expected ${f.length} arguments, got: ${args.length}.`);
  const applied = function() {
    if (arguments.length === 0) throw new Error(`Empty function call not allowed.`);
    const newArgs = slice(arguments);
    return curry.apply(null, [f].concat(args).concat(newArgs) as any);
  };
  applied.toString = () => f.toString();
  return applied;
}
