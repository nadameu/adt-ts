export type fn<a, b> = (_: a) => b;
export type fn2<a, b, c> = (_: a) => (_: b) => c;
export type fn3<a, b, c, d> = (_: a) => (_: b) => (_: c) => d;

export const A: <a, b>(f: fn<a, b>) => (x: a) => b = f => x => f(x);
export { A as apply };

export const B: <b, c>(f: fn<b, c>) => <a>(g: fn<a, b>) => fn<a, c> = f => g => x => f(g(x));
export { B as compose };

export const B1: <c, d>(
	f: fn<c, d>,
) => <a, b>(g: fn2<a, b, c>) => fn2<a, b, d> = f => g => x => y => f(g(x)(y));

export const B2: <d, e>(
	f: fn<d, e>,
) => <a, b, c>(g: fn3<a, b, c, d>) => fn3<a, b, c, e> = f => g => x => y => z => f(g(x)(y)(z));

export const B3: <c, d>(
	f: fn<c, d>,
) => <b>(g: fn<b, c>) => <a>(h: fn<a, b>) => fn<a, d> = f => g => h => x => f(g(h(x)));

export const C: <a, b, c>(f: fn2<a, b, c>) => fn2<b, a, c> = f => y => x => f(x)(y);
export { C as flip };

export const I: <a>(x: a) => a = x => x;
export { I as identity };

export const K: <a>(x: a) => <b>(y: b) => a = x => _ => x;
export { K as constant };

export const KI: <a>(x: a) => <b>(y: b) => b = K(I);

export const P: <b, c>(f: fn2<b, b, c>) => <a>(g: fn<a, b>) => fn2<a, a, c> = f => g => x => y =>
	f(g(x))(g(y));
export { P as on };

export const T: <a>(x: a) => <b>(f: fn<a, b>) => b = C<fn<any, any>, any, any>(A);
export { T as thrush };

export const T2: <a>(x: a) => <b>(y: b) => <c>(f: fn2<a, b, c>) => c = x => y => f => f(x)(y);
