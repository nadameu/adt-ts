export const method =
  <
    obj extends { [k in key]: (...args: args) => ret },
    key extends keyof obj,
    args extends unknown[],
    ret = obj[key] extends (...args: args) => infer ret ? ret : unknown,
  >(
    key: key,
    ...args: args
  ) =>
  (obj: obj) =>
    obj[key](...args);
