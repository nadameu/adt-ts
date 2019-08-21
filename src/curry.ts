import { Fn2, Fn2C, Fn3, Fn3C, Fn4, Fn4C, Fn5, Fn5C, Fn6, Fn6C, Fn7, Fn7C } from './autocurry';

export function curry(n: number, f: Function) {
  const args = Array.prototype.slice.call(arguments, 2);
  if (args.length === n) return f.apply(null, args);
  if (args.length > n) throw new Error(`Expected ${n} arguments, got: ${args.length}.`);
  const curried = function() {
    if (arguments.length === 0 || arguments.length > 1)
      throw new Error(`Expected 1 argument, got: ${arguments.length}.`);
    const newArgs = Array.prototype.slice.call(arguments);
    return curry.apply(null, [n, f].concat(args).concat(newArgs) as any);
  };
  curried.toString = () => f.toString();
  return curried;
}

export const curry2 = <a, b, c>(f: Fn2<a, b, c>): Fn2C<a, b, c> => /*#__PURE__*/ curry(2, f);

export const curry3 = <a, b, c, d>(f: Fn3<a, b, c, d>): Fn3C<a, b, c, d> =>
  /*#__PURE__*/ curry(3, f);

export const curry4 = <a, b, c, d, e>(f: Fn4<a, b, c, d, e>): Fn4C<a, b, c, d, e> =>
  /*#__PURE__*/ curry(4, f);

export const curry5 = <a, b, c, d, e, f>(f: Fn5<a, b, c, d, e, f>): Fn5C<a, b, c, d, e, f> =>
  /*#__PURE__*/ curry(5, f);

export const curry6 = <a, b, c, d, e, f, g>(
  f: Fn6<a, b, c, d, e, f, g>
): Fn6C<a, b, c, d, e, f, g> => /*#__PURE__*/ curry(6, f);

export const curry7 = <a, b, c, d, e, f, g, h>(
  f: Fn7<a, b, c, d, e, f, g, h>
): Fn7C<a, b, c, d, e, f, g, h> => /*#__PURE__*/ curry(7, f);
