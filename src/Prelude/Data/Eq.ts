import { EqInstances } from '../../TypesDictionary';
export interface Eq<a extends KeyList> {
	eq(_: EqInstance<a>): (_: EqInstance<a>) => boolean;
}

type Either<a, b> = Left<a> | Right<b>;
interface Left<a> {
	isRight: false;
	left: a;
}
interface Right<b> {
	isRight: true;
	right: b;
}

declare module '../../TypesDictionary' {
	export interface EqInstances<Params extends any[] = never[]> {
		never: never;
		Boolean: boolean;
		String: string;
		Number: number;
		Either: Either<EqInstance<Params[0][0]>, EqInstance<Params[0][1]>>;
		Array: EqInstance<Params[0]>[];
	}
}
type KeyList = keyof EqInstances | TypeCons<any, any>;
interface TypeCons<head extends keyof EqInstances, tail extends KeyList | KeyList[]> {
	head: head;
	tail: tail;
}
type EqInstance<a extends KeyList> = a extends TypeCons<infer head, infer tail>
	? { [k in head]: EqInstances<[tail]>[k] }[head]
	: a extends keyof EqInstances
	? EqInstances[a]
	: never;

type all = EqInstance<keyof EqInstances>;

export const notEq = <a extends KeyList>(E: Eq<a>) => (x: EqInstance<a>) => (
	y: EqInstance<a>,
): boolean => !E.eq(x)(y);

const eqArray = <a extends KeyList>(E: Eq<a>): Eq<TypeCons<'Array', a>> => ({
	eq: xs => ys => {
		if (xs.length !== ys.length) return false;
		return xs.every((x, i) => E.eq(x as any)(ys[i] as any));
	},
});

declare const eqNumber: Eq<'Number'>;
declare const eqString: Eq<'String'>;

const eqNumbers = eqArray(eqNumber);
const fnNumbers = eqNumbers.eq;

const eqNumberss = eqArray(eqNumbers);
const fnNumberss = eqNumberss.eq;

declare const eqEither: <a extends KeyList>(
	eqA: Eq<a>,
) => <b extends KeyList>(eqB: Eq<b>) => Eq<TypeCons<'Either', [a, b]>>;

const eqEitherStringNumbers = eqEither(eqString)(eqNumbers);
const fnEitherStringNumbers = eqEitherStringNumbers.eq;
