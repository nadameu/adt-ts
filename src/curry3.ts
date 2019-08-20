import { curry2 } from './curry2';
import { decorateWith, curry1 } from './curry1';

export const curry3 = <a, b, c, d>(
  f: (arg0: a, arg1: b, arg2: c) => d
): {
  (arg0: a, arg1: b, arg2: c): d;
  (arg0: a, arg1: b): (arg2: c) => d;
  (arg0: a): {
    (arg1: b, arg2: c): d;
    (arg1: b): (arg2: c) => d;
  };
} => {
  const decorate = decorateWith(f);
  return decorate(function curried(a: a, b: b, c: c): any {
    switch (arguments.length) {
      case 1:
        return curry2((b: b, c: c) => f(a, b, c));
      case 2:
        return curry1((c: c) => f(a, b, c));
      case 3:
        return f(a, b, c);
      default:
        throw new Error(`Expected 3 arguments, got: ${arguments.length}`);
    }
  } as any);
};
