import { compose, constant, identity } from '../../helpers';

export const map = compose;
export const apply = <a, b, c>(f: (_: a) => (_: b) => c) => (g: (_: a) => b) => (a: a) =>
  f(a)(g(a));
export const bind = <a, b, c>(f: (_: b) => (_: a) => c) => (g: (_: a) => b) => (a: a) => f(g(a))(a);
export const pure = constant;

export { compose, identity };
