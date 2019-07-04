const FuncSymbol = Symbol();
interface Func<a, b, i = unknown> {
	(_: a): b;
	[FuncSymbol]?: {
		left: (_: i) => b;
		right: (_: a) => i;
	};
}

export const compose = <b, c>(f: (_: b) => c) => <a>(g: (_: a) => b): ((_: a) => c) => {
	const result = (x => run(result, x)) as (_: a) => c;
	return Object.assign(result, { [FuncSymbol]: { left: f, right: g } });
};

const run = <a, b>(f: Func<a, b>, x: a): b => {
	let current = f as Func<any, any>;
	const stack: Func<any, any>[] = [];
	let result = x as any;
	for (;;) {
		const composition = current[FuncSymbol];
		if (composition !== undefined) {
			stack.push(composition.left);
			current = composition.right;
		} else {
			result = current(x);
			if (stack.length === 0) return result;
			current = stack.pop() as Func<any, any>;
		}
	}
};
