import { Monoid } from '../classes/Monoid';
import { Semigroup } from '../classes/Semigroup';
import { equals, Setoid } from '../classes/Setoid';
import { CompositeDesc, Desc, Info } from '../Desc';

export const setoidArray: <s extends Desc>(
	_: Setoid<s>,
) => Setoid<CompositeDesc<'Array', [s]>> = S => ({
	equals: xs => ys => {
		if (xs.length !== ys.length) return false;
		const eq = equals(S);
		return xs.every((x, i) => eq(x)(ys[i]));
	},
});
export const concat: Semigroup<'Array'>['concat'] = xs => ys => xs.concat(ys);
export const empty: Monoid<'Array'>['empty'] = () => [];

declare module '../classes/Setoid' {
	export interface Dict<info extends Info> {
		Array: Type<info['descs'][0], info['params']>[];
	}
}

declare module '../classes/Monoid' {
	export interface Dict<info extends Info> {
		Array: info['params'][0][];
	}
}
