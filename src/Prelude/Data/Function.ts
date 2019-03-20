export { compose, identity } from '../Control/Category';
export const flip: <a, b, c>(_: (_: a) => (_: b) => c) => (_: b) => (_: a) => c = f => y => x =>
	f(x)(y);
const _const: <a, b>(_: a) => (_: b) => a = x => _ => x;
export { _const as const };
export const apply: <a, b>(_: (_: a) => b) => (_: a) => b = f => x => f(x);
export { apply as $ };
export const applyFlipped: <a, b>(_: a) => (_: (_: a) => b) => b = x => f => f(x);
export const applyN: <a>(_: (_: a) => a) => (_: number) => (_: a) => a = f => n => acc => {
	for (let i = 0; i < n; i++) {
		acc = f(acc);
	}
	return acc;
};
export const on: <a, b, c>(
	_: (_: b) => (_: b) => c,
) => (_: (_: a) => b) => (_: a) => (_: a) => c = f => g => x => y => f(g(x))(g(y));
