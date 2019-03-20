import { SemigroupoidInstances } from '../../TypesDictionary';
export { compose } from '../../Prim/Fn';

export interface Semigroupoid<a extends keys> {
	compose: <acd extends SemigroupoidInstance<a>>(
		_: acd,
	) => <abc extends SemigroupoidMake<a, acd, any, SemigroupoidParams<a, acd>[0]>>(
		_: abc,
	) => SemigroupoidMake<a, acd, SemigroupoidParams<a, abc>[0], SemigroupoidParams<a, acd>[1]>;
}

type keys = keyof SemigroupoidInstances;
type run<
	fn extends keyof SemigroupoidInstances[keys],
	key extends keys,
	args extends any[] = any[]
> = SemigroupoidInstances<args>[key][fn];
type SemigroupoidInstance<a extends keys> = run<'instance', a>;
type SemigroupoidMake<a extends keys, abc extends SemigroupoidInstance<a>, d, e> = run<
	'make',
	a,
	[abc, d, e]
>;
type SemigroupoidParams<a extends keys, abc extends SemigroupoidInstance<a>> = run<
	'params',
	a,
	[abc]
>;

export const composeFlipped = <a extends keys>(A: Semigroupoid<a>) => <
	abc extends SemigroupoidInstance<a>
>(
	abc: abc,
) => <acd extends SemigroupoidMake<a, abc, SemigroupoidParams<a, abc>[1], any>>(
	acd: acd,
): SemigroupoidMake<a, abc, SemigroupoidParams<a, abc>[0], SemigroupoidParams<a, acd>[1]> =>
	A.compose(acd)(abc);
