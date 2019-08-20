import { decorateWith, curry1 } from './curry1';

export const curry2 = <a, b, c>(
  f: (arg0: a, arg1: b) => c
): {
  (arg0: a, arg1: b): c;
  (arg0: a): (arg1: b) => c;
} => {
  const decorate = decorateWith(f);
  return decorate(function curried(a: a, b: b): any {
    switch (arguments.length) {
      case 1:
        return curry1((b: b) => f(a, b));
      case 2:
        return f(a, b!);
      default:
        throw new Error(`Expected 2 arguments, got: ${arguments.length}`);
    }
  } as any);
};
