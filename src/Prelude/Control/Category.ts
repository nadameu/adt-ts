import { CategoryInstances } from '../../TypesDictionary';
import { Semigroupoid } from './Semigroupoid';
export { identity } from '../../Prim/Fn';
export { compose } from './Semigroupoid';

export interface Category<a extends keys> extends Semigroupoid<a> {
	identity: CategoryIdentity<a>;
}
type keys = keyof CategoryInstances;
type run<
	fn extends keyof CategoryInstances[keys],
	key extends keys,
	args extends any[] = any[]
> = CategoryInstances<args>[key][fn];
type CategoryIdentity<a extends keys> = run<'identity', a>;
