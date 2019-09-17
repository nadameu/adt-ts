export const prop = <obj, key extends keyof obj>(key: key) => (obj: obj): obj[key] => obj[key];
