import { eq1 } from './Array';
import { eqString } from './String';

export const eq = <t>(eqT: { [key in keyof t]: (x: t[key]) => (y: t[key]) => boolean }) => (
	x: t,
) => (y: t): boolean => {
	const keys = Object.keys(x).sort();
	if (!eq1(eqString)(Object.keys(y).sort())(keys)) return false;
	return (keys as (keyof t)[]).every(
		key => Object.prototype.hasOwnProperty(key) && eqT[key](x[key])(y[key]),
	);
};

export const notEq = <t>(eqT: { [key in keyof t]: (x: t[key]) => (y: t[key]) => boolean }) => (
	x: t,
) => (y: t): boolean => eq(eqT)(x)(y) === false;
