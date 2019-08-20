export const curry1 = <a, c>(
  f: (arg0: a) => c
): {
  (arg0: a): c;
} => {
  const decorate = decorateWith(f);
  return decorate(function curried(a: a): any {
    switch (arguments.length) {
      case 1:
        return f(a);
      default:
        throw new Error(`Expected 1 argument, got: ${arguments.length}`);
    }
  });
};

export const decorateWith = (orig: Function) => <T>(target: T): T => {
  (target as any).toString = () => orig.toString();
  return target;
};
