import { Eq } from '../../src/typeclasses';

/** `id 'op' x == x` */
export const leftIdentity =
  <a>(eq: Eq<a>['eq']) =>
  <id>(op: (_: id) => (_: a) => a) =>
  (id: id) =>
  (x: a): boolean =>
    eq(op(id)(x))(x);

/** `x 'op' id == x` */
export const rightIdentity =
  <a>(eq: Eq<a>['eq']) =>
  <id>(op: (_: a) => (_: id) => a) =>
  (id: id) =>
  (x: a): boolean =>
    eq(op(x)(id))(x);

/** `id 'op' x == x 'op' id == x` */
export const identity =
  <a>(eq: Eq<a>['eq']) =>
  (op: (_: a) => (_: a) => a) =>
  (id: a) =>
  (x: a): boolean =>
    leftIdentity(eq)(op)(id)(x) && rightIdentity(eq)(op)(id)(x);

/** `a 'op' (b 'op' c) == (a 'op' b) 'op' c` */
export const associative =
  <a>(eq: Eq<a>['eq']) =>
  (op: (_: a) => (_: a) => a) =>
  (a: a) =>
  (b: a) =>
  (c: a): boolean =>
    eq(op(a)(op(b)(c)))(op(op(a)(b))(c));

/** `a 'op' b == b 'op' a` */
export const commutative =
  <a>(eq: Eq<a>['eq']) =>
  (op: (_: a) => (_: a) => a) =>
  (a: a) =>
  (b: a): boolean =>
    eq(op(a)(b))(op(b)(a));

/** `a 'op1' (b 'op2' c) == (a 'op1' b) 'op2' (a 'op1' c)` */
export const leftDistributive =
  <b>(eq: Eq<b>['eq']) =>
  <a>(op1: (_: a) => (_: b) => b) =>
  (op2: (_: b) => (_: b) => b) =>
  (a: a) =>
  (b: b) =>
  (c: b): boolean =>
    eq(op1(a)(op2(b)(c)))(op2(op1(a)(b))(op1(a)(c)));

/** `(a 'op2' b) 'op1' c == (a 'op1' c) 'op2' (b 'op1' c)` */
export const rightDistributive =
  <a>(eq: Eq<a>['eq']) =>
  <c>(op1: (_: a) => (_: c) => a) =>
  (op2: (_: a) => (_: a) => a) =>
  (a: a) =>
  (b: a) =>
  (c: c): boolean =>
    eq(op1(op2(a)(b))(c))(op2(op1(a)(c))(op1(b)(c)));

/** `a 'op' a == a` */
export const idempotent =
  <a>(eq: Eq<a>['eq']) =>
  (op: (_: a) => (_: a) => a) =>
  (a: a): boolean =>
    eq(op(a)(a))(a);

/** `a 'op1' (a 'op2' b) == a 'op2' (a 'op1' b) == a` */
export const absorption =
  <a>(eq: Eq<a>['eq']) =>
  (op1: (_: a) => (_: a) => a) =>
  (op2: (_: a) => (_: a) => a) =>
  (a: a) =>
  (b: a): boolean =>
    eq(op1(a)(op2(a)(b)))(a) && eq(op2(a)(op1(a)(b)))(a);

/** `op1(a) 'op2' op1(b) == op1(a 'op3' b)` */
export const homomorphism =
  <b>(eq: Eq<b>['eq']) =>
  <a>(op1: (_: a) => b) =>
  (op2: (_: b) => (_: b) => b) =>
  (op3: (_: a) => (_: a) => a) =>
  (a: a) =>
  (b: a): boolean =>
    eq(op2(op1(a))(op1(b)))(op1(op3(a)(b)));
