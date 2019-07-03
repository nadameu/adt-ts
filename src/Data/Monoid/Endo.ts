import { Generic1 } from '../../Generic';
import { Monoid1 } from '../Monoid';
import { Semigroup1 } from '../Semigroup';

/*
 * Based on https://github.com/safareli/purescript-stacksafe-function
 */

export type Endo<a> = One<a> | Composition<a>;
export interface GenericEndo extends Generic1 {
	type: Endo<this['a']>;
}
export const Endo = <a>(fn: (_: a) => a): Endo<a> => fn;

export type One<a> = ((_: a) => a) & { isComposition?: false };

export type Composition<a> = ((_: a) => a) & {
	isComposition: true;
	left: Endo<a>;
	right: Endo<a>;
};

const isComposition = <a>(x: Endo<a>): x is Composition<a> => x.isComposition === true;

const safeCompose = <a>(left: Endo<a>) => (right: Endo<a>): Endo<a> => {
	const fn = (x: a): a => runEndo(fn as any, x);
	return Object.assign(fn, { isComposition: true, left, right });
};

const runEndo = <a>(fn: Endo<a>, x: a): a => {
	let root = fn;
	let val = x;
	const stack: Endo<a>[] = [];
	for (;;) {
		if (isComposition(root)) {
			stack.push(root.right);
			root = root.left;
		} else {
			val = root(val);
			if (stack.length === 0) return val;
			root = stack.pop() as Endo<a>;
		}
	}
};

export const append: <a>(f: Endo<a>) => (g: Endo<a>) => Endo<a> = safeCompose;
export const semigroupEndo: Semigroup1<GenericEndo> = { append };

export const mempty = <a = never>(): Endo<a> => Endo(x => x);
export const monoidEndo: Monoid1<GenericEndo> = { ...semigroupEndo, mempty };
