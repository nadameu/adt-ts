import { EQ, GT, LT } from './Ordering';

const unsafeCompareImpl = x => y => (x < y ? LT : x === y ? EQ : GT);

export { unsafeCompareImpl as ordBooleanImpl };
export { unsafeCompareImpl as ordIntImpl };
export { unsafeCompareImpl as ordNumberImpl };
export { unsafeCompareImpl as ordStringImpl };
export { unsafeCompareImpl as ordCharImpl };

export const ordArrayImpl = f => xs => ys => {
	const xlen = xs.length;
	const ylen = ys.length;
	for (let i = 0; i < xlen && i < ylen; i++) {
		var o = f(xs[i])(ys[i]);
		if (o !== EQ) return o;
	}
	return unsafeCompareImpl(xlen)(ylen);
};
