export type fn<a, b> = (_: a) => b;
export type fn2<a, b, c> = (_: a) => (_: b) => c;
export type fn3<a, b, c, d> = (_: a) => (_: b) => (_: c) => d;

export const A = <a, b>(f: fn<a, b>) => (x: a) => f(x);
export { A as apply };

export const B = <b, c>(f: fn<b, c>) => <a>(g: fn<a, b>): fn<a, c> => x => f(g(x));
export { B as compose };

export const B1 = <c, d>(f: fn<c, d>) => <a, b>(g: fn2<a, b, c>): fn2<a, b, d> => x => y =>
	f(g(x)(y));

export const B2 = <d, e>(f: fn<d, e>) => <a, b, c>(
	g: fn3<a, b, c, d>,
): fn3<a, b, c, e> => x => y => z => f(g(x)(y)(z));

export const B3 = <c, d>(f: fn<c, d>) => <b>(g: fn<b, c>) => <a>(h: fn<a, b>): fn<a, d> => x =>
	f(g(h(x)));

export const C = <a, b, c>(f: fn2<a, b, c>): fn2<b, a, c> => y => x => f(x)(y);
export { C as flip };

export const P = <b, c>(f: fn2<b, b, c>) => <a>(g: fn<a, b>): fn2<a, a, c> => x => y =>
	f(g(x))(g(y));
export { P as on };
