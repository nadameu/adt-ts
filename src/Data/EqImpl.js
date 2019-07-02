const refEq = r1 => r2 => r1 === r2;

export { refEq as eqBooleanImpl };
export { refEq as eqIntImpl };
export { refEq as eqNumberImpl };
export { refEq as eqCharImpl };
export { refEq as eqStringImpl };

export const eqArrayImpl = f => xs => ys =>
	xs.length === ys.length && xs.every((_, i) => f(xs[i])(ys[i]));
