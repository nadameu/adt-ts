import { TypesDictionary } from '../TypesDictionary';

export interface Eq<Key extends EqKeys> {
	eq: <EA extends EqInstance<Key>>(_: EA) => (_: EA) => boolean;
}
interface ConditionalEq<Key extends ConditionalEqKeys> {
	<InnerKey extends EqKeys>(E: Eq<InnerKey>): {
		eq: <EA extends ConditionalEqInstance<Key, InnerKey>>(_: EA) => (_: EA) => boolean;
	};
}

declare module '../TypesDictionary' {
	export interface TypesDictionary<Params extends any[]> {
		eqNever: { Eq: { instance: never } };
		eqBoolean: { Eq: { instance: boolean } };
		eqNumber: { Eq: { instance: number } };
		eqString: { Eq: { instance: string } };
		eqArray: { ConditionalEq: { instance: Params[0][] } };
	}
}

type EqKeys = {
	[k in keyof TypesDictionary]: TypesDictionary[k] extends { Eq: any } ? k : never
}[keyof TypesDictionary];
type ConditionalEqKeys = {
	[k in keyof TypesDictionary]: TypesDictionary[k] extends { ConditionalEq: any } ? k : never
}[keyof TypesDictionary];

type EqInstance<Key extends EqKeys> = TypesDictionary[Key]['Eq']['instance'];
type ConditionalEqInstance<
	Key extends ConditionalEqKeys,
	InnerKey extends EqKeys
> = TypesDictionary<[EqInstance<InnerKey>]>[Key]['ConditionalEq']['instance'];

const refEq = (r1: any) => (r2: any) => r1 === r2;

const eqArrayImpl = <Key extends EqKeys>(E: Eq<Key>) => <EA extends EqInstance<Key>>(xs: EA[]) => (
	ys: EA[],
): boolean => xs === ys || (xs.length === ys.length && xs.every((x, i) => E.eq(x)(ys[i])));

export const notEq = <Key extends EqKeys>(E: Eq<Key>) => <EA extends EqInstance<Key>>(x: EA) => (
	y: EA,
) => !E.eq(x)(y);

export const eqBoolean: Eq<'eqBoolean'> = { eq: refEq };

export const eqNumber: Eq<'eqNumber'> = { eq: refEq };

export const eqString: Eq<'eqString'> = { eq: refEq };

export const eqArray: ConditionalEq<'eqArray'> = E => ({ eq: eqArrayImpl(E) });
