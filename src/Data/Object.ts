import { makeEqArray } from './Array';
import { Eq } from './Eq';
import { Show } from './Show';
import { eqString, showString } from './String';

const eqKeys = makeEqArray(eqString).eq;
export const makeEqObject = <t>(eqT: { [k in keyof t]: Eq<t[k]>['eq'] }): Eq<t> => ({
	eq: x => y => {
		const keys = Object.keys(x).sort();
		if (!eqKeys(Object.keys(y).sort())(keys)) return false;
		return (keys as (keyof t)[]).every(
			key => Object.prototype.hasOwnProperty.call(y, key) && eqT[key](x[key])(y[key]),
		);
	},
});

const showKey = showString.show;
export const makeShowObject = <t>(showT: { [k in keyof t]: Show<t[k]>['show'] }): Show<t> => ({
	show: x => {
		const keys = Object.keys(x);
		const str = (keys as (keyof t)[])
			.map(k => {
				const key = showKey(k as string);
				const val = showT[k](x[k]);
				return `${key}: ${val}`;
			})
			.join(', ');
		return `{${str}}`;
	},
});
