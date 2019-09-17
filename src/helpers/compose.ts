export const compose = <b, c>(f: (_: b) => c) => <a>(g: (_: a) => b) => (a: a) => f(g(a));
