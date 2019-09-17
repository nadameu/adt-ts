export const method = <
  obj extends { [k in key]: (...args: args) => out },
  key extends keyof obj,
  args extends unknown[],
  out = obj[key] extends (...args: args) => infer out ? out : unknown
>(
  key: key,
  ...args: args
) => (obj: obj) => obj[key](...args);
