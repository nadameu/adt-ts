export function curry(n: number, f: Function) {
  const args = Array.prototype.slice.call(arguments, 2);
  if (args.length === n) return f.apply(null, args);
  if (args.length > n) throw new Error(`Expected ${n} arguments, got: ${args.length}.`);
  const applied = function() {
    if (arguments.length === 0) throw new Error(`Empty function call not allowed.`);
    const newArgs = Array.prototype.slice.call(arguments);
    return curry.apply(null, [n, f].concat(args).concat(newArgs) as any);
  };
  applied.toString = () => f.toString();
  return applied;
}

export const curry2 = <a, b, c>(
  f: (a: a, b: b) => c
): {
  (a: a, b: b): c;
  (a: a): (b: b) => c;
} => /*#__PURE__*/ curry(2, f);

export const curry3 = <a, b, c, d>(
  f: (a: a, b: b, c: c) => d
): {
  (a: a, b: b, c: c): d;
  (a: a, b: b): (c: c) => d;
  (a: a): {
    (b: b, c: c): d;
    (b: b): (c: c) => d;
  };
} => /*#__PURE__*/ curry(3, f);

export const curry4 = <a, b, c, d, e>(
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
} => /*#__PURE__*/ curry(4, f);
