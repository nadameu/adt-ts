export function autocurry(n: number, f: Function) {
  const args = Array.prototype.slice.call(arguments, 2);
  if (args.length === n) return f.apply(null, args);
  if (args.length > n) throw new Error(`Expected ${n} arguments, got: ${args.length}.`);
  const curried = function() {
    if (arguments.length === 0) throw new Error(`Empty function call not allowed.`);
    const newArgs = Array.prototype.slice.call(arguments);
    return autocurry.apply(null, [n, f].concat(args).concat(newArgs) as any);
  };
  curried.toString = () => f.toString();
  return curried;
}

/** Function with arity 1 */
export type Fn1<a, b> = (_: a) => b;
/** Function with arity 2 */
export type Fn2<a, b, c> = (a: a, b: b) => c;
/** Function with arity 3 */
export type Fn3<a, b, c, d> = (a: a, b: b, c: c) => d;
/** Function with arity 4 */
export type Fn4<a, b, c, d, e> = (a: a, b: b, c: c, d: d) => e;
/** Function with arity 5 */
export type Fn5<a, b, c, d, e, f> = (a: a, b: b, c: c, d: d, e: e) => f;
/** Function with arity 6 */
export type Fn6<a, b, c, d, e, f, g> = (a: a, b: b, c: c, d: d, e: e, f: f) => g;
/** Function with arity 7 */
export type Fn7<a, b, c, d, e, f, g, h> = (a: a, b: b, c: c, d: d, e: e, f: f, g: g) => h;

/** Auto-curried function with arity 2 */
export type Fn2AC<a, b, c> = {
  (a: a, b: b): c;
  (a: a): Fn1<b, c>;
};
/** Auto-curried function with arity 3 */
export type Fn3AC<a, b, c, d> = {
  (a: a, b: b, c: c): d;
  (a: a, b: b): Fn1<c, d>;
  (a: a): Fn2AC<b, c, d>;
};
/** Auto-curried function with arity 4 */
export type Fn4AC<a, b, c, d, e> = {
  (a: a, b: b, c: c, d: d): e;
  (a: a, b: b, c: c): Fn1<d, e>;
  (a: a, b: b): Fn2AC<c, d, e>;
  (a: a): Fn3AC<b, c, d, e>;
};
/** Auto-curried function with arity 5 */
export type Fn5AC<a, b, c, d, e, f> = {
  (a: a, b: b, c: c, d: d, e: e): f;
  (a: a, b: b, c: c, d: d): Fn1<e, f>;
  (a: a, b: b, c: c): Fn2AC<d, e, f>;
  (a: a, b: b): Fn3AC<c, d, e, f>;
  (a: a): Fn4AC<b, c, d, e, f>;
};
/** Auto-curried function with arity 6 */
export type Fn6AC<a, b, c, d, e, f, g> = {
  (a: a, b: b, c: c, d: d, e: e, f: f): g;
  (a: a, b: b, c: c, d: d, e: e): Fn1<f, g>;
  (a: a, b: b, c: c, d: d): Fn2AC<e, f, g>;
  (a: a, b: b, c: c): Fn3AC<d, e, f, g>;
  (a: a, b: b): Fn4AC<c, d, e, f, g>;
  (a: a): Fn5AC<b, c, d, e, f, g>;
};
/** Auto-curried function with arity 7 */
export type Fn7AC<a, b, c, d, e, f, g, h> = {
  (a: a, b: b, c: c, d: d, e: e, f: f, g: g): h;
  (a: a, b: b, c: c, d: d, e: e, f: f): Fn1<g, h>;
  (a: a, b: b, c: c, d: d, e: e): Fn2AC<f, g, h>;
  (a: a, b: b, c: c, d: d): Fn3AC<e, f, g, h>;
  (a: a, b: b, c: c): Fn4AC<d, e, f, g, h>;
  (a: a, b: b): Fn5AC<c, d, e, f, g, h>;
  (a: a): Fn6AC<b, c, d, e, f, g, h>;
};

/** Curried function with arity 2 */
export type Fn2C<a, b, c> = Fn1<a, Fn1<b, c>>;
/** Curried function with arity 3 */
export type Fn3C<a, b, c, d> = Fn1<a, Fn2C<b, c, d>>;
/** Curried function with arity 4 */
export type Fn4C<a, b, c, d, e> = Fn1<a, Fn3C<b, c, d, e>>;
/** Curried function with arity 5 */
export type Fn5C<a, b, c, d, e, f> = Fn1<a, Fn4C<b, c, d, e, f>>;
/** Curried function with arity 6 */
export type Fn6C<a, b, c, d, e, f, g> = Fn1<a, Fn5C<b, c, d, e, f, g>>;
/** Curried function with arity 7 */
export type Fn7C<a, b, c, d, e, f, g, h> = Fn1<a, Fn6C<b, c, d, e, f, g, h>>;

export const autocurry2 = <a, b, c>(f: Fn2<a, b, c>): Fn2AC<a, b, c> => /*#__PURE__*/ autocurry(2, f);

export const autocurry3 = <a, b, c, d>(f: Fn3<a, b, c, d>): Fn3AC<a, b, c, d> => /*#__PURE__*/ autocurry(3, f);

export const autocurry4 = <a, b, c, d, e>(f: Fn4<a, b, c, d, e>): Fn4AC<a, b, c, d, e> => /*#__PURE__*/ autocurry(4, f);

export const autocurry5 = <a, b, c, d, e, f>(f: Fn5<a, b, c, d, e, f>): Fn5AC<a, b, c, d, e, f> => /*#__PURE__*/ autocurry(5, f);

export const autocurry6 = <a, b, c, d, e, f, g>(f: Fn6<a, b, c, d, e, f, g>): Fn6AC<a, b, c, d, e, f, g> => /*#__PURE__*/ autocurry(6, f);

export const autocurry7 = <a, b, c, d, e, f, g, h>(f: Fn7<a, b, c, d, e, f, g, h>): Fn7AC<a, b, c, d, e, f, g, h> => /*#__PURE__*/ autocurry(7, f);
