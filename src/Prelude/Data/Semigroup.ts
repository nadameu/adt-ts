import { SemigroupInstances } from '../../TypesDictionary';

export interface Semigroup<a extends KeyList> {
	append<b = never, c = never, d = never>(
		_: SemigroupInstance<a, [b, c, d]>,
	): (_: SemigroupInstance<a, [b, c, d]>) => SemigroupInstance<a, [b, c, d]>;
}

type Either<a, b> = { left: a } | { right: b };

declare module '../../TypesDictionary' {
	export interface SemigroupInstances<inner extends any = never> {
		String: string;
		Sum: number;
		Array: inner[0][];
		Either: Either<
			SemigroupInstance<inner[0][0], [inner[1][0]]>,
			SemigroupInstance<inner[0][1], [inner[1][1]]>
		>;
	}
}

type KeyList = keyof SemigroupInstances | KeyCons<any, any>;
interface KeyCons<head extends keyof SemigroupInstances, tail extends KeyList | KeyList[]> {
	head: head;
	tail: tail;
}
type SemigroupInstance<a extends KeyList, args extends any = never> = a extends KeyCons<
	infer head,
	infer tail
>
	? { [k in head]: SemigroupInstances<[tail, args]>[k] }[head]
	: a extends keyof SemigroupInstances
	? SemigroupInstances<args>[a]
	: never;

type all = SemigroupInstance<keyof SemigroupInstances>;

declare const semiEither: <a extends KeyList>(
	semiA: Semigroup<a>,
) => <b extends KeyList>(semiB: Semigroup<b>) => Semigroup<KeyCons<'Either', [a, b]>>;
declare const semiArray: Semigroup<'Array'>;
declare const semiString: Semigroup<'String'>;
declare const semiSum: Semigroup<'Sum'>;

const fnArray = semiArray.append;

const semiEitherStringsSum = semiEither(semiArray)(semiArray);
const fnEither = semiEitherStringsSum.append((null as unknown) as Either<Error[], number[]>);
