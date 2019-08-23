export const compose = <b, c>(f: (_: b) => c) => <a>(g: (_: a) => b) => (a: a) => f(g(a));
export const identity = <a>(a: a) => a;
export const constant = <a>(a: a) => <b>(b: b) => a;
export const thrush = <a>(a: a) => <b>(f: (_: a) => b): b => f(a);
export const flip = <a, b, c>(f: (_: a) => (_: b) => c) => (b: b) => (a: a) => f(a)(b);
