import { EqInstances } from '../../TypesDictionary';
export interface Eq<a extends keys> {
	eq: <ea extends EqInstance<a>>(_: ea) => (_: ea) => boolean;
}

type keys = keyof EqInstances;
type run<
	fn extends keyof EqInstances[keys],
	key extends keys,
	args extends any[] = any[]
> = EqInstances<args>[key][fn];
type Eqs = EqInstances<never[]>[keys]['instance'];
type EqInstance<a extends keys> = run<'instance', a>;
type EqConditional<a extends keys, inner extends Eqs> = run<'instance', a, [inner]>;

export const notEq = <a extends keys>(E: Eq<a>) => <ea extends EqInstance<a>>(x: ea) => (
	y: ea,
): boolean => !E.eq(x)(y);
