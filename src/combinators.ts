export const A: <a, b>(f: (_: a) => b) => (x: a) => b = f => x => f(x);
export { A as apply };

export const B: {
	<a, b, c>(f: (_: b) => c): (g: (_: a) => b) => (_: a) => c;
	<b, c>(f: (_: b) => c): <a>(g: (_: a) => b) => (_: a) => c;
} = (f: any) => (g: any) => (x: any): any => f(g(x));
export { B as compose };

export const compose_: <a, b, c>(f: (_: b) => c, g: (_: a) => b) => (_: a) => c = (f, g) => x =>
	f(g(x));

export const B1: <c, d>(
	f: (_: c) => d,
) => <a, b>(g: (_: a) => (_: b) => c) => (_: a) => (_: b) => d = f => g => x => y => f(g(x)(y));

export const B2: <d, e>(
	f: (_: d) => e,
) => <a, b, c>(
	g: (_: a) => (_: b) => (_: c) => d,
) => (_: a) => (_: b) => (_: c) => e = f => g => x => y => z => f(g(x)(y)(z));

export const B3: <c, d>(
	f: (_: c) => d,
) => <b>(g: (_: b) => c) => <a>(h: (_: a) => b) => (_: a) => d = f => g => h => x => f(g(h(x)));

export const C: <a, b, c>(f: (_: a) => (_: b) => c) => (_: b) => (_: a) => c = f => y => x =>
	f(x)(y);
export { C as flip };

export const I: <a>(x: a) => a = x => x;
export { I as identity };

export const K: {
	<a, b>(x: a): (y: b) => a;
	<a>(x: a): <b>(y: b) => a;
} = (x: any) => (_: any): any => x;
export { K as constant };

export const KI: {
	<a, b>(x: a): (y: b) => b;
	<a>(x: a): <b>(y: b) => b;
} = K(I);

export const P: <b, c>(
	f: (_: b) => (_: b) => c,
) => <a>(g: (_: a) => b) => (_: a) => (_: a) => c = f => g => x => y => f(g(x))(g(y));
export { P as on };

export const pipe: {
	<a, b, c>(f: (_: a) => b): (g: (_: b) => c) => (_: a) => c;
	<a, b>(f: (_: a) => b): <c>(g: (_: b) => c) => (_: a) => c;
} = (f: any) => (g: any) => (x: any) => g(f(x));
export const pipe_: <a, b, c>(f: (_: a) => b, g: (_: b) => c) => (_: a) => c = (f, g) => x =>
	g(f(x));

export const T: {
	<a, b>(x: a): (f: (_: a) => b) => b;
	<a>(x: a): <b>(f: (_: a) => b) => b;
} = C(A) as any;
export { T as thrush };

export const T2: <a>(x: a) => <b>(y: b) => <c>(f: (_: a) => (_: b) => c) => c = x => y => f =>
	f(x)(y);
